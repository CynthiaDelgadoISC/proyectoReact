import React, { useState } from 'react';
import { render } from 'react-dom';
import {StyleSheet, Text, View, FlatList, TouchableOpacity, Modal, Pressable, Image,ScrollView } from 'react-native';
import { Rating, AirbnbRating } from 'react-native-ratings';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SearchBar, Header, withTheme } from 'react-native-elements';


export function HomePage(){

  const DATA = [
    {
      id: "r1",
      title: "Cazadores de sombras",
      cal:1,
      fecha:'20/02/21',
      descripcion:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
    },
    {
      id: "r2",
      title: "Second Item",
      cal:2,
      fecha:'20/02/21',
      descripcion:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
    },
    {
      id: "r3",
      title: "Third Item",
      cal:3,
      fecha:'20/02/21',
      descripcion:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
    },
    {
      id: "r4",
      title: "Third Item",
      cal:3,
      fecha:'20/02/21',
      descripcion:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
    },
    {
      id: "r5",
      title: "Third Item",
      cal:3,
      fecha:'20/02/21',
      descripcion:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
    },
    {
      id: "r6",
      title: "Third Item",
      cal:3,
      fecha:'20/02/21',
      descripcion:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
    },
    {
      id: "r7",
      title: "Third Item",
      cal:3,
      fecha:'20/02/21',
      descripcion:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
    },
    {
      id: "r8",
      title: "Third Item",
      cal:3,
      fecha:'20/02/21',
      descripcion:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
    },
    {
      id: "r9",
      title: "Third Item",
      cal:3,
      fecha:'20/02/21',
      descripcion:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
    },
    {
      id: "r10",
      title: "Third Item",
      cal:3,
      fecha:'20/02/21',
      descripcion:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
    },
  ];
  
  const [search , setSearch] = useState('');

  const [filtData , setData] = useState(DATA);
  

  const updateSearch = (search) => {
    setSearch(search);
    let filteredData = DATA.filter( (item) => {
      return item.title.toLowerCase().match(search);
    });
    setData(filteredData);

  };

  

    
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedReview, setSelectedReview] = useState({});





    const styles = StyleSheet.create({
      inputStyle:{backgroundColor: 'white'},
      searchContainerStyle: {backgroundColor: 'white', borderWidth: 1, borderRadius: 5},
      inputContainerStyle : {backgroundColor: 'white'},
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
          <Text style={styles.date}>{item.fecha}</Text>
          <Text style={styles.title}>{item.title}</Text>
          <Rating
              ratingCount={5}
              readonly={true}
              startingValue={item.cal}
              imageSize={20}
              ratingColor='#3498db'
              ratingBackgroundColor='#c8c7c8'
            />
        </View>
  
      </TouchableOpacity>
    );
    return (

      
      <SafeAreaProvider>
      <Header centerComponent={{ text: 'Principal', style: { color: '#fff' } }}/>
      <SearchBar style={styles.searchStyle}
        placeholder="Buscar"
        onChangeText={updateSearch}
        value={search}
        inputStyle={styles.inputStyle}
        containerStyle={styles.searchContainerStyle}
        placeholder={'Buscar'}
        inputContainerStyle={styles.inputContainerStyle}
      />

      <FlatList style={styles.flatList}
        data={filtData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
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
          <ScrollView style={{marginVertical:10}} >
            <Text style={{textAlign:'right', paddingVertical:10}}>{selectedReview.fecha} </Text>
            <Image 
              style={styles.tinyLogoModal}
              source={{ uri: 'https://reactnative.dev/img/tiny_logo.png',}}
            />
            <Text style={styles.titleModal}>{selectedReview.title}</Text>
            <Text style={styles.modalText}>{selectedReview.descripcion}</Text>
            <Rating
            ratingCount={5}
            readonly={true}
            startingValue={selectedReview.cal}
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

  