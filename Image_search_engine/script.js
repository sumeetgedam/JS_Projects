const searchForm = document.getElementById("search-form");
const searchBox= document.getElementById("search-box");
const searchResult= document.getElementById("search-result");
const showMoreBtn = document.getElementById("show-more-btn");


const openDoor = "MXzwmKCSVFAk6czBP2BLsYrOAmFzr94LrOU3ZGa1VTQ";

let keyword = "";
let page = 1;

async function searchImages(){
    keyword = searchBox.value;
    const fetchFrom = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${openDoor}&per_page=12`;

    const response = await fetch(fetchFrom);
    const data = await response.json();

    const results = data.results;

    if(page === 1){
        searchResult.innerHTML = "";
    }

    results.map((result) => {
        const image = document.createElement("img");
        image.src = result.urls.small;
        const imageLink = document.createElement("a");
        imageLink.href = result.links.html;
        imageLink.target = "_blank";

        imageLink.appendChild(image);

        searchResult.appendChild(imageLink);

    });

    showMoreBtn.style.display = "block";
}

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    page = 1;
    searchImages();
});

showMoreBtn.addEventListener("click", () => {

    page++;
    searchImages();
    
});