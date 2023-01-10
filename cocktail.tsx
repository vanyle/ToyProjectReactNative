/**
A component to display the details of a cocktail.
*/

import React, { Component } from 'react';
import { Text, View } from 'react-native';

class Cocktail extends React.Component{
  state = {}
  
  constructor(props: {name: string}){
    super(props);
  }

  render(){
    return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center"
      }}>
      <Text style={{
        color: "green",
        fontSize: 20,
        }}>
         { this.props.name }
        </Text>
        <Text style={{
          fontSize: 10,
          margin: 10,
        }}>
          { this.props.description.substring(0, 50) + "..." }
        </Text>
    </View>
    )
  }
}

export default Cocktail;