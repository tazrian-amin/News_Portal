document.getElementById('news-category').addEventListener("click", function (event) {
    const clickedBtn = event.target.innerText;
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            const categoryArray = data.data.news_category;
            const targetObject = categoryArray.find(obj => obj.category_name === clickedBtn);
            console.log(targetObject);
            loadNews(targetObject.category_id);
        })
})

const loadNews = (categoryId) => {
    const url = `https://openapi.programming-hero.com/api/news/category/${categoryId}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayNews(data.data))
}

const displayNews = (newsArray) => {
    const newsContainer = document.getElementById('news-container');
    newsContainer.textContent = '';
    newsArray.forEach(newsObject => {
        const newsCard = document.createElement('div');
        newsCard.classList.add('card', 'my-3');
        newsCard.innerHTML = `
    <div class="row g-0 p-4">
        <div class="col-md-4">
            <img src="${newsObject.image_url}" class="img-fluid rounded-start" alt="...">
        </div>
        <div class="col-md-8">
            <div class="card-body">
                <h5 class="card-title fw-bold">${newsObject.title}</h5>
                <p class="card-text">${newsObject.details.slice(0, 250)}...</p>
                <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
            </div>
        </div>
    </div>
    `;
        newsContainer.appendChild(newsCard);
    })
}