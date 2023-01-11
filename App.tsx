import React from "react";

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
import DetailedCocktailView from "./DetailedCocktailView";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();
const isDarkMode = false; //useColorScheme() === "dark";

function ApplicationTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Recipes" component={HomeScreen} />
      <Tab.Screen name="Favorite" component={SettingsScreen} />
      <Tab.Screen name="Random" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

class App extends React.Component{
  state = {
    searchQuery: "",
    inCocktailView: false,
    displayedCocktailId: 0
  }

  constructor(props: object){
    super(props);
    this.handleSearch = this.handleSearch.bind(this);
  }
  handleSearch(text: string){
    this.setState(() => {
      return {
        searchQuery: text
      }
    });
  }
  render() {
    const backgroundStyle = {
      backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };
    if(this.state.inCocktailView){
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
            <DetailedCocktailView cocktailId={this.state.displayedCocktailId} onBack={() => {
              this.setState({
                inCocktailView: false
              })
            }}/>
          </View>
        </SafeAreaView>
      );
    }else{
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
            <RecipesView 
            onCocktailClicked={(cocktailId) => {
                this.setState({
                  displayedCocktailId: cocktailId,
                  inCocktailView: true
                })
            }}
            fetchUrl={"https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + this.state.searchQuery}/>
          </View>
        </SafeAreaView>
      );
    }
  }
}


export default App;
