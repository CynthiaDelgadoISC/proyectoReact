import React, { Component } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';


export class LoginPage extends Component {
    constructor(props){
        super(props);
    }
    
    render(){
        return (
        <View style={styles.container}>
            <Text>Login</Text>
            <Pressable 
            onPress={()=>this.props.navigation.navigate('Subscribe')}>
                 <Text>Subscribe</Text>
            </Pressable>
            <Pressable
            onPress={()=>this.props.navigation.navigate('Switch')}>
                <Text>Switch</Text>
            </Pressable>
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