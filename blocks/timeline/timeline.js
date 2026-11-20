export default function decorate(block) {
  const list = document.createElement('ol');
  list.className = 'timeline-list';

  [...block.children].forEach((row, index) => {
    const item = document.createElement('li');
    item.className = 'timeline-item';

    const marker = document.createElement('div');
    marker.className = 'timeline-marker';
    marker.textContent = String(index + 1).padStart(2, '0');

    const content = document.createElement('div');
    content.className = 'timeline-content';

    while (row.firstElementChild) {
      content.append(row.firstElementChild);
    }

    item.append(marker, content);
    list.append(item);
  });

  block.replaceChildren(list);
}
