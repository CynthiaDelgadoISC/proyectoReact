import React, { Component } from 'react';
// import Icon from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/AntDesign'
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from 'react-native';
import { Input } from 'react-native-elements';

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
  name: yup
    .string()
    .required('El nombre es requerido'),
  lastName: yup
    .string()
    .required('El apellido es requerido'),
})

export class SubscribePage extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>Subscribe</Text>
        <View style={{  }}>
          <LinearGradient
            // Button Linear Gradient
            colors={['#21d8b2', '#24ceb5', '#25eab4']}
            start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 0.0 }}
            style={styles.containerImgUser}>
            <View style={styles.buttonContainerImg}>

            </View>
          </LinearGradient>
        </View>
        <View style={styles.loginContainer}>
          <Formik
          validationSchema={loginValidationSchema}
            initialValues={{ email: '', password: '' }}
            onSubmit={values => console.log(values)}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, isValid, touched }) => (
              <>
                <Input
                leftIcon={
                  <Icon
                      name='user'
                      size={24}
                      color='black'
                    />
                  }
                  name="email"
                  placeholder="Email Address"
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
                      name='unlock'
                      size={24}
                      color='black'
                    />
                  }

                  name="password"
                  placeholder="Password"
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
                      name='user'
                      size={24}
                      color='black'
                    />
                  }              
                  name="email"
                  placeholder="Email Address"
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
                      name='user'
                      size={24}
                      color='black'
                    />
                  }              
                  name="email"
                  placeholder="Email Address"
                  style={styles.textInput}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  keyboardType="email-address"
                />
                {(errors.email && touched.email) &&
                  <Text style={{ fontSize: 10, color: 'red' }}>{errors.email}</Text>
                }
                <LinearGradient 
                colors={['#21d8b2', '#24ceb5', '#25eab4']}
                start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 0.0 }} 
                style={styles.containerButtonCreate}>
                  <TouchableOpacity onPress={handleSubmit} >
                    <Text>
                      Crear Cuenta
                    </Text>
                  </TouchableOpacity>

            </LinearGradient>
            <TouchableOpacity
            onPress={()=>this.props.navigation.navigate('Login')}
             style={styles.containerButtonAlready}>
              <Text>
                Tengo una cuenta
              </Text>
            </TouchableOpacity>
              </>
            )}
            
          </Formik>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    color: "#fcfcfc",
  },
  buttonContainerImg: {
    borderRadius: 100,
    backgroundColor: "#ffffff",
    width: 180, height: 180,
    elevation: 10,
    borderColor: "transparent"
  },
  containerImgUser: {
    height: 200,
    width: 200,
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
    marginTop:10,
    width: '80%',
    height: '10%',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: "transparent",
  },
  loginContainer: {
    flex:1,
    width: '80%',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    // elevation: 10,
    // backgroundColor: '#e6e6e6'
  },
  textInput: {
    height: 40,
    color: "#fcfcfc",
    width: '100%',
    margin: 10,
    backgroundColor: 'white',
    borderColor: 'gray',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
  },
  errorText: {
    fontSize: 10,
    color: 'red',
  },
});