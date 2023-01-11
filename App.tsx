import React from "react";
import type { Node } from "react";


import data from "./dataTest.json"
import {
  SafeAreaView,
  StatusBar,
  useColorScheme,
  View,
  Text,
} from "react-native";

import {
  Colors,
} from "react-native/Libraries/NewAppScreen";

import HeaderBar from "./HeaderBar";
import RecipesView from "./RecipesView";

const isDarkMode = false; //useColorScheme() === "dark";

class App extends React.Component{
  state = {
    searchQuery: "a"
  }
  constructor(props){
    super(props);
    this.handleSearch = this.handleSearch.bind(this);
  }
  handleSearch(text: string){
    this.setState(() => {
      // console.log(this.state.searchQuery);
      return {
        searchQuery: text
      }
    });
  }
  render() {
    const backgroundStyle = {
      backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

    return (
      <SafeAreaView style={backgroundStyle}>
        <StatusBar
          barStyle={isDarkMode ? "light-content" : "dark-content"}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <View
            style={{
              backgroundColor: isDarkMode ? Colors.black : Colors.white,
            }}
          >
          <HeaderBar onSearch={this.handleSearch}/>
          <RecipesView fetchUrl={"https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + this.state.searchQuery}/>
          </View>
      </SafeAreaView>
    );
  }
}


export default App;
