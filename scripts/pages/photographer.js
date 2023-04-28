//Mettre le code JavaScript lié à la page photographer.html
// Récupération du paramètre id dans l'URL
const params = new URLSearchParams(window.location.search);
const idProfil = params.get('id');

// Utilisation de l'id du profil pour récupérer les données associées
async function photographerData() {
    const photographer = await fetch('/data/photographers.json').then(r => r.json()).then(r => r.photographers)
    let photographerProfil ;
    for (let i=0; i< photographer.length ; i++) {
        if (photographer[i].id == idProfil) {
            photographerProfil = photographer[i]
        }
    }
    return photographerProfil
}
function displayData(photographer) {
    const header = document.querySelector('.photograph-header');
    const infos = document.createElement('div');
    infos.classList.add('infos');
    infos.innerHTML = `<h1 class="photographer-header__name">${photographer.name}</h1><h3 class="photographer-header__location">${photographer.city}, ${photographer.country}</h3><p class="photographer-header__tagline">${photographer.tagline}</p>`
    const photo = document.createElement('img')
    photo.setAttribute('src', `assets/photographers/${photographer.portrait}`);
    photo.classList.add('photographer-header__img');
    const button = document.querySelector(".contact_button")
    header.insertBefore(infos, button);
    header.appendChild(photo);
}

async function displayGalery(name) {
    const gallery = document.querySelector(".photograph-gallery-wrapper");
    const urlName = name.split(" ").join("");
    const urlNames = urlName.split("-").join("");
    const url = `assets/galery/${urlNames}/`;
    const response = await fetch(url);
    const body = await response.text();
    const parser = new DOMParser();
    const html = parser.parseFromString(body, "text/html");
    console.log(html)
    const images = Array.from(html.querySelectorAll(".icon-jpg")).map(
        (a) => { let photo = {
            src: '',
            title: '',
        } ;
            photo.src = a.getAttribute("href");
            const title = a.getAttribute("title").split(".")
            const realTitle = title[0].split('_').join(" ")
            photo.title = realTitle;
            const imageBloc = document.createElement("div");
            const h3 = document.createElement("h3");
            h3.classList.add("photograph-gallery__title");
            h3.textContent = photo.title;
            const img = document.createElement("img");
            img.classList.add("photograph-gallery__img");
            img.setAttribute('src', photo.src);
            img.setAttribute('title', photo.title);
            img.setAttribute('alt', photo.title);
            imageBloc.appendChild(img)
            imageBloc.appendChild(h3)
            gallery.appendChild(imageBloc);
        }
    );   
    return images;
    
}
let profil = null;
photographerData().then(photographer => {
    displayData(photographer);
    displayGalery(photographer.name);
})