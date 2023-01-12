import React from "react";
import {
  StatusBar,
  useColorScheme,
  useWindowDimensions,
  View,
} from "react-native";

import {
  Colors,
} from "react-native/Libraries/NewAppScreen";

import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { MainTab, RandomTab, FavoriteTab } from "./Tabs";

const renderScene = SceneMap({
  recipe: MainTab,
  random: RandomTab,
  favorite: FavoriteTab
});

const renderTabBar = (props: any) => (
  <TabBar
    {...props}
    indicatorStyle={{ backgroundColor: '#333' }}
    style={{ backgroundColor: '#0a0' }}
  />
);

function App(){
  const layout = useWindowDimensions();
  const isDarkMode = useColorScheme() === "dark";
    
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'recipe', title: 'Recipes' },
    { key: 'favorite', title: 'Favorites' },
    { key: 'random', title: 'Random' },
  ]);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  
  return (
    <View style={{
      width: layout.width,
      height: layout.height
    }}>
      <StatusBar
        barStyle={isDarkMode ? "light-content" : "dark-content"}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderTabBar={renderTabBar}

        style={{
          marginTop: 45 /* Hardcoded value, this is problematic */
        }}
      />
      </View>
  );
}

/*
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
  }
}
*/

export default App;
