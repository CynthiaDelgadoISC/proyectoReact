import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Modal, Pressable, Image,ScrollView, } from 'react-native';
import { Rating, AirbnbRating } from 'react-native-ratings';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Header } from 'react-native-elements';
import Icon from 'react-native-vector-icons/AntDesign';
import {Alert} from 'react-native-alert-dialogues';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack' ;
import { AddReviewPage } from './add_review_page';
import Global from '../configuration/global';

const Stack=createStackNavigator();

function modalContent({navigation}) {
  const [alertVisible, setAlertVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedReview, setSelectedReview] = useState({});
  const [DATA , setRegData] = useState(DATA);
  let change = 0;

  useEffect( () => {
    fetch(`${Global.serverURL}/api/resenas/ByIdUsuario?id=${Global.user.idUsuario}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json',
      },
    })
    .then((res)=> res.json())
    .then((data) => {
      setRegData(data);
    });
  },[])

  const renderItem = ({ item }) => (
    
    <TouchableOpacity style={styles.item}
      onPress={() => {
        setSelectedReview(item)
        setModalVisible(true)
      }}>
      <Image 
        style={styles.tinyLogo}
        source={{ uri: 'https://reactnative.dev/img/tiny_logo.png',}}
      />
      <View style={{flex:4}}>
        <Text style={styles.date}>{item._fecha}</Text>
        <Text style={styles.title}>{item._contenido != null?item._contenido[0]._titulo: ""}</Text>
        <Rating
            ratingCount={5}
            readonly={true}
            startingValue={item._calificacion}
            imageSize={20}
            ratingColor='#3498db'
            ratingBackgroundColor='#c8c7c8'
          />
      </View>

    </TouchableOpacity>
  );
  return(
    <SafeAreaProvider style={styles.container}>
      <Header
        centerComponent={{ text: 'MIS RESEÑAS', style: { color: '#fff' } }}
      />
      <FlatList style={styles.flatList}
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item._id}
      />
       {/* Alert */}
       <Alert
          visible={alertVisible}
          type= "success"
          okPressed={() =>{
            setAlertVisible(false)
            setModalVisible(false)
          }
          }
          title= "Reseña Eliminada!!!"
          message=''
        /> 

      {/* Modal Reseña */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >

        
<View style={styles.centeredView}>
    <View style={styles.modalView}>
    <View style={{flexDirection:'row', alignSelf:'flex-end'}}>
        <Icon.Button name={'form'} color={'gray'} backgroundColor="transparent"  size={32} style={{paddingVertical:10, paddingHorizontal:5}} 
          onPress={() => {
            setModalVisible(false)
            navigation.navigate('edit',{viewId:selectedReview._id})
          }}
        />
        <Icon.Button name={'delete'} color={'gray'} backgroundColor="transparent" size={32} style={{paddingVertical:10, paddingHorizontal:5}}
          onPress={()=> {
            console.log(selectedReview._id);
            fetch(`${Global.serverURL}/api/resenas/ById?id=${selectedReview._id}`, {
              method: 'DELETE',
              headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json',
              },
            })
            .then((res)=> {})
            .then((data) => {
              change++;
              setAlertVisible(true)
              let aux =DATA.filter( (item) => {
                if(item._id != selectedReview._id){
                  return item;
                }
              });
              setRegData(aux);
            });
          }} 
        />
      </View>   
    <ScrollView style={{marginVertical:10}} > 
      <Text style={{textAlign:'right', paddingVertical:10}}>{selectedReview.fecha} </Text>
      <Image 
        style={styles.tinyLogoModal}
        source={{ uri: 'https://reactnative.dev/img/tiny_logo.png',}}
      />
      <Text style={styles.titleModal}>{selectedReview._contenido != null?selectedReview._contenido[0]._titulo: ""}</Text>
      <Text style={styles.modalText}>{selectedReview._descripcion}</Text>
      <Rating
      ratingCount={5}
      readonly={true}
      startingValue={selectedReview._calificacion}
      imageSize={30}
      ratingColor='#3498db'
      ratingBackgroundColor='#c8c7c8'
      />
    </ScrollView>

      <Pressable
        style={styles.buttonClose}
        onPress={() => setModalVisible(!modalVisible)}
      >
        <Text style={styles.textStyle}>Cerrar</Text>
      </Pressable>
    </View>
  </View>
      </Modal>
    </SafeAreaProvider>   
  );
}

export function MyReviewPage({navigation}) {
  return (
    <NavigationContainer independent = {true}>
    <Stack.Navigator initialRouteName='modal'>
        <Stack.Screen name="modal" options={{headerShown: false}} component={ modalContent } />
        <Stack.Screen name="edit" options={{headerShown: false}} component={ AddReviewPage } />
    </Stack.Navigator>
</NavigationContainer>
    

  );
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flatList:{
    width:'100%',
  },
  item: {
    shadowColor: 'rgba(0,0,0, .4)',
    backgroundColor: '#fff',
    elevation: 8,
    alignItems: 'center',
    flexDirection: 'row',
    margin:6,
    borderRadius:10,
    padding:15
  },
  title: {
    fontSize: 18,
    textAlign:'center',
    paddingBottom:10
  },
  date: {
    fontSize: 10,
    textAlign:'right'
  },
  tinyLogo: {
    width: 50,
    height: 80,
    flex:1
  },
  tinyLogoModal: {
    width: 100,
    height: 130,
    alignSelf:'center',
    borderRadius:10
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:'rgba(0, 0, 0, 0.8)'
  },
  modalView: {
    marginHorizontal: 20,
    marginVertical: 50,
    backgroundColor: "white",
    borderRadius: 20,
    paddingHorizontal: 10,
    alignItems: "center",
  },
  buttonClose: {
    marginVertical:20,
    borderRadius: 10,
  },
  textStyle: {
    color: "#2196F3",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginHorizontal:15,
    marginBottom: 15,
    textAlign:'center',
    borderRadius:10,
    borderWidth:2,
    padding:10,
    fontSize:12
  },
  titleModal: {
    fontSize: 22,
    textAlign:'center',
    marginVertical:15,
    paddingVertical:5,
    backgroundColor:'rgba(0, 0, 0, 0.11)',
  },
});