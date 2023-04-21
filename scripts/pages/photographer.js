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
let profil = null;
photographerData().then(photographer => {
    profil = photographer
    console.log(profil)
})