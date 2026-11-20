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

    const pageSize = 3;
    let currentPage = 1;

    const controls = document.createElement('div');
    controls.className = 'blog-list-controls';

    const search = document.createElement('input');
    search.type = 'search';
    search.className = 'blog-list-search';
    search.placeholder = 'Search articles...';
    search.setAttribute('aria-label', 'Search blog articles');

    const categoryFilter = document.createElement('select');
    categoryFilter.className = 'blog-list-filter';
    categoryFilter.setAttribute('aria-label', 'Filter articles by category');

    const allOption = document.createElement('option');
    allOption.value = '';
    allOption.textContent = 'All Categories';
    categoryFilter.append(allOption);

    const categories = [
      ...new Set(articles.map((article) => article.category).filter(Boolean)),
    ];

    categories.sort().forEach((category) => {
      const option = document.createElement('option');
      option.value = category;
      option.textContent = category;
      categoryFilter.append(option);
    });

    controls.append(search, categoryFilter);

    const results = document.createElement('p');
    results.className = 'blog-list-results';

    const list = document.createElement('div');
    list.className = 'blog-list-grid';

    const pagination = document.createElement('div');
    pagination.className = 'blog-list-pagination';

    const renderArticles = () => {
      const searchTerm = search.value.trim().toLowerCase();
      const selectedCategory = categoryFilter.value;

      const filteredArticles = articles.filter((article) => {
        const matchesSearch = [
          article.title,
          article.description,
          article.category,
        ].some((value) => value?.toLowerCase().includes(searchTerm));

        const matchesCategory = !selectedCategory
          || article.category === selectedCategory;

        return matchesSearch && matchesCategory;
      });

      const totalPages = Math.ceil(filteredArticles.length / pageSize);
      currentPage = Math.min(currentPage, Math.max(totalPages, 1));

      const startIndex = (currentPage - 1) * pageSize;
      const visibleArticles = filteredArticles.slice(
        startIndex,
        startIndex + pageSize,
      );

      list.replaceChildren();
      pagination.replaceChildren();

      results.textContent = `${filteredArticles.length} article(s) found`;

      if (!filteredArticles.length) {
        list.textContent = 'No matching articles found.';
        return;
      }

      visibleArticles.forEach((article) => {
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

      if (totalPages > 1) {
        const previousButton = document.createElement('button');
        previousButton.type = 'button';
        previousButton.textContent = 'Previous';
        previousButton.disabled = currentPage === 1;
        previousButton.addEventListener('click', () => {
          currentPage -= 1;
          renderArticles();
        });

        const pageInfo = document.createElement('span');
        pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;

        const nextButton = document.createElement('button');
        nextButton.type = 'button';
        nextButton.textContent = 'Next';
        nextButton.disabled = currentPage === totalPages;
        nextButton.addEventListener('click', () => {
          currentPage += 1;
          renderArticles();
        });

        pagination.append(previousButton, pageInfo, nextButton);
      }
    };

    search.addEventListener('input', () => {
      currentPage = 1;
      renderArticles();
    });

    categoryFilter.addEventListener('change', () => {
      currentPage = 1;
      renderArticles();
    });

    block.replaceChildren(controls, results, list, pagination);
    renderArticles();
  } catch (error) {
    block.innerHTML = '<p>Unable to load articles. Please try again later.</p>';
    // eslint-disable-next-line no-console
    console.error('Blog list error:', error);
  }
}
