import React from "react";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";
import { Icon } from '@rneui/themed';

import data from "./dataTest.json";

const dIdx = 10;

class DetailedCocktailView extends React.Component{
    ingredients: string[] = [];
    state = {
        title: "",
        imageURI: "",
        category: "",
        cid: 0,
        isLoading: true,
        isError: false
    }

    constructor(props: {cocktailId: number}){
        super(props);
        this.state.cid = props.cocktailId;
    }
    componentDidMount(){
        const url = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + this.state.cid;

        this.setState({
            isLoading: true,
            isError: false
        });

        fetch(url).then((res) => res.json()).then(async (data) => {
            console.log(data);
            let ingredients: string[] = [];

            for(let i = 1; i <= 15;i++){
                let ing: string | null = data.drinks[0]["strIngredient" + i];
                if(ing !== null){
                    ingredients.push(ing);
                }else{
                    break;
                }
            }
            this.setState(() => {
                return {
                   title: data.drinks[0].strDrink,
                   category: data.drinks[0].strCategory,
                   ingredients: ingredients,
                   instructions: data.drinks[0].strInstructions,
                   imageURI: data.drinks[0].strDrinkThumb,
                   isLoading: false
                }
            });
        }).catch((err) => {
            this.setState(() => {
                return {
                  isError: true,
                  isLoading: false
                };
            });
        });
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

        }
        if(this.state.isError){
            return (
            <View>
                <View style={{
                backgroundColor: "lime",
                padding: 10,
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: "center"
            }}>
                <Text
                    style={{
                        fontSize: 30,
                        fontWeight: "bold"
                    }}>No internet</Text>
                <Icon name="angle-right" onPress={() => {
                    this.props.onBack();
                }} size={30} color="#000" type="font-awesome"></Icon>
            </View>
            <View style={{
                padding:10
            }}>
                <Text>
                    Try again
                </Text>
            </View>
            </View>
        )
        }

        return (
            <View>
                <View style={{
                backgroundColor: "lime",
                padding: 10,
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: "center"
            }}>
                <Text
                    style={{
                        fontSize: 30,
                        fontWeight: "bold"
                    }}>{this.state.title}</Text>
                <Icon name="angle-right" onPress={() => {
                    this.props.onBack();
                }} size={30} color="#000" type="font-awesome"></Icon>
            </View>
            <View style={{
                padding:10
            }}>
                <Text style={{
                    fontStyle: "italic"
                }}>
                    {this.state.category}
                </Text>
                <Text style={{
                    fontWeight: "bold",
                    paddingTop: 5,
                }}>Ingredients:</Text>
                <FlatList
                style={{
                    margin: 0,
                }}
                data={this.state.ingredients}
                renderItem={(element) => {
                    return (
                        <Text>- {element.item}</Text>
                    )
                }}>
                </FlatList>
                <Text style={{
                    fontWeight: "bold",
                    paddingTop: 5
                }}>Instructions:</Text>
                <Text>{this.state.instructions}</Text>
                <View style={{
                    alignItems: "center"
                }}>
                <Image
                    style={{
                        width: "60%",
                        height: 150,
                        borderRadius: 10,
                    }}
                    source={{
                        uri: this.state.imageURI
                    }}
                />
                </View>
            </View>
            </View>
        )
    }
}

export default DetailedCocktailView;