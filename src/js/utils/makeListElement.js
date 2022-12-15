const makeEl = (item) => {
  const li = document.createElement('li');
  const btn = document.createElement('button');
  const a = document.createElement('a');

  li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0');
  a.classList.add('fw-bold');
  btn.classList.add('btn', 'btn-outline-primary', 'btn-sm');
  btn.dataset.id = item.id;
  btn.dataset.bsToggle = 'modal';
  btn.dataset.bsTarget = '#modal';
  a.dataset.id = item.id;
  
  btn.type = 'button';
  btn.textContent = 'Просмотр';
  a.textContent = item.title;
  a.href = item.link;
  a.target = '_blank';
  a.rel = 'noopener noreferrer';

  li.append(a);
  li.append(btn);
  
  return li;
};

export default makeEl;
