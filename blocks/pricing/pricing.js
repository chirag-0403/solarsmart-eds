export default function decorate(block) {
  const cards = document.createElement('div');
  cards.className = 'pricing-grid';

  [...block.children].forEach((row) => {
    const card = document.createElement('article');
    card.className = 'pricing-card';

    const content = document.createElement('div');
    content.className = 'pricing-content';

    while (row.firstElementChild) {
      content.append(row.firstElementChild);
    }

    const button = document.createElement('a');
    button.className = 'pricing-button';
    button.href = '/contact';
    button.textContent = 'Request a Quote';

    content.append(button);
    card.append(content);
    cards.append(card);
  });

  block.replaceChildren(cards);
}
