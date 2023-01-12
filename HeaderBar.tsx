/**
 * A component to represent an Android style header bar with the Search bar, the title of the app, etc...
 */

import React from "react";
import { Text, TextInput, View } from "react-native";
import PropTypes from 'prop-types';

class HeaderBar extends React.Component{
    state: {searchText: string} = {
        searchText: ""
    }
    onSearch: (input: string) => void

    constructor(props: {onSearch: (input: string) => void}){
        super(props);
        this.onSearch = props.onSearch;
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
                    this.setState(() => {
                        return {searchText: text}
                    });
                    this.onSearch(text);
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
    static get propTypes() { 
        return { 
            onSearch: PropTypes.func
        }; 
    }
}

export default HeaderBar;