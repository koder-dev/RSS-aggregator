import axios from 'axios';
import { differenceBy } from 'lodash';
import parser from './utils/DOMparser.js';

const followRss = (url, watchedState) => {
  axios.get(`https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(url)}`)
    .then(({ data }) => {
      const [items] = parser(data);
      const diff = differenceBy(items, watchedState.items, 'title');
      if (diff.length !== 0) {
        watchedState.items = [...diff, ...watchedState.items];
      }
      setTimeout(() => {
        followRss(url, watchedState);
      }, 5000);
    })
    .catch(() => {
      throw new Error('followRSS error');
    });
};

export default followRss;
