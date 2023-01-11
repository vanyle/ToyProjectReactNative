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

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === "dark";

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
        <HeaderBar/>
        
        <RecipesView fetchUrl="https://www.thecocktaildb.com/api/json/v1/1/search.php?f=b"/>
        </View>
    </SafeAreaView>
  );
};


export default App;
