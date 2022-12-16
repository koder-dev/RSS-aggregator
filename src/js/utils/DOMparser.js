import { uniqueId } from 'lodash';

const parser = (data) => {
  const domParser = new DOMParser();
  const rss = domParser.parseFromString(data.contents, 'application/xml');
  const nodeList = rss.querySelectorAll('item');
  const feedTitle = rss.querySelector('channel > title').textContent;
  const feedDescription = rss.querySelector('channel > description').textContent;
  const feed = { title: feedTitle, descripton: feedDescription };
  const items = Array.from(nodeList).map((node) => {
    const title = node.querySelector('title').textContent;
    const link = node.querySelector('link').textContent;
    const descripton = node.querySelector('description').textContent;
    return {
      title, link, descripton, id: uniqueId(),
    };
  });
  return [items, feed];
};

export default parser;
