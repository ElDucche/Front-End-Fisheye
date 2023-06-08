// Mettre le code JavaScript lié à la page photographer.html
// Récupération du paramètre id dans l'URL
const params = new URLSearchParams(window.location.search);
const idProfil = params.get('id');

// Variables nécessaires à la lightbox
let currentIndex = 0;
let images = [];
let url = '';

// Utilisation de l'id du profil pour récupérer les données associées
async function photographerData() {
  const photographer = await fetch(
    'https://elducche.github.io/Front-End-Fisheye/data/photographers.json',
  )
    .then((r) => r.json())
    .then((r) => r.photographers);
  let photographerProfil;
  for (let i = 0; i < photographer.length; i + 1) {
    if (photographer[i].id === idProfil) {
      photographerProfil = photographer[i];
    }
  }
  return photographerProfil;
}

function displayData(photographer) {
  const header = document.querySelector('.photograph-header');
  const infos = document.createElement('div');
  infos.classList.add('infos');
  infos.innerHTML = `<h1 class="photographer-header__name">${photographer.name}</h1><h2 class="photographer-header__location">${photographer.city}, ${photographer.country}</h2><p class="photographer-header__tagline">${photographer.tagline}</p>`;
  const photo = document.createElement('img');
  photo.setAttribute('src', `assets/photographers/${photographer.portrait}`);
  photo.setAttribute('alt', photographer.name);
  photo.classList.add('photographer-header__img');
  const button = document.querySelector('.contact_button');
  header.insertBefore(infos, button);
  header.appendChild(photo);
}

async function displayGalery(name, filtre = '') {
  if (document.getElementById('dailyPrice')) {
    document.getElementById('dailyPrice').remove();
  }
  document.querySelector('.photograph-gallery-wrapper').remove();

  const gallery = document.createElement('div');
  gallery.classList.add('photograph-gallery-wrapper');
  document.querySelector('.photograph-gallery').appendChild(gallery);
  const urlName = name.split(' ');
  const photographerName = urlName[0].split('-').join(' ');
  const url = `assets/galery/${photographerName}`;
  // Je dois récupérer toutes les images du photographe
  const data = await fetch(
    'https://elducche.github.io/Front-End-Fisheye/data/photographers.json',
  ).then((r) => r.json());
  const images = data.media.filter((photo) => photo.photographerId === idProfil);
  if (filtre === 'likes') {
    images.sort((a, b) => b.likes - a.likes);
  } else if (filtre === 'title') {
    images.sort((a, b) => {
      const nomA = a.title.toUpperCase();
      const nomB = b.title.toUpperCase();
      if (nomA < nomB) {
        return -1;
      }
      if (nomA > nomB) {
        return 1;
      }
      return 0;
    });
  }
  images.map((photo) => {
    const imageBloc = document.createElement('div');
    const h3 = document.createElement('h3');
    h3.classList.add('photograph-gallery__title');
    h3.textContent = photo.title;
    // Info = titre + like
    const imageInfo = document.createElement('div');
    imageInfo.classList.add('photographer-gallery__infos');
    // Like section
    const like = document.createElement('div');
    like.classList.add('likes');
    like.setAttribute('onclick', 'likes(event)');
    const icon = document.createElement('i');
    icon.classList.add('fa-solid', 'fa-heart');
    const number = document.createElement('p');
    number.textContent = photo.likes;
    like.appendChild(number);
    like.appendChild(icon);
    const media = document.createElement('div');
    if (photo.hasOwnProperty('image')) {
      const img = document.createElement('img');
      img.classList.add('photograph-gallery__img');
      img.setAttribute('src', `${url}/${photo.image}`);
      img.setAttribute('title', photo.title);
      img.setAttribute('alt', `${photo.title}`);
      media.appendChild(img);
    } else if (photo.hasOwnProperty('video')) {
      const video = document.createElement('video');
      video.classList.add('photograph-gallery__img');
      video.setAttribute('src', `${url}/${photo.video}`);
      video.setAttribute('title', photo.video);
      video.setAttribute('alt', photo.video);
      media.appendChild(video);
    }
    media.setAttribute('data-url', url);
    media.setAttribute('id', `media-${photo.id}`);
    media.setAttribute('onclick', 'launchLightBox(event)');
    imageBloc.appendChild(media);
    imageInfo.appendChild(h3);
    imageInfo.appendChild(like);
    imageBloc.style.cursor = 'pointer';
    imageBloc.appendChild(imageInfo);
    gallery.appendChild(imageBloc);
    // return photo;
  });
  const photograph = data.photographers.filter(
    (photographer) => photographer.id === idProfil,
  );
  const dailyPrice = document.createElement('div');
  dailyPrice.classList.add('photographer-dailyPrice');
  dailyPrice.setAttribute('id', 'dailyPrice');
  const totalLike = document.createElement('p');
  totalLike.classList.add('totalLikes');
  totalLike.innerHTML = `${images.reduce((acc, photo) => acc + photo.likes, 0)}<i class="fa-solid fa-heart"></i>`;
  const price = document.createElement('p');
  price.textContent = `${photograph[0].price}€ / jour`;
  dailyPrice.appendChild(totalLike);
  dailyPrice.appendChild(price);
  document.querySelector('main').appendChild(dailyPrice);
  return images;
}

function launchLightBox(event) {
  const mediaId = event.currentTarget.id;
  const id = mediaId.split('-')[1];
  const index = images.findIndex((image) => image.id === +id);
  url = event.currentTarget.dataset.url;
  currentIndex = index;
  const lightbox = document.getElementById('lightbox-modal');
  lightbox.style.display = 'block';
  const title = document.getElementById('lightbox-title');
  const img = document.getElementById('lightbox-img');
  const video = document.getElementById('lightbox-video');
  if (images[currentIndex].hasOwnProperty('image')) {
    video.style.display = 'none';
    img.style.display = 'block';
    img.setAttribute('src', `${url}/${images[currentIndex].image}`);
    img.setAttribute('alt', `Image de ${images[currentIndex].title}`);
  } else {
    img.style.display = 'none';
    video.style.display = 'block';
    video.setAttribute('src', `${url}/${images[currentIndex].video}`);
    video.setAttribute('alt', `Video ${images[currentIndex].title}`);
  }
  title.textContent = images[currentIndex].title;
}
function showNextImage() {
  currentIndex++;
  if (currentIndex >= images.length) {
    currentIndex = 0;
  }
  const title = document.getElementById('lightbox-title');
  const img = document.getElementById('lightbox-img');
  const video = document.getElementById('lightbox-video');
  if (images[currentIndex].hasOwnProperty('image')) {
    video.style.display = 'none';
    img.style.display = 'block';
    img.setAttribute('src', `${url}/${images[currentIndex].image}`);
    img.setAttribute('alt', `Image de ${images[currentIndex].title}`);
  } else {
    img.style.display = 'none';
    video.style.display = 'block';
    video.setAttribute('src', `${url}/${images[currentIndex].video}`);
    video.setAttribute('alt', `Video ${images[currentIndex].title}`);
  }
  title.textContent = images[currentIndex].title;
}

function showPreviousImage() {
  currentIndex--;
  if (currentIndex < 0) {
    currentIndex = images.length - 1;
  }
  const title = document.getElementById('lightbox-title');
  const img = document.getElementById('lightbox-img');
  const video = document.getElementById('lightbox-video');
  if (images[currentIndex].hasOwnProperty('image')) {
    video.style.display = 'none';
    img.style.display = 'block';
    img.setAttribute('src', `${url}/${images[currentIndex].image}`);
    img.setAttribute('alt', `Image de ${images[currentIndex].title}`);
  } else {
    img.style.display = 'none';
    video.style.display = 'block';
    video.setAttribute('src', `${url}/${images[currentIndex].video}`);
    video.setAttribute('alt', `Video ${images[currentIndex].title}`);
  }
  title.textContent = images[currentIndex].title;
}

function closeLightBox() {
  const lightbox = document.getElementById('lightbox-modal');
  lightbox.style.display = 'none';
}

// Fonction like()
const likes = (event) => {
  const n = Number(event.currentTarget.querySelector('p').innerText) + 1;
  const total = Number(document.querySelector('.totalLikes').innerText) + 1;
  event.currentTarget.querySelector('p').innerText = n;
  document.querySelector(
    '.totalLikes',
  ).innerHTML = `${total} <i class="fa-solid fa-heart"></i>`;
};

// Fonction tri
const sorted = (filtre) => {
  photographerData().then((photographer) => {
    displayGalery(photographer.name, filtre);
  });
};

const profil = null;
photographerData().then((photographer) => {
  displayData(photographer);
  displayGalery(photographer.name).then(
    (loadedImages) => (images = loadedImages),
  );
});
