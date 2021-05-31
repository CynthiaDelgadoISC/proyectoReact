import React, { Component } from 'react';
import { render } from 'react-dom';
import { StyleSheet, Text, View } from 'react-native';
import { SearchBar } from 'react-native-elements';


export class SubscribePage extends Component {
    constructor(props){
        super(props);
    }
    render(){
        return (
        <View style={styles.container}>
            <Text>Subscribe</Text>
            {/* <SearchBar
                placeholder="Type Here..."
                onChangeText={this.updateSearch}
                value=""
            /> */}
        </View>
        );
    } 
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });