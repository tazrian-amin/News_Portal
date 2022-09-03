// event delegated to parent element to handle it easily
document.getElementById('news-category').addEventListener("click", function (event) {
    // show spinner after an event occurs
    toggleSpinner(true);

    const clickedBtn = event.target.innerText;
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            const categoryArray = data.data.news_category;
            const targetObject = categoryArray.find(obj => obj.category_name === clickedBtn);
            loadNews(targetObject.category_id);
        })
        .catch(err => {
            console.log("Could not manage time to do the optional Home page work! That's why showing this " + err);
        })
})

// load news data using news category id 
const loadNews = (categoryId) => {
    const url = `https://openapi.programming-hero.com/api/news/category/${categoryId}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayNews(data.data))
        .catch(err => console.log(err))
}

// displaying news of respective categories as per most viewed news
const displayNews = (newsArray) => {
    const totalNews = document.getElementById('total-news');
    totalNews.innerText = `${newsArray.length}`;
    const newsContainer = document.getElementById('news-container');
    newsContainer.textContent = '';

    // arranged news array in decending order of total view 
    const mostViewedNewsArray = newsArray.sort(function (a, b) { return b.total_view - a.total_view });

    mostViewedNewsArray.forEach(newsObject => {
        const newsCard = document.createElement('div');
        newsCard.classList.add('card', 'my-3');
        newsCard.innerHTML = `
        <div class="row g-0 p-2 text-dark">
            <div class="col-md-4 d-flex align-items-center justify-content-center">
                <img src="${newsObject.image_url}" class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h4 class="card-title fw-bold">${newsObject.title ? newsObject.title : 'Title Not Found'}</h4>
                    <p class="card-text text-muted">${newsObject.details?.slice(0, 200)}...</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="d-flex align-items-center justify-content-center">
                            <div>
                                <img id="author-img" class="img-fluid rounded-circle" src="${newsObject.author.img}" alt="">
                            </div>
                            <div class="mx-2">
                                <p class="fw-bold">${newsObject.author.name ? newsObject.author.name : 'Name Not Found'}</p>
                                <p class="text-muted">${newsObject.author.published_date ? newsObject.author.published_date.slice(0, 11) : 'Date Not Found'}</p>
                            </div>
                        </div>
                        <div>
                            <span><i class="fa-solid fa-eye"></i></span>
                            <span>${newsObject.total_view ? newsObject.total_view : 'Total View Not Found'}</span>
                        </div>
                        <div>
                            <a onclick="loadNewsDetails('${newsObject._id}')" id="modal-btn" class="text-decoration-none" data-bs-toggle="modal" data-bs-target="#exampleModal">More <i class="fa-solid fa-arrow-right"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
        newsContainer.appendChild(newsCard);
    });

    // hide spinner after loading data 
    toggleSpinner(false);
}

// load news details 
const loadNewsDetails = async (news_id) => {
    const url = `https://openapi.programming-hero.com/api/news/${news_id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayNewsDetails(data.data[0]);
}

// show news details on modal 
const displayNewsDetails = news => {
    const modalTitle = document.getElementById('modalTitle');
    modalTitle.innerText = `${news.title}`;
    const modalBody = document.getElementById('modalBody');
    modalBody.innerHTML = `
    <p>Published Date: ${news.author.published_date ? news.author.published_date : 'No published date found'}</p>
    <p>Author's Name: ${news.author.name ? news.author.name : 'No name found'}</p>
    <p>Total Views: ${news.total_view ? news.total_view : 'No view data found'}</p>
    <p>Rating: ${news.rating ? news.rating.number : 'No data found'}</p>
    <p>Badge: ${news.rating ? news.rating.badge : 'No data found'}</p>
    <p>Details: ${news.details}</p>
    `;
}

// spinner function 
const toggleSpinner = isLoading => {
    const spinnerSection = document.getElementById('spinner');
    if (isLoading === true) {
        spinnerSection.classList.remove('d-none');
    }
    else {
        spinnerSection.classList.add('d-none');
    }
}

// default news on initial page loading
loadNews('08');