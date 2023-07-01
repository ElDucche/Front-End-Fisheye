# Front End projet Fisheye

Le projet fisheye est divisé en plusieurs dossiers et fichiers. 

```
- asset
	|- gallery (contient les photos)
	|- icone (contient l'icone X)
	|- images (contient le logo)
	|- photographers (les photos de profil des photographes)
- css
	|- photographer.css (pour la page photographer.html)
	|- style.css (pour index et photographer)
- data
	|- photographer.json (bdd du projet)
- scripts
	|- factories
			|- photographer.js (code pour l'affichage de la page d'accueil)
	|- pages
			|- index.js (logique de la page index)
			|- photographer.js (logique de la page photographer)
- eslint.config
- index.html (point d'entrée du projet)
- photographer.html

```

## Fonctionnement du code

### Page index

- Les éléments statique de la page index sont disponible et mis en place depuis le fichier index.html.
- Le prototype de la div pour chaque photographe est créé par scripts/factories/photographer.js
- La récupération des données et l’initialisation de la page se fait via scripts/pages/index.js

### Page photographer

- Les éléments statique de la page index sont disponible et mis en place depuis le fichier photographer.html.
- La logique ainsi que les modèles de composant sont directement gérés depuis le fichier scripts/pages/photographer.js. La logique alimentant la lightbox également.
- La logique et le fonctionnement de la modale contact sont gérés depuis script/utils/contactForm.js