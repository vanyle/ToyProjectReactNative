/**
A component to display the details of a cocktail.
*/

import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { Icon } from '@rneui/themed';
import Toast from 'react-native-simple-toast';
import { GlobalContext } from './favoriteState';

type CocktailProps = {
  name: string,
  description: string,
  id: number,
  onClick: () => void,
  onFavorite: (isFav: boolean) => void
};

class Cocktail extends Component<CocktailProps> {
  state: {name: string, description: string} = {
    name: "",
    description: ""
  }

  constructor(props: CocktailProps){
    super(props);
    
    this.state.name = props.name;
    this.state.description = props.description;
  }

  static get propTypes() { 
    return {
        description: PropTypes.string, 
        name: PropTypes.string,
        onClick: PropTypes.func,
        onFavorite: PropTypes.func,
    }; 
  }

  render(){
    return (
      <GlobalContext.Consumer>
        {({favoriteIds}) => (
    <View
      style={{
        justifyContent: "space-between",
        alignItems: "flex-start",
        paddingLeft: 10,
        paddingRight:10,
        flexDirection: "row",
        margin: 5,
        flex: 1,
        borderLeftWidth: 3,
        borderLeftColor: "#333"
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
          if(!(favoriteIds.indexOf(this.props.id) !== -1)){
            Toast.show(this.state.name + " added to favorites.", 2, {});
          }else{
            Toast.show(this.state.name + " removed from favorites.", 2, {});
          }
          this.props.onFavorite(!(favoriteIds.indexOf(this.props.id) !== -1));
        }} size={15} color={favoriteIds.indexOf(this.props.id) !== -1 ? "#000" : "#cc0"} type='font-awesome'></Icon>
    </View>
        )}
    </GlobalContext.Consumer>
    )
  }
}

export default Cocktail;