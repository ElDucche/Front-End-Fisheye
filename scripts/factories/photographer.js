function photographerFactory(data) {
  const {
    name,
    portrait,
    tagline,
    price,
    city,
    country,
    id,
  } = data;

  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement('article');
    const img = document.createElement('img');
    img.setAttribute('src', picture);
    img.setAttribute('alt', `Photo de ${name}`);
    const link = document.createElement('a');
    link.href = `./photographer.html?id=${id}`;
    link.appendChild(img);
    const h2 = document.createElement('h2');
    h2.textContent = name;
    const desc = document.createElement('div');
    desc.innerHTML = `<h3 class='photographer__country'>${city}, ${country}</h3><p class='photographer__tagline'>${tagline}</p><p class='photographer__price'>${price}€/jour</p>`;
    article.appendChild(link);
    article.appendChild(h2);
    article.appendChild(desc);
    return article;
  }
  return { name, picture, getUserCardDOM };
}
