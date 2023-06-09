// const photographerFactory = require('../factories/photographer');

async function getPhotographers() {
  const photographers = await fetch('data/photographers.json')
    .then((r) => r.json())
    .then((r) => r.photographers);
  return {
    photographers: [...photographers],
  };
}

async function displayData(photographers) {
  const photographersSection = document.querySelector('.photographer_section');

  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

async function init() {
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers();
  displayData(photographers);
}

init();
