import React from "react";
import type { Node } from "react";


import data from "./dataTest.json"
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  useColorScheme,
  View,
  Text,
  FlatList,
} from "react-native";

import {
  Colors,
} from "react-native/Libraries/NewAppScreen";
import Cocktail from "./cocktail";

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
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}
      >
      <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}
        >
        <View>
        <Text style={{fontSize: 40}}>Welcome to the Cocktail app!</Text>
        </View>
        <FlatList data={data.drinks}
        renderItem={({item}) => {
          return (<Cocktail name={item.strDrink} description={item.strInstructions} />)
        }}>
        </FlatList>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};


export default App;
