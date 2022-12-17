
export const handleFormListener = (watchedState, addedUrls) => (e) => {
  e.preventDefault();
  watchedState.ui.isLoading = 'yes';

  const formData = new FormData(e.target);
  const url = formData.get('url');

  scheme.validate({ url })
    .then(() => {
      if (addedUrls.includes(url)) throw new Error('Already added Url!');
      addedUrls.push(url);
      watchedState.ui.validationUrl = 'valid';
      return axios.get(`https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(url)}`);
    })
    .then(({ data }) => {
      watchedState.ui.responseStatus = 'complete';
      const [items, feed] = parser(data);
      watchedState.feeds = [...watchedState.feeds, feed];
      watchedState.items = [...watchedState.items, ...items];
      setTimeout(() => {
        followRss(url, watchedState);
      }, 5000);
    })
    .catch((err) => {
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
});