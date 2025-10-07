// script.js

document.addEventListener("DOMContentLoaded", () => {
  const main = document.querySelector("main");
  renderOverview(); // 預設顯示總覽頁

  // 🔹 監聽所有連結點擊（頁面切換）
  document.body.addEventListener("click", (e) => {
    if (e.target.matches("a[data-target]")) {
      e.preventDefault();
      const target = e.target.dataset.target;
      navigateTo(target);
    }
  });

  // 🔹 導航控制
  function navigateTo(target) {
    if (target.startsWith("article-")) {
      const [_, cat, series, id] = target.split("-");
      renderArticle(cat, series, id);
    } else if (target.startsWith("series-")) {
      const [_, cat, series] = target.split("-");
      renderSeries(cat, series);
    } else {
      renderOverview();
    }
    window.scrollTo(0, 0);
  }

  // 🔹 總覽頁（顯示所有大分類）
  function renderOverview() {
    main.innerHTML = `<h1>生活記事</h1>
      <div class="category-list">
        ${Object.keys(postsData)
          .map(
            (cat) => `
          <div class="category-card">
            <h2>${postsData[cat].name}</h2>
            <a href="#" data-target="series-${cat}">進入</a>
          </div>`
          )
          .join("")}
      </div>`;
  }

  // 🔹 系列頁（顯示該分類下的所有系列）
  function renderSeries(category) {
    const catData = postsData[category];
    if (!catData) return renderOverview();

    main.innerHTML = `
      <h2>${catData.name}</h2>
      <div class="series-list">
        ${Object.keys(catData.series)
          .map(
            (key) => `
          <div class="series-card">
            <h3>${catData.series[key].name}</h3>
            <a href="#" data-target="series-${category}-${key}">進入</a>
          </div>`
          )
          .join("")}
      </div>
      <p><a href="#" data-target="overview">← 回首頁</a></p>
    `;
  }

  // 🔹 系列內容頁（顯示該系列下的所有文章）
  function renderSeries(category, series) {
    const seriesData = postsData[category]?.series?.[series];
    if (!seriesData) return renderOverview();

    main.innerHTML = `
      <h2>${seriesData.name}</h2>
      <ul class="article-list">
        ${seriesData.articles
          .map(
            (a) =>
              `<li><a href="#" data-target="article-${category}-${series}-${a.id}">${a.title}</a></li>`
          )
          .join("")}
      </ul>
      <p><a href="#" data-target="series-${category}">← 回 ${postsData[category].name}</a></p>
    `;
  }

  // 🔹 單篇文章頁
  function renderArticle(category, series, id) {
    const article = postsData[category]?.series?.[series]?.articles?.find(
      (a) => a.id === id
    );
    if (!article) return renderOverview();

    main.innerHTML = `
      <article>
        <h2>${article.title}</h2>
        <p>${article.content}</p>
        <p><a href="#" data-target="series-${category}-${series}">← 回 ${postsData[category].series[series].name}</a></p>
      </article>
    `;
  }
});
