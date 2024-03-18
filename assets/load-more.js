'use strict'

const liquidVariables = JSON.parse(document.getElementById(`liquid-variables`).textContent);
const articles = liquidVariables.articles;

let articlesLoaded = 0;
let articleIndex = articlesLoaded;
const articlesPerPage = liquidVariables.settings.articlesPerPage;

const latestPostsContainer = document.querySelector(`.latest-posts-container`);

const loadMoreButton1 = document.createElement(`button`);
loadMoreButton1.setAttribute(`class`, `button button--primary`);
loadMoreButton1.style.display = `block`;
loadMoreButton1.style.margin =  `auto`;
loadMoreButton1.innerText = `Load more`;
const loadMoreButton2 = loadMoreButton1;

const URLParams = new URLSearchParams(window.location.search);
const selectedMonth = URLParams.get(`month`);
const selectedYear = URLParams.get(`year`);

const articlesToRender = [];
if (selectedMonth && selectedYear) {
  
  document.querySelector(`.latest-posts-heading`).innerText = `${selectedMonth} ${selectedYear}`;
  document.getElementById("featured-articles").style.display = "none";
  for (const article of articles) {
    const articlePublishedAtArray = article.PublishedAt.split(` `);
    const articlePublishedAtMonth = extendMonthAbbreviation(articlePublishedAtArray[0]);
    const articlePublishedAtYear = articlePublishedAtArray[2];
    
    if (articlePublishedAtMonth === selectedMonth && selectedYear === articlePublishedAtYear) {
      articlesToRender.push(article)
    }
    for (let count = 1; count <= articlesPerPage; count++) {
      if (articlesToRender[articleIndex]) {
        latestPostsContainer.insertAdjacentHTML(`beforeend`,
        `<div class="latest-post">
          <a href=${articlesToRender[articleIndex].articleURL}>
            <img
              loading="lazy"
              class="lp-image"
              alt=${articlesToRender[articleIndex].articleImageAlt}
              src=${articlesToRender[articleIndex].articleImage }
            ></a>
            <div class="lp-text">
              <span class="fa-tag">${articlesToRender[articleIndex].tags[0]}</span> | <span>${articlesToRender[articleIndex].PublishedAt}</span>
              <div class="lp-title">${articlesToRender[articleIndex].title}</div>
              <div class="lp-blurb">${articlesToRender[articleIndex].excerptOrContent}</div>
              <div>
                <a href=${articlesToRender[articleIndex].articleURL}>Read More</a>
              </div>
            </div>
        </div>`);
        articlesLoaded++
        if (articlesLoaded < articlesToRender.length) latestPostsContainer.insertAdjacentElement(`beforeend`, loadMoreButton1)
        articleIndex++
    };
    }
  }
} else {
  document.querySelector(`.blog-banner-container`).style.display = `block`;
  document.querySelector(`.featured-articles-container`).style.display = `flex`;
  
  for (let count = 1; count <= articlesPerPage; count++) {
    if (articles[articleIndex]) {
      latestPostsContainer.insertAdjacentHTML(`beforeend`,
      `<div class="latest-post">
        <a href=${articles[articleIndex].articleURL}>
          <img
            loading="lazy"
            class="lp-image"
            alt=${articles[articleIndex].articleImageAlt}
            src=${articles[articleIndex].articleImage }
          ></a>
          <div class="lp-text">
            <span class="fa-tag">${articles[articleIndex].tags[0]}</span> | <span>${articles[articleIndex].PublishedAt}</span>
            <div class="lp-title">${articles[articleIndex].title}</div>
            <div class="lp-blurb">${articles[articleIndex].excerptOrContent}</div>
            <div>
              <a href=${articles[articleIndex].articleURL}>Read More</a>
            </div>
          </div>
      </div>`);
      articlesLoaded++
      if (articlesLoaded < articles.length) latestPostsContainer.insertAdjacentElement(`beforeend`, loadMoreButton2)
      articleIndex++
    };
  };
}

function extendMonthAbbreviation(abbreviation) {
  const months = {
    'Jan': 'January',
    'Feb': 'February',
    'Mar': 'March',
    'Apr': 'April',
    'May': 'May',
    'Jun': 'June',
    'Jul': 'July',
    'Aug': 'August',
    'Sep': 'September',
    'Oct': 'October',
    'Nov': 'November',
    'Dec': 'December'
  };

  return months[abbreviation] || abbreviation;
}

if (loadMoreButton1) {
  
  let tagMarkup
  if (articlesToRender[articleIndex]) {
    tagMarkup = (articlesToRender[articleIndex].firstArticleTag) ? `<span class="fa-tag">${articlesToRender[articleIndex].firstArticleTag}</span><span> | </span>` : '';
  }

  loadMoreButton1.addEventListener(`click`, (event) => {
    for (let count = 1; count <= articlesPerPage; count++) {
      if (articlesToRender[articleIndex]) {
      loadMoreButton1.insertAdjacentHTML(`beforebegin`,
        `<div class="latest-post">
        <a href=${articlesToRender[articleIndex].articleURL}>
          <img
            loading="lazy"
            class="lp-image"
            alt=${articlesToRender[articleIndex].articleImageAlt}
            src=${articlesToRender[articleIndex].articleImage }
          >
        </a>
        <div class="lp-text">
          ${tagMarkup}
          <span>${articlesToRender[0].PublishedAt}</span>
          <div class="lp-title">${articlesToRender[articleIndex].title}</div>
          <div class="lp-blurb">${articlesToRender[articleIndex].excerptOrContent}</div>
          <div><a href=${articlesToRender[articleIndex].articleURL}>Read More</a></div>
        </div>
      </div>`);
        articlesLoaded++
        if (articlesLoaded === articlesToRender.length) loadMoreButton1.remove();    
        articleIndex++
      };
    };
  });
}

if (loadMoreButton2) { 
  loadMoreButton2.addEventListener(`click`, (event) => {
    for (let count = 1; count <= articlesPerPage; count++) {
      if (articles[articleIndex]) {
      loadMoreButton2.insertAdjacentHTML(`beforebegin`,
        `<div class="latest-post">
          <a href=${articles[articleIndex].articleURL}>
            <img
              loading="lazy"
              class="lp-image"
              alt=${articles[articleIndex].articleImageAlt}
              src=${articles[articleIndex].articleImage }
            ></a>
            <div class="lp-text">
              <span class="fa-tag">${articles[articleIndex].tags[0]}</span> | <span>${articles[articleIndex].PublishedAt}</span>
              <div class="lp-title">${articles[articleIndex].title}</div>
              <div class="lp-blurb">${articles[articleIndex].excerptOrContent}</div>
              <div>
                <a href=${articles[articleIndex].articleURL}>Read More</a>
              </div>
            </div>
        </div>`);
        articlesLoaded++
        if (articlesLoaded === articles.length) loadMoreButton2.remove();
        articleIndex++
      };
    };
  });
}