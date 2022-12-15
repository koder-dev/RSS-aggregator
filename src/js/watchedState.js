import onChange from 'on-change';
import { renderItems, renderLoading, renderResponseStatus, renderUrl, renderFeeds, renderModal, renderOpenedItems } from './utils/render';

const watchedStateInit = (state, i18instance) => {
  const watchedState = onChange(state, (path, value) => {
    switch (path) {
      case 'items':
        renderItems(value);
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
      };
    });
    return watchedState;
  };
    
  export default watchedStateInit;