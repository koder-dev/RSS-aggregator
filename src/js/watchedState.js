import onChange from 'on-change';
import * as render from './utils/render.js';

const watchedStateInit = (state, i18instance) => {
  const {
    renderFeeds, renderItems, renderLoading, renderModal,
    renderOpenedItems, renderResponseStatus, renderUrl,
  } = render;
  const watchedState = onChange(state, (path, value) => {
    switch (path) {
      case 'items':
        renderItems(value, i18instance);
        break;
      case 'feeds':
        renderFeeds(value);
        break;
      case 'ui.isLoading':
        renderLoading(value);
        break;
      case 'ui.validationUrl':
        renderUrl(value, i18instance);
        break;
      case 'ui.responseStatus':
        renderResponseStatus(value, i18instance);
        break;
      case 'modal':
        renderModal(value);
        break;
      case 'ui.itemsStatus':
        renderOpenedItems(value);
        break;
      default:
        throw new Error('unknown state path!');
    }
  });
  return watchedState;
};

export default watchedStateInit;
