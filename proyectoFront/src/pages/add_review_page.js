import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Modal, Pressable, FlatList, TouchableOpacity, Image } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Header, Input, Button, SearchBar } from 'react-native-elements';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Rating, AirbnbRating } from 'react-native-ratings';
import { Alert } from 'react-native-alert-dialogues';
import Global from '../configuration/global';
import Icon from 'react-native-vector-icons/AntDesign';
import DropDownPicker from 'react-native-dropdown-picker';
import * as ImagePicker from 'expo-image-picker';
import imageSelect from './../../assets/selecImage.png'
const imageSelectUri = Image.resolveAssetSource(imageSelect).uri;
import ContentDto from '../models/content_model';
import UserDto from '../models/usuario_model';
import ReviewDto from '../models/reseña_model';
import { HelloManager } from '../manager/hello_manager';

const addValidationSchema = yup.object().shape({
  description: yup
    .string()
    .required('La descripción es requerida'),
  // rank: yup
  //   .string()
  //   .required('La calificación'),
});

const categoriaValidationScheme = yup.object().shape({
  titulo: yup
    .string()
    .required('El titulo es requerido'),
})



export function AddReviewPage({ route, navigation }) {
  
  const [initValues, setInitData] = useState({
    description: '',
    rating: 0,
    titleContenido: '',
  });
  const [idContenido, setIdContenido] = useState('');


  const getinitialData = async () => {
    console.log("entrando aqui");
    rawData = await fetch(`${Global.serverURL}/api/resenas/ById?id=${route.params.viewId}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json',
      },
    });
    let data = await rawData.json();
    let formattedData = {
      description: data[0]._descripcion,
      titleContenido: data[0]._contenido[0]._titulo,
    };
    console.log('formattedData',formattedData);
    return formattedData;
  }

  useEffect(() => {
    if (route.params != '') {
      
      fetch(`${Global.serverURL}/api/resenas/ById?id=${route.params.viewId}`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          'Accept': 'application/json',
        },
      })
        .then((res) => res.json())
        .then(async (data) => {
          setIdContenido( data[0]._contenido[0]._id)
          let initValuesAux = {
            description: data[0]._descripcion,
            rating: data[0]._calificacion,
            titleContenido: data[0]._contenido[0]._titulo,
          };
          await setInitData(initValuesAux);
          
          
        });
        getContenidos();
    }
  }, []);

  const { viewId } = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [modalFormVisible, setModalFormVisible] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [titleContenido, setTitleContenido] = useState('');
  const [rating, setRating] = useState(0);
  const [search, setSearch] = useState('');
  const [filtData, setData] = useState(DATA);
  const [DATA, setInData] = useState(DATA);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const [items, setItems] = useState([
    { label: 'Libro', value: 'Libro' },
    { label: 'Película', value: 'Pelicula' },
    { label: 'Serie', value: 'Serie' },
    { label: 'Anime', value: 'Anime' }
  ]);
  const [image, setImage] = useState({
    image: null,
    imageURI: imageSelectUri
  });


  const updateSearch = (search) => {
    setSearch(search);
    let filteredData = DATA.filter((item) => {
      return item.title.toLowerCase().match(`^.*(${search.toLowerCase()}).*\$`);
    });
    setData(filteredData);
  };
  

  const getContenidos = () => {
  try{
    fetch(`${Global.serverURL}/api/contenidos`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json',
      },
    })
    .then((res) => res.json())
    .then((data) => {
      setInData(data);
      setData(data);
    });
  }catch(e){
    console.log(e);
  }
  }
  

  const formModal = () => {
   
    return (
      // Modal Form
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalFormVisible}
        onRequestClose={() => {
          setModalFormVisible(!modalFormVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView} >
            <Text style={{marginVertical:20}}> Formulario Modal </Text>
            <Formik
              validationSchema={categoriaValidationScheme}
              initialValues={{ titulo: '' }}
              onSubmit={
                async (values) => {
                  const x = await saveCategoria({titulo: values.titulo, nombre: value, image: image});
                  setModalFormVisible(false);
                }
              }
            >
              {({ handleChange, handleBlur, handleSubmit, values, errors, isValid, touched }) => (
                <>
                    <TouchableOpacity
                      style={styles.buttonContainerImg}
                      onPress={() => {
                        pick();
                      }}
                    >
                      <Image
                        style={styles.buttonImg}
                        source={{ uri: image.imageURI }}
                      />
                    </TouchableOpacity>
                    <Input
                      name="titulo"
                      placeholder="Titulo"
                      style={styles.txtDtos}
                      onChangeText={handleChange('titulo')}
                      onBlur={handleBlur('titulo')}
                      value={values.titulo}
                    />
                    {(errors.titulo && touched.titulo) &&
                      <Text style={{ fontSize: 10, color: 'red' }}>{errors.firstName}</Text>
                    }
                    <DropDownPicker
                      open={open}
                      value={value}
                      items={items}
                      setOpen={setOpen}
                      setValue={setValue}
                      setItems={setItems}
                      style={{ marginVertical: 15 }}
                    />

                    <Button type="submit" title='Guardar' onPress={handleSubmit}/>


                </>
              )}

            </Formik>
                    <Pressable
                      style={[styles.buttonClose,{marginVertical:30}]}
                      onPress={() => setModalFormVisible(!modalFormVisible)}
                    >
                      <Text style={styles.textStyle}>Cerrar</Text>
                    </Pressable>
          </View>
        </View>
      </Modal>
    );
  }

  const contentModal = () => {
    
    return(
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
            <Icon.Button name={'pluscircleo'} color={'gray'} backgroundColor="transparent" size={32} style={{ paddingVertical: 10, paddingHorizontal: 5 }}
              onPress={() => {
                setModalVisible(false);
                setModalFormVisible(true)
              }}
            />
            <View style={{ width: '100%' }}>
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
              keyExtractor={item => item._id}
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
    );
  }

  const permisionFunction = async () => {
    // here is how you can get the camera permission

    const imagePermission = await ImagePicker.getMediaLibraryPermissionsAsync();

    setGalleryPermission(imagePermission.status === 'granted');

    if (imagePermission.status !== 'granted') {
      alert('Permission for media access needed.');
    }
  }
  const pick = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,

    });
    if (!result.cancelled) {
      // setImageUri(result.uri);
      setImage({ image: result, imageURI: result.uri });
    }
  }
  const saveCategoria = async(values) => {

    let dto = new ContentDto(
      values.titulo,
      '',
      values.nombre,
      ''
    );

    dto = await new HelloManager().saveContent(dto);
    
    if(dto != null){
      DATA.push({
        '_categoria': dto.categoria,
        '_id': dto.idContenido,
        '_titulo': dto.titulo,
        '_url': dto.url
      });
      setData(DATA);
      setInData(DATA);
      <Alert
      visible={alertVisible}
      type= "success"
      okPressed={() =>{
        setAlertVisible(false)
        setModalVisible(false)
      }
      }
      title= "Nuevo contenido creado"
      message=''/> 
      return dto;
    }
  }
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item}
      onPress={() => {
        setTitleContenido(item._titulo)
        setIdContenido(item._id)
        setModalVisible(false)
      }}
    >
      <Image
        style={styles.tinyLogo}
        source={{ uri: 'https://reactnative.dev/img/tiny_logo.png', }}
      />
      <View style={{ flex: 4 }}>
        <Text style={styles.titleModal}>{item._titulo}</Text>
        <Text style={styles.clasModal}>{item._categoria}</Text>
      </View>

    </TouchableOpacity>
  );
  return (
    <SafeAreaProvider style={styles.container}>
      <Header
        centerComponent={{ text: 'NUEVA RESEÑA', style: { color: '#fff' } }} />
      <ScrollView style={{ flex: 1, width: '100%' }}>
        <Formik
          validationSchema={addValidationSchema}
          initialValues={{description: initValues.description, titleContenido: initValues.titleContenido}}
          enableReinitialize = {true}
          onSubmit={async values => {
            console.log(values);
            if(route.params.viewId == ''){
              const response = await saveReview({
                description: values.description,
                rating: rating,
                idContenido: idContenido,
              });
              if (response) {
                setAlertVisible(true);
              }
            }else{
              let dto = new ReviewDto(
                route.params.viewId,
                new UserDto(),
                new ContentDto(),
                Global.user.idUsuario,
                idContenido,
                values.description,
                '',
                rating
              );

              const response = await fetch(`${Global.serverURL}/api/resenas/ById`, {
                method: 'PUT',
                headers: {
                  'Content-type': 'application/json',
                  'Accept': 'application/json',
                },
                body: dto.encode()
              });
              
              navigation.goBack();

            }
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, isValid, touched }) => (
            <>
              <View style={styles.titleView}>
                <View style={{ flex: 1 }}>
                  <Input 
                   label={'Titulo'}
                   name="titleContenido"
                   disabled labelStyle={{ textAlign: 'center' }}
                   value={route.params.viewId == ''?titleContenido :values.titleContenido}
                   placeholder="Titulo"
                  />
                </View>
                <Button style={{ flex: 1 }}
                  title="Seleccionar"
                  disabled = {route.params.viewId == ''?false:true}
                  type="outline"
                  onPress={() => {
                    setModalVisible(true)
                  }}
                />
              </View>
              <Input inputContainerStyle={{ borderBottomWidth: 0 }} style={styles.description}
                multiline={true}
                numberOfLines={5}
                label='Descipción'
                name = "description"
                placeholder="Descipción"
                onChangeText={handleChange('description')}
                onBlur={handleBlur('description')}
                value={values.description}
              />
              <AirbnbRating
                count={5}
                reviews={["¡Muy Malo!", "¡Malo!", "¡Regular!", "¡Bueno!", "¡Muy Bueno!"]}
                defaultRating={initValues.rating}
                size={30}
                reviewSize={15}
                onFinishRating={(number) => { setRating(number) }}
              />
              <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
                <Button containerStyle={[{ width: '70%', marginVertical: 40 }]}
                  title="Guardar"
                  type="outline"
                  theme={{ colors: { primary: '#32cd32' } }}
                  onPress={handleSubmit}
                />
              </View>
            </>
          )}
        </Formik>

      </ScrollView>

      {/* Alert */}
      <Alert
        visible={alertVisible}
        type="success"
        okPressed={() => {
          setAlertVisible(false)
          navigation.goBack();
        }
        }
        title="Reseña Guardada!!!"
        message=''
      />

      {/* Modal Contenido */}
      {formModal()}
      {contentModal()}

    </SafeAreaProvider>
  );
}

const saveReview = async (values) => {
  console.log("FDFSD")
  return new Promise(async resolve => {
    

    console.log("HOLAAAA ENTRAAA");
    let dto = new ReviewDto(
      '',
      new UserDto(),
      new ContentDto(),
      Global.user.idUsuario,
      values.idContenido,
      values.description,
      '',
      values.rating
    );
    
    console.log("Casi SALEEE",dto)
    dto = await new HelloManager().saveReview(dto);
    console.log("SALEEE",dto)
    if(dto != null){
      resolve(true);
    }
  })
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  description: {
    borderRadius: 6,
    borderColor: 'grey',
    borderWidth: 1,
    padding: 5
  },
  titleView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    flexDirection: 'column',
    width: '80%',
    height: '75%',
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
    margin: 1,
    borderRadius: 10,
    padding: 10
  },
  tinyLogo: {
    width: 50,
    height: 60,
    flex: 1
  },
  flatList: {
    width: '100%',
  },
  titleModal: {
    fontSize: 15,
    textAlign: 'center',

  },
  clasModal: {
    fontSize: 12,
    textAlign: 'center',
    color: 'gray'
  },
  inputStyle: { backgroundColor: 'white' },
  searchContainerStyle: { backgroundColor: 'white', borderWidth: 1, borderRadius: 5, padding: 0 },
  inputContainerStyle: { backgroundColor: 'white' },
  containerImg: {
    height: 150,
    width: 150,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    elevation: 15,
  },
  buttonContainerImg: {
    borderRadius: 100,
    backgroundColor: "#ffffff",
    width: 130, height: 130,
    elevation: 15,
    borderColor: "transparent"
  },
  buttonImg: {
    borderRadius: 100,
    backgroundColor: "#ffffff",
    width: 130, height: 130,
    borderColor: "transparent"
  },
});