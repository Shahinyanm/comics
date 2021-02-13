let data = {};
let lastComics = 0;

window.onload = function () {
    fetchData();
};

function fetchData() {
    let url = 'https://cors-anywhere.herokuapp.com/http://xkcd.com/info.0.json';
    let id = getHrefId();
    if (id != null) {
        url = `https://cors-anywhere.herokuapp.com/http://xkcd.com/${id}/info.0.json`
    }
    fetch(url).then(response => response.json())
        .then(response => {
            data = response;
            document.getElementById("header").innerHTML = data.title ?? 'Title is missing';
            document.getElementById("date").innerHTML = data.day + '.' + data.month + '.' + data.year ?? 'Date is missing';
            document.getElementById("main-img").src = data.img ?? 'Image is missing';
            document.getElementById("text").innerHTML = JSON.parse(JSON.stringify(data.transcript)) ?? 'Text is missing';
            getLastComics();
        });
}

function getHrefId() {
    let href = window.location.href;
    let id = null;
    if (href.includes('comicsNumber')) {
        let indexOf = href.indexOf("=");
        id = href.substr(indexOf + 1, href.length);
    }
    return id;
}

function getLastComics() {
    fetch('https://cors-anywhere.herokuapp.com/http://xkcd.com/info.0.json').then(response => response.json())
        .then(data => {
            lastComics = data.num;
        });
}

function actionResolver(value) {
    let id = getHrefId();
    let random = Math.floor(Math.random() * lastComics) + 1;
    let urlToReload = 'http://comics.test';
    switch (value) {
        case 'first':
            urlToReload += '?comicsNumber=1';
            break;
        case 'prev':
            if (id > 1) {
                urlToReload += `?comicsNumber=${id - 1}`;
            }
            if (id === null) {
                urlToReload += `?comicsNumber=${(lastComics - 1)}`;
            }
            break;
        case 'next':
            if (id !== null) {
                urlToReload += `?comicsNumber=${Number(id) + 1}`;
            }else{
                urlToReload += '?comicsNumber=1';
            }
            break;
        case 'random':
            urlToReload += `?comicsNumber=${random}`;
            break;
        case 'last':
            urlToReload += '/';
            break;
        default:
            urlToReload += '/';
    }
    window.location.href = urlToReload;
}