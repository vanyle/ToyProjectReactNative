/**
A component to display the details of a cocktail.
*/

import React from 'react';
import { Text, View } from 'react-native';

class CocktailComponent extends React.Component{
  state = {}
  render(){
    return (
    <View
      style={{
        color: "green",
        backgroundColor: "red",
        justifyContent: "center",
        alignItems: "center"
      }}>
      <Text>Vodka, Orange Juice and Cointreau</Text>
    </View>
    )
  }
}

export default CocktailComponent;