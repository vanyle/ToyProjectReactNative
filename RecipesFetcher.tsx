/**
 * A wrapper around RecipesView to display recipes from a url.
 */

import React from "react";
import PropTypes from 'prop-types';
import RecipesView from "./RecipesView";

type RecipesFetcherProps = {
    fetchUrl: string,
    onCocktailClicked: (id: number) => void,
    onCocktailFavorite: (id: number, status: boolean) => void,
};

export default class RecipesFetcher extends React.Component<RecipesFetcherProps>{
    state: {isLoading: boolean, isError: boolean,drinks: {name: string, description: string, id: number}[]} = {
        drinks: [],
        isLoading: true,
        isError: false,
    }

    constructor(props: RecipesFetcherProps) {
        super(props);
        this.state.drinks = [];  
    }
    componentDidUpdate(prevProps: {fetchUrl: string | undefined}){
        if(this.props.fetchUrl === undefined){
            return;
        }
        if(this.props.fetchUrl.trim() == prevProps.fetchUrl?.trim()){
            return;
        }

        this.setState({
            isLoading: true,
            isError: false
        });

        fetch(this.props.fetchUrl).then((res) => res.json()).then(async (data) => {
            const transformedData = data.drinks.map((d: {strDrink: string, strInstructions: string, idDrink: string}) => {
                return {name: d.strDrink, description: d.strInstructions, id: Number(d.idDrink)}
            });
            this.setState(() => {
                return {
                   drinks: transformedData,
                   isLoading: false,
                   isError: false
                }
            });
        }).catch((err) => {
            console.log(err);
            this.setState(() => {
                return {
                  isError: true,
                  isLoading: false
                };
            });
        });
    }
    componentDidMount() {
        this.componentDidUpdate({fetchUrl: undefined});
    }
  
    static get propTypes() { 
        return { 
            fetchUrl: PropTypes.string,
            onCocktailClicked: PropTypes.func
        }; 
    }
    render(): React.ReactNode {
        return <RecipesView 
            onCocktailClicked={this.props.onCocktailClicked} 
            onCocktailFavorite={this.props.onCocktailFavorite}
            isLoading={this.state.isLoading}
            isError={this.state.isError}
            drinks={this.state.drinks}
        />
    }
}
