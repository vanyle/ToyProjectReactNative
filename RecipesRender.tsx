/**
 * A wrapper around RecipesView to display recipes from a list of ids.
 */

import React from "react";
import PropTypes from 'prop-types';
import RecipesView from "./RecipesView";

type RecipesRenderProps = {
    ids: number[],
    onCocktailClicked: (id: number) => void
    onCocktailFavorite: (id: number, status: boolean) => void
};

class RecipesRender extends React.Component<RecipesRenderProps>{
    state: {isLoading: boolean, isError: boolean,drinks: {name: string, description: string, id: number}[]} = {
        drinks: [],
        isLoading: true,
        isError: false,
    }

    constructor(props: RecipesRenderProps) {
        super(props);
        this.state.drinks = [];  
    }
    async componentDidUpdate(prevProps: RecipesRenderProps){
        if(this.props.ids === undefined){
            return;
        }
        if(this.props.ids == prevProps?.ids){
            return;
        }

        this.setState({
            isLoading: true,
            isError: false
        });

        // Fetch the data for all the ids by making as many requests as needed.
        // https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i= <cocktailId here.>

        const drinks = [];
        for(const id of this.props.ids){
            try{
                const fetchUrl = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + id;
                const fetchedDrinks = await (await fetch(fetchUrl)).json();
                drinks.push({
                    name: fetchedDrinks.drinks[0].strDrink,
                    description: fetchedDrinks.drinks[0].strInstructions,
                    id: id
                }); 
            }catch(err){
                console.log("Warning: unable to load drink with id:",id);
                continue;
            }
        }
        this.setState({
            drinks,
            isLoading: false,
            isError: false
        });
    }
    componentDidMount(): void {
        this.componentDidUpdate({} as never);
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


export default RecipesRender;