import { object, string } from 'yup';
import axios from 'axios';
import followRss from './followRss';
import parser from './utils/DOMparser.js';

const handleFormListener = (watchedState, addedUrls) => (e) => {
  e.preventDefault();
  watchedState.ui.isLoading = 'yes';

  const scheme = object({
    url: string().url().required(),
  });

  const formData = new FormData(e.target);
  const url = formData.get('url');

  scheme.validate({ url })
    .then(() => {
      if (addedUrls.includes(url)) throw new Error('Already added Url!');
      watchedState.ui.validationUrl = 'valid';
      return axios.get(`https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(url)}`);
    })
    .then(({ data }) => {
      addedUrls.push(url);
      watchedState.ui.responseStatus = 'complete';
      const [items, feed] = parser(data);
      console.log(items)
      watchedState.feeds = [...watchedState.feeds, feed];
      watchedState.items = [...watchedState.items, ...items];
      setTimeout(() => {
        followRss(url, watchedState);
      }, 5000);
    })
    .catch((err) => {
      console.log(err.message)
      switch (err.message) {
        case 'Already added Url!':
          watchedState.ui.validationUrl = 'alreadyAddedUrl';
          break;
        case 'Network Error':
          watchedState.ui.responseStatus = 'error';
          break;
        default:
          watchedState.ui.validationUrl = 'invalid';
      };
    })
    .finally(() => watchedState.ui.isLoading = 'no');
};

export default handleFormListener;