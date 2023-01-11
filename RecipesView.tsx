/**
 * A component to display a list of recipes.
 */

import React from "react";
import { ActivityIndicator, FlatList, View, Text } from "react-native";
import Cocktail from "./Cocktail";
import PropTypes from 'prop-types';

class RecipesView extends React.Component{
    state: {isLoading: boolean, isError: boolean,drinks: {name: string, description: string, id: number}[]} = {
        drinks: [],
        isLoading: true,
        isError: false,
    }
    fetchUrl: string;
    onCocktailClicked: (id: number) => void;

    constructor(props: {fetchUrl: string, onCocktailClicked: (id: number) => void}) {
        super(props);
        this.state.drinks = [];
        this.onCocktailClicked = props.onCocktailClicked;
        this.fetchUrl = props.fetchUrl.toLowerCase();        
    }
    componentDidUpdate(prevProps: {fetchUrl: string | undefined}){
        if(this.fetchUrl === prevProps.fetchUrl){
            return;
        }
        console.log("Fetching from: ",this.fetchUrl);

        this.setState({
            isLoading: true,
            isError: false
        });

        fetch(this.fetchUrl).then((res) => res.json()).then(async (data) => {
            const transformedData = data.drinks.map((d: {strDrink: string, strInstructions: string, idDrink: string}) => {
                return {name: d.strDrink, description: d.strInstructions, id: Number(d.idDrink)}
            });
            this.setState(() => {
                return {
                   drinks: transformedData,
                   isLoading: false
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
        if(this.state.isLoading){
            return (
                <View style={{
                    padding: 10
                }}>
                    <ActivityIndicator style={{
                        flexDirection: "row",
                        justifyContent: "space-around",
                        padding: 10
                    }} size="large" color="#00ff00" />
                </View>
            )
        }else if(this.state.isError){
            return (
                <View style={{
                    padding: 10
                }}>
                    <Text style={{
                        textAlign: "center"
                    }}>
                        No results found
                    </Text>
                </View>
            )  
        }else{
            return (
                <FlatList
                style={{
                    width: "100 %",
                }}
                data={this.state.drinks}
                renderItem={({item}) => {
                    return (<Cocktail onClick={() => {
                        this.onCocktailClicked(item.id)
                    }} name={item.name} description={item.description} />)
                }}>
                </FlatList>
            )
        }
    }
}

export default RecipesView;