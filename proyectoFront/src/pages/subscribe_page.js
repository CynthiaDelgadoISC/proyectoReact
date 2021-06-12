import React, { Component } from 'react';
// import Icon from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/AntDesign'
import { StyleSheet, Text, View, StatusBar, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { Input } from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
import { LinearGradient } from 'expo-linear-gradient';

import { Formik } from 'formik';
import * as yup from 'yup';
const loginValidationSchema = yup.object().shape({
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
  name: yup
    .string()
    .required('El nombre es requerido'),
  lastName: yup
    .string()
    .required('El apellido es requerido'),
    photo: yup
    .string()
    .required('El apellido es requerido'),
})

export class SubscribePage extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <SafeAreaView style={styles.containerSafe}>
        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-between' }}>

          <View style={styles.container}>
            <Formik
              validationSchema={loginValidationSchema}
              initialValues={{ email: '', password: '', name: '', lastname: '', }}
              onSubmit={ values => {
                console.log(values);
              }}
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
                          ImagePicker.showImagePicker(
                            { title: 'Select Photo' }, (response) => {
                              if (response.uri) setFieldValue('photo', response)
                              setFieldTouched('photo', true)
                            })
                        }}
                      >
                      </TouchableOpacity>
                    </LinearGradient>
                    {values.photo &&
                      <Text>{`...${values.photo.fileName.substr(values.photo.fileName.length - 10)}`}</Text>
                    }

                    {(errors.photo && touched.photo) &&
                      <Text style={{ color: 'red' }}>{errors.photo}</Text>
                    }
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
                      name="name"
                      placeholder="Nombre"
                      style={styles.textInput}
                      onChangeText={handleChange('name')}
                      onBlur={handleBlur('name')}
                      value={values.email}
                    />
                    {(errors.name && touched.name) &&
                      <Text style={{ fontSize: 10, color: 'red' }}>{errors.name}</Text>
                    }
                    <Input
                      leftIcon={
                        <Icon
                          style={styles.icon}
                          name='user'
                          size={24}
                        />
                      }
                      name="lastname"
                      placeholder="Apellido"
                      style={styles.textInput}
                      onChangeText={handleChange('lastname')}
                      onBlur={handleBlur('lastname')}
                      value={values.lastname}
                    />
                    {(errors.lastname && touched.lastname) &&
                      <Text style={{ fontSize: 10, color: 'red' }}>{errors.lastname}</Text>
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
    elevation: 10,
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
