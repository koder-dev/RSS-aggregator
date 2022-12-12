import '../scss/styles.scss';
import { object, string } from 'yup';
import axios from 'axios';
import i18next from 'i18next';
import ru from './languages/ru.js';
import watchedStateInit from './watchedState.js';
import parser from './utils/DOMparser.js'

const runApp = () => {
  const i18instance = i18next.createInstance();
  i18instance.init({
    lng: 'ru',
    resources: { ru }
  });

  const state = {
    ui: {
      validationUrl: 'valid',
      isLoading: 'no',
      responseStatus: null,
      items: [],
      feeds: [],
      modal: 'hidden',
    }
  }

  const watchedState = watchedStateInit(state, i18instance);
  const formRss = document.querySelector('.rss-form');
  const btnModalShow = document.querySelectorAll('btn-outline-primary');

  const scheme = object({
    url: string().url().required(),
  });

  btnModalShow.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const modal = document.querySelector('#modal');
      modal.classList.add('show');
    })
  });

  formRss.addEventListener('submit', (e) => {
    e.preventDefault();
    watchedState.ui.isLoading = 'yes';

    const formData = new FormData(e.target);
    const url = formData.get('url');

    scheme.validate({ url })
      .then(() => {
        watchedState.ui.validationUrl = 'valid';
        return axios.get(`https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(url)}`)})
      .then(({ data }) => {
        watchedState.ui.responseStatus = 'complete';
        const [items, feed] = parser(data);
        watchedState.ui.feeds = [...watchedState.ui.feeds, feed];
        watchedState.ui.items = [...watchedState.ui.items, ...items];
      })
      .catch((e) => {
        console.error(e);
        if (e === 'Network error') {
          watchedState.responseStatus = 'error';
        } else {
          watchedState.ui.validationUrl = 'invalid'
        }})
      .finally(() => watchedState.ui.isLoading = 'no');
  });
};

runApp();
  