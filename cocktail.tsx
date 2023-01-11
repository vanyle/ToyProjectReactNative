/**
A component to display the details of a cocktail.
*/

import React, { Component } from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';

class Cocktail extends Component{
  state: {name: string, description: string} = {
    name: "",
    description: ""
  }
  
  constructor(props: {name: string, description: string}){
    super(props);
    this.state.name = props.name;
    this.state.description = props.description
    if(this.state.description.length > 50){
      this.state.description = this.state.description.substring(0, 50) + "...";
    }
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
        justifyContent: "center",
        alignItems: "center"
      }}>
      <Text style={{
        color: "green",
        fontSize: 20,
        }}>
         { this.state.name }
        </Text>
        <Text style={{
          fontSize: 10,
          margin: 10,
        }}>
          { this.state.description.substring(0, 50) + "..." }
        </Text>
    </View>
    )
  }
}

export default Cocktail;