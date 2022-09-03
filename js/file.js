document.getElementById('breaking-news-btn').addEventListener("click", function () {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    fetch(url)
        .then(res => res.json())
        .then(data => loadNews(data.data.news_category[0].category_id))
})

const loadNews = (categoryId) => {
    const url = `https://openapi.programming-hero.com/api/news/category/${categoryId}`;
    fetch(url)
        .then(res => res.json())
        .then(data => console.log(data.data))
}

const displayNews = () => {
    const newsContainer = document.getElementById('news-container');
}