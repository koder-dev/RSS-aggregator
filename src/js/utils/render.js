import makeListEl from './makeListElement';

export const renderItems = (items, i18instance) => {
  const postsDiv = document.querySelector('.posts');
  let ul = postsDiv.querySelector('.list-group');
  if (!ul) {
    const divCardBody = document.createElement('div');
    divCardBody.classList.add('card-body');
    const h2 = document.createElement('h2');
    ul = document.createElement('ul');
    h2.textContent = 'Посты';
    ul.classList.add('list-group', 'border-0', 'rounded-0');
    h2.classList.add('card-title', 'h4');
    divCardBody.append(h2);
    postsDiv.append(divCardBody);
    postsDiv.append(ul);
  }

  const newUl = document.createElement('ul');
  newUl.classList.add('list-group', 'border-0', 'rounded-0');

  items.forEach((item) => {
    const li = makeListEl(item, i18instance);
    newUl.append(li);
  });

  ul.replaceWith(newUl);
};

export const renderLoading = (isLoading) => {
  const btn = document.querySelector('#btn-submit');
  if (isLoading === 'yes') {
    btn.setAttribute('disabled', true);
  } else {
    btn.removeAttribute('disabled');
  }
};

export const renderUrl = (validationUrl, i18instance) => {
  const inputUrl = document.querySelector('#url-input');
  const pText = document.querySelector('.feedback');

  if (validationUrl === 'invalid' || validationUrl === 'alreadyAddedUrl') {
    inputUrl.classList.add('is-invalid');
    pText.classList.remove('text-success');
    pText.classList.add('text-danger');
    if (validationUrl === 'invalid') pText.textContent = i18instance.t('invalidFeedback');
    if (validationUrl === 'alreadyAddedUrl') pText.textContent = i18instance.t('alreadyAdded');
  } else if (validationUrl === 'valid') {
    inputUrl.classList.remove('is-invalid');
    pText.textContent = '';
  }
};

export const renderResponseStatus = (responseStatus, i18instance) => {
  const pText = document.querySelector('.feedback');
  const input = document.querySelector('#url-input');

  if (responseStatus === 'complete') {
    pText.classList.remove('text-danger');
    pText.classList.add('text-success');
    pText.textContent = i18instance.t('validFeedback');
    input.value = '';
    input.focus();
  } else {
    pText.classList.remove('text-success');
    pText.classList.add('text-danger');
    if (responseStatus === 'networkError') pText.textContent = i18instance.t('networkError');
    if (responseStatus === 'invalidRss')  pText.textContent = i18instance.t('invalidRss');
  }
};

export const renderFeeds = (feeds) => {
  const feedDiv = document.querySelector('.feeds');
  let ul = feedDiv.querySelector('.list-group');

  if (!ul) {
    const divCard = document.createElement('div');
    const divCardBody = document.createElement('div');
    const cardTitle = document.createElement('h2');
    ul = document.createElement('ul');
    divCard.classList.add('card', 'border-0');
    divCardBody.classList.add('card-body');
    cardTitle.classList.add('card-title', 'h4');
    ul.classList.add('list-group', 'border-0', 'rounded-0');
    cardTitle.textContent = 'Фиды';

    divCardBody.append(cardTitle);
    divCardBody.append(ul);
    divCard.append(divCardBody);
    feedDiv.append(divCard);
  }
  const newUl = document.createElement('ul');
  newUl.classList.add('list-group', 'border-0', 'rounded-0');

  feeds.forEach((feed) => {
    const li = document.createElement('li');
    const title = document.createElement('h3');
    const descripton = document.createElement('p');

    li.classList.add('list-group-item', 'border-0', 'border-end-0');
    title.classList.add('h6', 'm-0');
    descripton.classList.add('m-0', 'small', 'text-black-50');

    title.textContent = feed.title;
    descripton.textContent = feed.descripton;

    li.append(title);
    li.append(descripton);
    newUl.append(li);
  });

  ul.replaceWith(newUl);
};

export const renderModal = (item) => {
  const modalTitle = document.querySelector('.modal-title');
  const modalBody = document.querySelector('.modal-body');
  const link = document.querySelector('.modal-footer > a');
  modalTitle.textContent = item.title;
  modalBody.textContent = item.descripton;
  link.href = item.link;
};

export const renderOpenedItems = (items) => {
  items.forEach((item) => {
    const { itemId } = item;
    console.log(item);
    const itemEl = document.querySelector(`a[data-id="${itemId}"]`);
    itemEl.classList.remove('fw-bold');
    itemEl.classList.add('fw-normal', 'link-secondary');
  });
};
