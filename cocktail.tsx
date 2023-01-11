/**
A component to display the details of a cocktail.
*/

import React, { Component } from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';
import { Icon } from '@rneui/themed';

class Cocktail extends Component{
  state: {name: string, isFavorite: boolean, description: string} = {
    name: "",
    description: "",
    isFavorite: false,
  }
  
  constructor(props: {name: string, description: string}){
    super(props);
    this.state.name = props.name;
    this.state.isFavorite = Math.random() > 0.8;
    this.state.description = props.description
  }

  static get propTypes() { 
    return { 
        description: PropTypes.string, 
        name: PropTypes.string 
    }; 
  }

  render(){
    return (
    <View
      style={{
        justifyContent: "space-between",
        alignItems: "flex-start",
        paddingLeft: 10,
        paddingRight:10,
        flexDirection: "row",
        margin: 5,
        flex: 1,
        borderLeftWidth: 6,
        borderLeftColor: "#aaa"
      }}>
      <View style={{
        flexShrink:1
      }}>
      <Text style={{
        color: "green",
        fontSize: 20,
        textAlign: "left"
        }}>
         { this.state.name }
        </Text>
        <Text 
          numberOfLines={1}
        style={{
          fontSize: 10,
          flexShrink: 1,
          margin: 10,
        }}>
          { this.state.description }
        </Text>
        </View>
        <Icon reverse name='star' onPress={() => {
          this.setState((state) => {
            return {
              isFavorite: !state.isFavorite
            }
          })
        }} size={15} color={this.state.isFavorite ? "#000" : "#cc0"} type='font-awesome'></Icon>
    </View>
    )
  }
}

export default Cocktail;