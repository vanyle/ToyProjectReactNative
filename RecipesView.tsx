/**
 * A component to display a list of recipes.
 */

import React from "react";
import { ActivityIndicator, FlatList, View, Text } from "react-native";
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
        this.props.fetchUrl = props.fetchUrl.toLowerCase();        
    }
    componentDidUpdate(prevProps){
        
        if(typeof prevProps === "undefined" || this.props.fetchUrl == prevProps.fetchUrl){
            return;
        }
        console.log("Fetching from: ",this.props.fetchUrl);

        this.setState({
            isLoading: true,
            isError: false
        });

        fetch(this.props.fetchUrl).then((res) => res.json()).then(async (data) => {
            const transformedData = data.drinks.map((d: any) => {
                return {name: d.strDrink, description: d.strInstructions}
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
        this.componentDidUpdate();
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
                    }} size="large" color="#00ff00">
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
                    return (<Cocktail name={item.name} description={item.description} />)
                }}>
                </FlatList>
            )
        }
    }
}

export default RecipesView;