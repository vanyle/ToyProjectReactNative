/**
 * A component to display a list of recipes.
 */

import React from "react";
import { ActivityIndicator, FlatList, View, Text } from "react-native";
import Cocktail from "./Cocktail";
import PropTypes from 'prop-types';

type RecipesViewProps = {
    isLoading: boolean,
    isError: boolean,
    drinks: {name: string, description: string, id: number}[],
    onCocktailClicked: (id: number) => void
    onCocktailFavorite: (id: number, status: boolean) => void;
} 

class RecipesView extends React.Component<RecipesViewProps>{
    constructor(props: RecipesViewProps) {
        super(props);
    }
  
    static get propTypes() { 
        return { 
            onCocktailClicked: PropTypes.func,
            drinks: PropTypes.array,
            isError: PropTypes.bool,
            isLoading: PropTypes.bool,
        }; 
    }
    render(): React.ReactNode {
        if(this.props.isLoading){
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
        }else if(this.props.isError){
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
                data={this.props.drinks}
                renderItem={({item}) => {
                    return (
                        <Cocktail
                            onClick={() => {
                                this.props.onCocktailClicked(item.id)
                            }}
                            onFavorite={(status: boolean) => {
                                this.props.onCocktailFavorite(item.id, status);
                            }}
                            id={item.id}
                            name={item.name}
                            description={item.description}
                        />)
                }}>
                </FlatList>
            )
        }
    }
}

export default RecipesView;