# Bookmarker

Ce repository est le résultat d'un test technique. La consigne était la suivante :

Cet exercice a pour but d’évaluer vos compétences en JS ou Typescript :

Les exigences :

Vous devrez réaliser une application de gestion de bookmark pour ajouter des liens Vimeo et Flickr.

Ces liens référencés ne pourront être que de 2 types :
* Vidéo (provenant de Vimeo)
* Photo (provenant de Flickr)

Les propriétés communes d’un lien référencé sont :
* URL
* titre
* auteur
* date d'ajout

Les liens de type video auront les propriétés spécifiques suivantes :
* largeur
* hauteur
* durée

Les liens de type photo devront avoir en plus les propriétés :
* largeur
* hauteur

Il est possible d’associer des mots-clés pour chaque lien référencé.

La récupération des propriétés d’un lien référencé sont obtenues en utilisant le protocole ouvert oEmbed (**[http://oembed.com/](http://oembed.com/)**).

Pour visualiser et gérer ses liens référencés, l’utilisateur aura une vue principale sous forme de liste paginée avec un bouton d’ajout.

Chaque ligne du tableau doit avoir les informations communes et des liens pour modifier ou supprimer le lien.

La page de modification du lien comporte un formulaire pour ajouter, modifier et supprimer les mots clés associé au lien.

## Technos utilisées
* NodeJS 14
* React 17
* Typescript 4.2.3
* Docker / docker-compose

## Pré-requis
Il faut avoir docker et docker-compose d'installés pour démarrer l'ensemble de la composition!

Attention à ne pas avoir de services qui tournent sur les ports 80, 4003, 27017 !

## Mise en route
Pour démarrer le projet, il suffit juste de faire 
```sh
docker-compose up -d
```

Et enjoy 👍