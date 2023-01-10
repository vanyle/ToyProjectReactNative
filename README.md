# Toy project to learn React Native.

Author: Antoine Delègue.
Date: 10/1/2023

## Features

_The general layout and features of the app that are planned._

Two main views:

- A view to display a (possibly infinite) list of recipes with a search bar.
- A view to show a detailed view of a recipe with glass types, instructions, etc...

Three tabs:

- A main tab that lists all the recipes available.
- A favorite tab to show the recipes that the user bookmarked.
- A random tab that displays a random recipe.

A Component to switch between tabs is available at the bottom.

## API endpoints used

Search cocktail by name
www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita

List all cocktails by first letter
www.thecocktaildb.com/api/json/v1/1/search.php?f=a

Search ingredient by name
www.thecocktaildb.com/api/json/v1/1/search.php?i=vodka

Lookup full cocktail details by id
www.thecocktaildb.com/api/json/v1/1/lookup.php?i=11007

Lookup ingredient by ID
www.thecocktaildb.com/api/json/v1/1/lookup.php?iid=552

Lookup a random cocktail
www.thecocktaildb.com/api/json/v1/1/random.php
