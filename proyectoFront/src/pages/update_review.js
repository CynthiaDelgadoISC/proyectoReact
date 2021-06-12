import React,{ useState, useEffect  } from 'react';
import { StyleSheet, Text, View,ScrollView,Modal,Pressable, FlatList, TouchableOpacity,Image } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Header, Input, Button, SearchBar } from 'react-native-elements';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Rating, AirbnbRating } from 'react-native-ratings';
import {Alert} from 'react-native-alert-dialogues';

const addValidationSchema = yup.object().shape({
  description: yup
    .string()
    .required('La descripción es requerida'),
  // rank: yup
  //   .string()
  //   .required('La calificación'),
})

const DATA = [
  {
    id: "r1",
    title: "Cazadores de sombras",
    categoria:'pelicula',
  },
  {
    id: "r2",
    title: "Second Item",
    categoria:'pelicula',
  },
  {
    id: "r3",
    title: "Third Item",
    categoria:'pelicula',
  },
  {
    id: "r4",
    title: "Third Item",
    categoria:'pelicula',
  },
  {
    id: "r5",
    title: "Third Item",
    categoria:'pelicula',
  },
  {
    id: "r6",
    title: "Third Item",
    categoria:'pelicula',
  },
];

export function UpdateReviewPage({route, navigation}) {
  useEffect(() => {
    console.log('Entraaaaaaaaaaa', route.params)
    // itemId=route.params.id;
    // if (itemId!=undefined){
    //   console.log('perfectooooo')
    // }
  }, []);

  const { viewId } = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [titleContenido, setTitleContenido] = useState('');
  const [search , setSearch] = useState('');
  const [filtData , setData] = useState(DATA);

  const updateSearch = (search) => {
    setSearch(search);
    let filteredData = DATA.filter( (item) => {
      return item.title.toLowerCase().match(`^.*(${search.toLowerCase()}).*\$`);
    });
    setData(filteredData);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item}
      onPress={() => {
        setTitleContenido(item.title)
        setModalVisible(false)
      }}
      >
      <Image 
        style={styles.tinyLogo}
        source={{ uri: 'https://reactnative.dev/img/tiny_logo.png',}}
      />
      <View style={{flex:4}}>
        <Text style={styles.titleModal}>{item.title}</Text>
        <Text style={styles.clasModal}>{item.categoria}</Text>
      </View>

    </TouchableOpacity>
  );
    return (
      <SafeAreaProvider style={styles.container}>
        <Header
        centerComponent={{ text: 'NUEVA RESEÑA', style: { color: '#fff' } }}/>
        <Text>{viewId} </Text>
        <ScrollView style={{flex:1, width:'100%'}}>
        <Formik
            validationSchema={addValidationSchema}
            initialValues={{ description: ''}}
            onSubmit={values => console.log(values)}
        >
           {({ handleChange, handleBlur, handleSubmit, values, errors, isValid, touched }) => (
              <>
          <View style={styles.titleView}>
            <View style={{flex: 1}}>
              <Input label={'Titulo'} disabled labelStyle={{textAlign:'center'}} value={titleContenido} />
            </View>
            <Button style={{flex: 1}}
                title="Seleccionar"
                type="outline"
                onPress={() => {
                  setModalVisible(true)
                }}
            />
          </View>
          <Input inputContainerStyle={{borderBottomWidth:0}} style={styles.description}
          multiline = {true}
          numberOfLines = {5}
          label='Descipción'
          />
          <AirbnbRating
            count={5}
            reviews={["¡Muy Malo!", "¡Malo!", "¡Regular!", "¡Bueno!", "¡Muy Bueno!"]}
            defaultRating={1}
            size={30}
            reviewSize={15}
          />
          <View style={{flex:1, flexDirection:'row', justifyContent:'center'}}>
            <Button containerStyle={[{ width: '70%', marginVertical:40 }]}
                  title="Guardar"
                  type="outline"
                  theme={{colors: {primary: '#32cd32'}}}
                  onPress={()=> setAlertVisible(true) }
              />
          </View>
          </>
          )}
        </Formik>    

        </ScrollView>

       {/* Alert */}
       <Alert
          visible={alertVisible}
          type= "success"
          okPressed={() =>{
            setAlertVisible(false)
            navigation.goBack();
          }
          }
          title= "Reseña Guardada!!!"
          message=''
        /> 
        
      {/* Modal Contenido */}
      <Modal 
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView} >
            <Text> CONTENIDO </Text>
            <View style={{width:'100%'}}>
              <SearchBar style={styles.searchStyle}
                placeholder="Buscar"
                onChangeText={updateSearch}
                value={search}
                inputStyle={styles.inputStyle}
                containerStyle={styles.searchContainerStyle}
                placeholder={'Buscar'}
                inputContainerStyle={styles.inputContainerStyle}
              />
            </View>
            <FlatList style={styles.flatList}
              data={filtData}
              renderItem={renderItem}
              keyExtractor={item => item.id}
            />

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
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    description:{
      borderRadius:6,
      borderColor: 'grey',
      borderWidth: 1,
      padding: 5
    },
    titleView:{
      flex: 1, 
      flexDirection:'row', 
      alignItems:'center',
      paddingHorizontal:20,
      paddingTop:40,
    },
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",

    },
    modalView: {
      width:'80%',
      marginHorizontal: 20,
      marginVertical: 100,
      borderRadius: 20,
      borderColor: "black",
      borderWidth: 2,
      padding: 4.0,
      backgroundColor: 'white',
      paddingHorizontal: 10,
      alignItems: "center",
    },
    item: {
      shadowColor: 'rgba(0,0,0, .4)',
      backgroundColor: '#fff',
      elevation: 8,
      alignItems: 'center',
      flexDirection: 'row',
      margin:1,
      borderRadius:10,
      padding:10
    },
    tinyLogo: {
      width: 50,
      height: 60,
      flex:1
    },
    flatList:{
      width:'100%',
    },
    titleModal: {
      fontSize: 15,
      textAlign:'center',

    },
    clasModal: {
      fontSize: 12,
      textAlign:'center',
      color:'gray'
    },
    inputStyle:{backgroundColor: 'white'},
    searchContainerStyle: {backgroundColor: 'white', borderWidth: 1, borderRadius: 5, padding:0},
    inputContainerStyle : {backgroundColor: 'white'},
  });