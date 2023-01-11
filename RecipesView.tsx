/**
 * A component to display a list of recipes.
 */

import React from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
import Cocktail from "./Cocktail";
import PropTypes from 'prop-types';

class RecipesView extends React.Component{
    state: {isLoading: boolean, isError: boolean,drinks: {name: string, description: string}[]} = {
        drinks: [],
        isLoading: true,
        isError: false,
    }

    constructor(props: {fetchUrl: string}) {
        super(props);
        this.state.drinks = [];
        // strDrink, strInstructions
        // perform the fetch.
        console.log("Fetching from: ",props.fetchUrl);
        fetch(props.fetchUrl).then((res) => res.json()).then(async (data) => {
            const transformedData = data.drinks.map((d: any) => {
                return {name: d.strDrink, description: d.strInstructions}
            });
            console.log("Transformation performed: ",transformedData);
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
    static get propTypes() { 
        return { 
            fetchUrl: PropTypes.string, 
        }; 
    }
    render(): React.ReactNode {
        if(this.state.isLoading){
            return (
                <View style={{
                    justifyContent: "center",
                    flex: 1,
                    height: "50%"
                }}>
                    <ActivityIndicator style={{
                        flexDirection: "row",
                        justifyContent: "space-around",
                        padding: 10
                    }} size="large" color="#00ff00" />
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
                    return (<Cocktail name={item.name} description={item.description} />)
                }}>
                </FlatList>
            )
        }
    }
}

export default RecipesView;