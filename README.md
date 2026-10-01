# Beauty Nell — site vitrine

Site statique (HTML/CSS/JS, sans build) pour la marque de soins Beauty Nell.

## Structure

```
BeautyNell/
├── index.html         page d'accueil
├── catalogue.html     page "toute la boutique" (les 5 produits, même design)
├── css/style.css      tous les styles
├── js/main.js         menu mobile, nav qui s'opacifie au scroll, formulaire newsletter
└── images/            visuels (mélange de vraies photos et d'emplacements temporaires)
```

Le bouton "Voir tout →" de la rangée "Meilleures ventes" renvoie vers `catalogue.html`,
qui reprend les mêmes 5 produits avec le même design de carte : vidéo produit en lecture
automatique (plus besoin de survoler), icône panier discrète en haut à droite de l'image
(plus de gros bouton texte), catégorie, nom, note et prix — coins carrés, format plus plat,
sans encadré, pour coller à la référence visuelle.

Un 5e produit complète la rangée : **Lotion Tonique Équilibrante** (16 500 FCFA), avec
`images/serum-amber.jpg` et `videos/serum-amber.mp4` (flacon compte-gouttes ambré fourni).
Le nom "Lotion Tonique Équilibrante" date du produit précédent et peut ne plus coller
au visuel (flacon de sérum, pas de tonique) — dites-moi le vrai nom/prix si besoin.

## Remplacer les visuels

Certains fichiers sont déjà de vraies photos, d'autres restent des emplacements
temporaires (fond crème + légende) en attendant vos visuels définitifs. Pour changer une
image, remplacez le fichier en gardant le même nom (ou mettez à jour le `src` dans
`index.html`) :

| Fichier | Utilisation | Format conseillé |
|---|---|---|
| `hero.jpg` | Photo principale du hero | large, ratio ~16:9 |
| `serum.jpg` | Sérum — bloc "manifeste", témoignage, carte "Sérums", étape 2 du rituel | ratio 3:4 |
| `cream-jar.jpg` | Crème — carte "Hydratants", visuel diagnostic | ratio 3:4 |
| `oil-bottles.jpg` | Huile corps — bloc "manifeste" | ratio 3:4 |
| `cleansing-balm.jpg` | Baume nettoyant — témoignage, carte "Nettoyants", étape 1 du rituel | ratio 3:4 |
| `lotion-face.jpg` | Application crème visage — carte "Soins visage", étape 3 du rituel | ratio 3:4 |
| `avatar-portrait.jpg` | Portrait cliente (témoignage) | carré |
| `peau-avant.jpg` | Peau avec imperfections — calque "Avant" du slider "L'effet éclat" | même cadrage que `peau-apres.jpg` |
| `peau-apres.jpg` | Peau nette — calque "Après" du slider "L'effet éclat" | même cadrage que `peau-avant.jpg` |
| `cream-tube.jpg` | Tube de crème — carte "Crème Barrière Karité" (bloc "manifeste") | ratio 3:4 |
| `spray-bottle.jpg` | Flacon spray — carte "Huile Sèche Karité & Baobab" (rangée "Meilleures ventes") | ratio 3:4 |

Ce sont actuellement des photos de stock libres de droits (licence Unsplash, usage
commercial autorisé) choisies pour coller au style visé, en attendant vos vraies photos
de produits et de clientes — remplacez-les dès que vous avez votre propre shooting.

Utilisez de préférence des `.jpg`/`.webp` compressés (< 300 Ko par image) pour un
chargement rapide.

## Vidéos

| Fichier | Utilisation |
|---|---|
| `videos/serum-drop.mp4` | Goutte de sérum — carte "Sérum Éclat Vitamine C" (bloc "manifeste") |
| `videos/product-loop.mp4` | Animation produit — bloc "Analyse de peau" (`diag-promo`) |
| `videos/jar-unscrew.mp4` | Pot qui se dévisse — image des 3 soins alignés, section "Le rituel en trois gestes" |
| `videos/cream-tube.mp4` | Tube de crème orange — carte "Crème Barrière Karité" (bloc "manifeste", ligne des 3 produits) |
| `videos/spray-bottle.mp4` | Flacon qui s'ouvre — carte "Huile Sèche Karité & Baobab" (bloc "manifeste", ligne des 3 produits) |
| `videos/balm-jar.mp4` | Pot au couvercle métallisé qui se dévisse — carte "Nettoyants" (grille de catégories) |
| `videos/woman-portrait.mp4` | Portrait femme, caméra qui avance — photo principale de "Des formules précises, pensées pour votre peau" (`diag-photo`) |

Sur les 5 cartes produit qui ont une vidéo, elle se joue automatiquement une seule fois
dès le chargement de la page (sans avoir besoin de survoler la carte), puis s'efface en
fondu pour laisser réapparaître la photo statique en dessous.

⚠️ `cream-tube.jpg`/`cream-tube.mp4` (carte "Crème Barrière Karité") et `spray-bottle.jpg`/
`spray-bottle.mp4` (carte "Huile Sèche Karité & Baobab") affichent la marque "krème" sur
l'emballage — ce sont des visuels fournis en l'état. `cleansing-balm.jpg` (carte "Baume
Nettoyant Doux") reste une photo "lifestyle" (main tenant le pot) plutôt qu'un packshot.
À remplacer en priorité avec votre propre shooting produit avant la mise en ligne définitive.

## Section "Soins" et module de réservation

La section `#soins` reprend le catalogue de l'institut (Visage / Corps / Capillaires,
onglets cliquables) avec les tarifs réels transmis par la cliente, plus le forfait
"L'expérience complète" (150 000 FCFA) mis en avant comme soin signature au-dessus des
onglets. La section `#rdv` reproduit le parcours de réservation de son ancien site (choix
du jour et du créneau, acompte Mobile Money, règlement de l'institut) mais avec le design
Beauty Nell.

Le catalogue Visage compte maintenant 5 soins, dont deux avec un encart de contre-indication
(classe `.svc-warn`, repris de son ancien site) : "Soin Visage Glass Skin" (45 000 FCFA,
contre-indication peau très irritée/acné inflammatoire) et "Peeling Signature" (120 000 FCFA,
"jamais en premier soin"). Ce dernier s'appelait "Luxury Peel" sur l'ancien site — renommé
pour rester cohérent avec la marque Beauty Nell, comme "Luxury Massage" → "Massage Signature" ;
dites-moi si vous préférez garder les noms d'origine.

Le bouton "Réserver via WhatsApp" ouvre une conversation WhatsApp pré-remplie avec la
date, le créneau et le soin choisis — aucune prise de rendez-vous en base de données,
c'est le même principe manuel (confirmation par Mme Sabrina) que sur l'ancien site.

Infos reprises telles quelles de son ancien site (`index.html`, section `#rdv`) :
numéro Mobile Money **01 67 97 56 26**, acompte de **5&nbsp;100&nbsp;FCFA**, horaires
**lundi-samedi 10h-17h**. Le lien WhatsApp du bouton utilise le même numéro au format
international (`229167975626`).

⚠️ Les créneaux proposés (10h, 11h, 14h, 16h) sont fixes pour l'instant — sans backend,
le site ne peut pas savoir automatiquement lesquels sont déjà pris ; Mme Sabrina confirme
la disponibilité manuellement par WhatsApp, comme sur l'ancien site.

## Carte et témoignage

Le footer inclut désormais une carte Google Maps intégrée (`iframe`, sans clé API) centrée
sur "Haie Vive, Cotonou, Bénin" — à ajuster avec l'adresse exacte de l'institut dans
`index.html` (paramètre `q=` de l'URL de la carte).

Le témoignage client ("Effet éclat") a été retiré à la demande de la cliente ; il ne reste
que le slider avant/après dans cette section.

## Voir le site

Ouvrez simplement `index.html` dans un navigateur, ou servez le dossier avec un serveur
local, par exemple :

```
npx serve .
```

## Déployer

Le site est 100% statique : il peut être déployé tel quel sur Netlify, Vercel, GitHub
Pages ou tout hébergement mutualisé — il suffit d'uploader le dossier.
