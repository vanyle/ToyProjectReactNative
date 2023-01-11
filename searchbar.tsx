/**
 * A Component to provide a global search bar for a view.
 * It's slick, it's neat, it's more than a wrapper around TextInput, it's a search bar.
 */

import React from "react";
import { TextInput } from "react-native";

class SearchBar extends React.Component{
    state = {
        searchText: ""
    };
    // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
    onChangeTextCallback: (s: string) => void = (s) => {};

    constructor(props: object, onChangeText: (s:string) => void){
        super(props);
        this.onChangeTextCallback = onChangeText;
    }
    
    onChangeText(text: string){
        this.setState({searchText: text});
        this.onChangeTextCallback(text);
    }

    render(): React.ReactNode {
        return (
            <TextInput
                style={{
                    "color": "red"
                }}
                onChangeText={this.onChangeText}
                value={this.state.searchText}
                editable
                maxLength={40}
            />
        );
    }
}

export default SearchBar;