/**
A component to display the details of a cocktail.
*/

import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { Icon } from '@rneui/themed';

class Cocktail extends Component{
  state: {name: string, isFavorite: boolean, description: string} = {
    name: "",
    description: "",
    isFavorite: false,
  }
  onClick: () => void;
  
  constructor(props: {name: string, description: string, onClick: () => void}){
    super(props);
    this.onClick = props.onClick;
    this.state.name = props.name;
    this.state.isFavorite = Math.random() > 0.8;
    this.state.description = props.description
  }

  static get propTypes() { 
    return { 
        description: PropTypes.string, 
        name: PropTypes.string,
        onClick: PropTypes.func
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
      <TouchableOpacity style={{
        flexShrink:1
      }}
      onPress={() => {
        this.props.onClick();
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
        </TouchableOpacity>
        <Icon reverse name='star' onPress={() => {
          this.setState((state: {isFavorite: boolean}) => {
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