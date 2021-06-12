import React, { Component } from 'react';
// import Icon from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/AntDesign'
import { StyleSheet, Text, View, Image, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { Input } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import  {LinearGradient} from 'expo-linear-gradient'
import { Formik } from 'formik';
import * as yup from 'yup';

import userImage from './../../assets/User_Icon.png'
const userImageURI = Image.resolveAssetSource(userImage).uri



const CreateValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Ingresa un correo valido")
    .required('El correo es requerido'),
  password: yup
    .string()
    .min(8, ({ min }) => `La contraseña debe tener al menos ${min} caracteres`)
    .required('La contraseña es requerida'),
  password2: yup.string()
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
  firstName: yup
    .string()
    .required('El nombre es requerido'),
  lastName: yup
    .string()
    .required('El apellido es requerido'),
  photo: yup
    .string()
})

export class SubscribePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userImage: {
        imageURI: userImageURI,
        image: null
      }

    }
  }
  
  render() {
    return (
      <SafeAreaView style={styles.containerSafe}>
        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-between' }}>

          <View style={styles.container}>
            <Formik
              validationSchema={CreateValidationSchema}
              initialValues={{ email: '', password: '', password2: '', firstName: '', lastName: ''}}
              onSubmit={async (values) => { const response = await this.fnCreateUser(values); console.log(response);console.log(this.state.userImage)}}
            >
              {({ handleChange, handleBlur, handleSubmit, values, errors, isValid, touched }) => (
                <>
                  <View style={{}}>
                    <LinearGradient
                      // Button Linear Gradient
                      colors={['#A3F4D8', '#70F0C4', '#0CCE8B', '#37F497']}
                      start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 0.0 }}
                      style={styles.containerImgUser}>
                      <TouchableOpacity
                        style={styles.buttonContainerImg}
                        onPress={() => {
                          this.pick();
  
                        }}
                      >
                        <Image
                          style={styles.buttonImg}
                          source={{uri: this.state.userImage.imageURI}}
                        />
                      </TouchableOpacity>
                    </LinearGradient>
                  </View>
                  <View style={styles.loginContainer}>

                    <Input
                      leftIcon={
                        <Icon
                          style={styles.icon}
                          name='user'
                          size={24}
                        />
                      }
                      name="email"
                      placeholder="Email"
                      style={styles.textInput}
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                      value={values.email}
                      keyboardType="email-address"
                    />
                    {(errors.email && touched.email) &&
                      <Text style={{ fontSize: 10, color: 'red' }}>{errors.email}</Text>
                    }

                    <Input
                      leftIcon={
                        <Icon
                          style={styles.icon}
                          name='unlock'
                          size={24}
                        />
                      }

                      name="password"
                      placeholder="Contraseña"
                      style={styles.textInput}
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      value={values.password}
                      secureTextEntry
                    />
                    {(errors.password && touched.password) &&
                      <Text style={{ fontSize: 10, color: 'red' }}>{errors.password}</Text>
                    }
                    <Input
                      leftIcon={
                        <Icon
                          style={styles.icon}
                          name='unlock'
                          size={24}
                        />
                      }

                      name="password2"
                      placeholder="Confirmar"
                      style={styles.textInput}
                      onChangeText={handleChange('password2')}
                      onBlur={handleBlur('password2')}
                      value={values.password2}
                      secureTextEntry
                    />
                    {(errors.password2 && touched.password2) &&
                      <Text style={{ fontSize: 10, color: 'red' }}>{errors.password2}</Text>
                    }
                    <Input
                      leftIcon={
                        <Icon
                          style={styles.icon}
                          name='user'
                          size={24}
                        />
                      }
                      name="firstName"
                      placeholder="Nombre"
                      style={styles.textInput}
                      onChangeText={handleChange('firstName')}
                      onBlur={handleBlur('firstName')}
                      value={values.firstName}
                    />
                    {(errors.firstName && touched.firstName) &&
                      <Text style={{ fontSize: 10, color: 'red' }}>{errors.firstName}</Text>
                    }
                    <Input
                      leftIcon={
                        <Icon
                          style={styles.icon}
                          name='user'
                          size={24}
                        />
                      }
                      name="lastName"
                      placeholder="Apellido"
                      style={styles.textInput}
                      onChangeText={handleChange('lastName')}
                      onBlur={handleBlur('lastName')}
                      value={values.lastName}
                    />
                    {(errors.lastName && touched.lastName) &&
                      <Text style={{ fontSize: 10, color: 'red' }}>{errors.lastName}</Text>
                    }
                    <LinearGradient
                      colors={['#A3F4D8', '#70F0C4', '#0CCE8B', '#37F497']}
                      start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 0.0 }}
                      style={styles.containerButtonCreate}>
                      <TouchableOpacity onPress={handleSubmit} >
                        <Text style={styles.textButton}>
                          Crear Cuenta
                        </Text>
                      </TouchableOpacity>

                    </LinearGradient>
                    <TouchableOpacity
                      onPress={() => this.props.navigation.navigate('Login')}
                      style={styles.containerButtonAlready}>
                      <Text>
                        Tengo una cuenta
                    </Text>
                    </TouchableOpacity>

                  </View>
                </>
              )}

            </Formik>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  fnCreateUser(values){
    return new Promise(resolve => {
      console.log(values);

      setTimeout(() => {
        resolve(true);
      }, 2000);
    })
  }
  async permisionFunction  (){
    // here is how you can get the camera permission

    const imagePermission = await ImagePicker.getMediaLibraryPermissionsAsync();
    console.log(imagePermission.status);

    setGalleryPermission(imagePermission.status === 'granted');

    if (imagePermission.status !== 'granted') {
      alert('Permission for media access needed.');
    }
  }
  async pick(){
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      
    });

    console.log(result.uri);
    if (!result.cancelled) {
      // setImageUri(result.uri);
      this.setState({userImage: {imageURI: result.uri, image: result}});
    }
  }
}

const styles = StyleSheet.create({
  containerSafe: {
    flex: 1,
    flexDirection: 'column'

  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
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
  containerImgUser: {
    height: 150,
    width: 150,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    elevation: 15,
  },
  containerButtonCreate: {
    width: '80%',
    height: '10%',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 11,
    },
    shadowOpacity: 0.55,
    shadowRadius: 14.78,

    elevation: 10,
    borderColor: "#000",
    // borderWidth: 2
  },
  containerButtonAlready: {
    marginTop: 10,
    width: '80%',
    height: '10%',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: "black",
  },
  loginContainer: {
    flex: 1,
    width: '80%',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
  },
  textInput: {
    height: 40,
    color: "#A3A5A5",
    width: '100%',
    margin: 10,
    backgroundColor: 'white',
    // borderColor: 'gray',
    // borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
  },
  errorText: {
    fontSize: 10,
    color: 'red',
  },
  icon: {
    color: "#A3A5A5",
  },
  textButton: {
    color: "#4B5252",
    fontWeight: 'bold'
  }
});
