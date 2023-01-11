/**
 * A component to represent an Android style header bar with the Search bar, the title of the app, etc...
 */

import React from "react";
import { Text, TextInput, View } from "react-native";

class HeaderBar extends React.Component{
    state: {searchText: string} = {
        searchText: ""
    }
    constructor(props: {onSearch: (input: string) => void}){
        super(props);
        this.props.onSearch = props.onSearch;
    }
    render(): React.ReactNode {
        return (
            <View style={{
                backgroundColor: "lime",
                padding: 10,
                flexDirection: "row",
                justifyContent: "space-around"
            }}>
            <Text style={{fontSize: 20}}> Drinkmark</Text>
            <TextInput
                placeholder="Search for an item"
                onChangeText={(text) => {
                    this.setState((state) => {
                        return {searchText: text}
                    });
                    this.props.onSearch(text);
                }}
                style={{
                    padding: 5,
                    width: "60%",
                    borderRadius: 10,
                    backgroundColor: "white"
                }}
            />
            </View>
        )
    }
}

export default HeaderBar;