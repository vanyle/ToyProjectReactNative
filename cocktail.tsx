/**
A component to display the details of a cocktail.
*/

import React from 'react';
import { Text, View } from 'react-native';

class Cocktail extends React.Component{
  state = {}

  render(){
    return (
    <View
      style={{
        backgroundColor: "red",
        justifyContent: "center",
        alignItems: "center"
      }}>
      <Text style={{
        color: "green"
        }}>Vodka, Orange Juice and Cointreau</Text>
    </View>
    )
  }
}

export default Cocktail;