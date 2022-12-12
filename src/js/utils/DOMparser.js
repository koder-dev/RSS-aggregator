import { uniqueId } from "lodash";

const parser = (data) => {
  const domParser = new DOMParser();
  const rss = domParser.parseFromString(data.contents, "application/xml");
  const nodeList = rss.querySelectorAll('item');
  const feedNode = rss.querySelector('channel').childNodes;
  const feed = { title: feedNode[1].textContent, descripton: feedNode[3].textContent };
  const items = Array.from(nodeList).map((el) => {
    const node = el.childNodes;
    const title = node[1].textContent;
    const link = node[3].textContent;
    const descripton = node[5].textContent;
    return { title, link, descripton, id: uniqueId() };
  });
  return [items, feed];
}

export default parser;
