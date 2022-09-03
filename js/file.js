document.getElementById('news-category').addEventListener("click", function (event) {
    const clickedBtn = event.target.innerText;
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            const categoryArray = data.data.news_category;
            const targetObject = categoryArray.find(obj => obj.category_name === clickedBtn);
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
        console.log(newsObject);
        const newsCard = document.createElement('div');
        newsCard.classList.add('card', 'my-3');
        newsCard.innerHTML = `
        <div class="row g-0 p-2">
            <div class="col-md-4 d-flex align-items-center justify-content-center">
                <img src="${newsObject.image_url}" class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h4 class="card-title fw-bold">${newsObject.title}</h4>
                    <p class="card-text text-muted">${newsObject.details.slice(0, 200)}...</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="d-flex align-items-center justify-content-center">
                            <div>
                                <img id="author-img" class="img-fluid rounded-circle" src="${newsObject.author.img}" alt="">
                            </div>
                            <div class="mx-2">
                                <p class="fw-bold">${newsObject.author.name}</p>
                                <p class="text-muted">${newsObject.author.published_date.slice(0, 11)}</p>
                            </div>
                        </div>
                        <div>
                            <span><i class="fa-solid fa-eye"></i></span>
                            <span>${newsObject.total_view}</span>
                        </div>
                        <div>
                            <a id="modal-btn" class="text-decoration-none" data-bs-toggle="modal" data-bs-target="#exampleModal">More <i class="fa-solid fa-arrow-right"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
        newsContainer.appendChild(newsCard);

        const modalTitle = document.getElementById('modalTitle');
        modalTitle.innerText = `${newsObject.title}`;
        const modalBody = document.getElementById('modalBody');
        modalBody.innerHTML = `
        
        `
    })
}

loadNews('08');