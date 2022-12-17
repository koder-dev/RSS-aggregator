import i18next from 'i18next';
import ru from './languages/ru.js';
import watchedStateInit from './watchedState.js';
import handleFormListener from './eventListenersInit.js';

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

  myModal.addEventListener('show.bs.modal', (e) => {
    const { items, ui } = watchedState;
    const itemId = e.relatedTarget.dataset.id;
    const itemData = items.find((item) => item.id === itemId);
    watchedState.modal = itemData;
    watchedState.ui.itemsStatus = [...ui.itemsStatus, { itemId, status: 'opened' }];
  });

  const addedUrls = [];
  formRss.addEventListener('submit', handleFormListener(watchedState, addedUrls));
};

export default runApp;
