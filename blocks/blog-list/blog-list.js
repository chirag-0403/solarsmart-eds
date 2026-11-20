export default async function decorate(block) {
  block.innerHTML = '<p>Loading articles...</p>';

  try {
    const response = await fetch('/blogs-index.json');

    if (!response.ok) {
      throw new Error(`Unable to load blog index: ${response.status}`);
    }

    const data = await response.json();
    const articles = data.data || [];

    if (!articles.length) {
      block.innerHTML = '<p>No blog articles found.</p>';
      return;
    }

    const list = document.createElement('div');
    list.className = 'blog-list-grid';

    articles.forEach((article) => {
      const card = document.createElement('article');
      card.className = 'blog-list-card';

      if (article.image) {
        const image = document.createElement('img');
        image.src = article.image;
        image.alt = article.title || 'Blog article';
        image.loading = 'lazy';
        card.append(image);
      }

      const content = document.createElement('div');
      content.className = 'blog-list-content';

      if (article.category) {
        const category = document.createElement('p');
        category.className = 'blog-list-category';
        category.textContent = article.category;
        content.append(category);
      }

      const title = document.createElement('h3');
      const link = document.createElement('a');
      link.href = article.path;
      link.textContent = article.title || 'Read article';
      title.append(link);

      content.append(title);

      if (article.description) {
        const description = document.createElement('p');
        description.textContent = article.description;
        content.append(description);
      }

      if (article.readingTime) {
        const readingTime = document.createElement('p');
        readingTime.className = 'blog-list-reading-time';
        readingTime.textContent = article.readingTime;
        content.append(readingTime);
      }

      card.append(content);
      list.append(card);
    });

    block.replaceChildren(list);
  } catch (error) {
    block.innerHTML = '<p>Unable to load articles. Please try again later.</p>';
    // eslint-disable-next-line no-console
    console.error('Error loading blog articles:', error);
  }
}