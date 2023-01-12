/**
 * Implementation of the various tabs as components.
 */

import React, { useState } from "react";
import {View, Text} from "react-native";
import HeaderBar from "./HeaderBar";
import RecipesView from "./RecipesView";

import {
    Colors,
  } from "react-native/Libraries/NewAppScreen";
import DetailedCocktailView from "./DetailedCocktailView";
import RecipesFetcher from "./RecipesFetcher";

function MainTab(){
    // A tab that represents a list of recipes with a search bar.
    
    const [searchQuery, setSearchQuery] = useState("");
    const handleSearch = (text: string) => {
        setSearchQuery(text);
    };
    const [cocktailId, setCocktailId] = useState(0);
    const [isCocktailDisplayed, setCocktailDisplayed] = useState(false);

    if(!isCocktailDisplayed){
        return (
            <View
                style={{
                backgroundColor: Colors.white,
                }}
            >
            <HeaderBar onSearch={handleSearch}/>
            <RecipesFetcher 
            onCocktailClicked={(cocktailId) => {
                setCocktailId(cocktailId);
                setCocktailDisplayed(true);
            }}
            fetchUrl={"https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + searchQuery}/>
            </View>
        );
    }else{
        return (
            <DetailedCocktailView
                lookupURL={"https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + cocktailId}
                onBack={() => {
                setCocktailDisplayed(false);
              }}/>
        )
    }
}
function FavoriteTab(){
    // A tab with the list of the favorite recipes of the user
    return (
        <RecipesView
            isLoading={false}
            isError={true}
            drinks={[]}
            onCocktailClicked={(id) => {
                // ...
            }}
        />
    );
}
function RandomTab(){
    // A tab displaying a random recipe each time it's opened.
    return (
        <DetailedCocktailView
            lookupURL={"https://www.thecocktaildb.com/api/json/v1/1/random.php"}
            onBack={undefined}/>
    );
}

export {MainTab, FavoriteTab, RandomTab};