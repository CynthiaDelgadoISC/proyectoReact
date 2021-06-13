import React,{ useState, useEffect  } from 'react';
import { StyleSheet, Text, View,ScrollView,Modal,Pressable, FlatList, TouchableOpacity,Image } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Header, Input, Button, SearchBar } from 'react-native-elements';
import * as yup from 'yup';
import {Alert} from 'react-native-alert-dialogues';



export function PerfilUserPage({route, navigation}) {

    return (
      <SafeAreaProvider style={styles.container}>
        <Header
        centerComponent={{ text: 'PERFIL DE USUARIO', style: { color: '#fff' } }}/>
        
      </SafeAreaProvider>
    );
  }


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
   
  });