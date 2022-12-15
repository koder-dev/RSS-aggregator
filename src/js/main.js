import '../scss/styles.scss';
import { Modal } from 'bootstrap';
import { object, string } from 'yup';
import axios from 'axios';
import i18next from 'i18next';
import ru from './languages/ru.js';
import watchedStateInit from './watchedState.js';
import parser from './utils/DOMparser.js';
import followRss from './followRss';

const runApp = () => {
  const i18instance = i18next.createInstance();
  i18instance.init({
    lng: 'ru',
    resources: { ru },
  });

  const state = {
    items: [],
    feeds: [],
    modal: null,
    ui: {
      validationUrl: 'valid',
      isLoading: 'no',
      responseStatus: null,
      itemsStatus: [],
    },
  };

  const watchedState = watchedStateInit(state, i18instance);
  const formRss = document.querySelector('.rss-form');
  const myModal = document.getElementById('modal');

  const scheme = object({
    url: string().url().required(),
  });

  myModal.addEventListener('show.bs.modal', (e) => {
    const { items, ui } = watchedState;
    const itemId = e.relatedTarget.dataset.id;
    const itemData = items.find((item) => item.id === itemId);
    watchedState.modal = itemData;
    watchedState.ui.itemsStatus = [...ui.itemsStatus, { itemId, status: 'opened' }];
  });

  const addedUrls = [];

  formRss.addEventListener('submit', (e) => {
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
};

runApp();
