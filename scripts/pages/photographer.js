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
    const urlName = name.split(" ");
    const photographerName = urlName[0].split("-").join(" ");
    console.log(photographerName);   
    const url = `assets/galery/${photographerName}/`;
    // Je dois récupérer toutes les images du photographe
    const data = await fetch('./data/photographers.json').then(r => r.json());
    const images = data.media.filter(photo => photo.photographerId == idProfil)
    console.log(images)
    images.map(
        photo => {
            const imageBloc = document.createElement("div");
            const h3 = document.createElement("h3");
            h3.classList.add("photograph-gallery__title");
            h3.textContent = photo.title;
            if (photo.hasOwnProperty('image')) {
                const img = document.createElement("img");
                img.classList.add("photograph-gallery__img");
                img.setAttribute('src', `${url}/${photo.image}`);
                img.setAttribute('title', photo.title);
                img.setAttribute('alt', photo.title);
                imageBloc.appendChild(img)
            } else if (photo.hasOwnProperty('video')) {
                const video = document.createElement('embed');
                video.classList.add("photograph-gallery__img")
                video.setAttribute('src', `${url}/${photo.video}`)
                video.setAttribute('title', photo.video)
                video.setAttribute('alt', photo.video)
                imageBloc.appendChild(video)
            }
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

// Gestion de la modal contact


// Gestion de la lightbox modal