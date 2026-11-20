export default function decorate(block) {
  [...block.children].forEach((row) => {
    const label = row.children[0];
    const summary = document.createElement('summary');
    summary.className = 'faq-item-label';
    summary.append(...label.childNodes);

    const body = row.children[1];
    body.className = 'faq-item-body';

    const details = document.createElement('details');
    details.append(summary, body);
    row.replaceWith(details);
  });
}
