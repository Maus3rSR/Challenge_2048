# 2048 - the Return

## Information sur ce dépôt

**Ce dépôt est une expérimentation de l'approche TDD dans un contexte plus large que les katas.**
Les messages des commits ont été laissés de côté spécifiquement pour ce dépôt avec uniquement l'utilisation des "red / green / refactor" et quelques commits de préparation.

De cette manière (pas optimal pour un vrai projet nous sommes d'accord) nous pouvons suivre l'évolution itérative des cas d'utilisation.

_PS: Les baby steps n'ont pas été respecté de manière stricte ici._
_Le dépôt a été utilisé pour expérimenter la conception du jeu 2048 et de l'utiliser pour l'implémenter dans un projet d'étudiants avec une application web, ce qui m'a poussé à être un peu plus pragmatique sur certaines opérations._

## Règles du jeu

Règles d'un 2048

2048 se joue sur une grille de 4×4 cases,
avec des tuiles de couleurs et de valeurs variées (mais toujours des puissances de deux)

Au début du jeu, deux tuiles apparaissent avec soit un 2, soit un 4.

Lors d'un mouvement, l'ensemble des tuiles du plateau sont déplacés dans la même direction jusqu'à rencontrer les bords du plateau ou une autre tuile sur leur chemin.

Si deux tuiles, ayant le même nombre, entrent en collision durant le mouvement, elles fusionnent en une nouvelle tuile de valeur double (par ex. : deux tuiles de valeur « 2 » donnent une tuile de valeur « 4 »).

À chaque mouvement, une tuile portant un 2 ou un 4 apparaît dans une case vide de manière aléatoire.

La partie est gagnée lorsqu'une tuile portant la valeur « 2048 » apparaît sur la grille

## Cas d'utilisation

### Démarrer une partie

En tant que joueur, je souhaite pouvoir démarrer une nouvelle partie afin de commencer à jouer

**Règles**

- Quelle que soit la taille de la grille, on y fait apparaître 2 tuiles qui contiennent aléatoirement soit 2 ou 4

### Score / Meilleur Score

En tant que joueur, je souhaite pouvoir suivre le score de la partie afin de savoir jusqu'où j'arrive à aller

**Règles**

- Le résultat de la fusion de une ou plusieurs tuiles est ajouté au score
- Le meilleur score est retenu entre les différentes partie

### Déplacer les tuiles

En tant que joueur, je souhaite pouvoir déplacer toutes les tuiles dans une direction, afin de tenter de faire fusionner les tuiles de même valeur

**Règles**

- Une tuile se déplace dans une direction donnée jusqu'à rencontrer une autre tuile de valeur différente, ou un bord du jeu
- Une tuile qui rencontre une tuile de même valeur fusionne (addition des deux valeurs)
- La tuile fusionnée sera à l'emplacement de la tuile la plus proche du bord vers laquelle les tuiles se dirigent
