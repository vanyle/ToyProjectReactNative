/**
 * A component to represent an Android style header bar with the Search bar, the title of the app, etc...
 */

import React from "react";
import { Text, View } from "react-native";

class HeaderBar extends React.Component{
    constructor(props: {onSearch: (input: string) => void}){
        super(props)
    }
    render(): React.ReactNode {
        return (
            <View style={{
                backgroundColor: "lime",
                padding: 10
            }}>
            <Text style={{fontSize: 20}}>Drinkmark</Text>
            </View>
        )
    }
}

export default HeaderBar;