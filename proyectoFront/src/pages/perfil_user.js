import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Modal, Pressable, FlatList, TouchableOpacity, Image } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Header, Input, Button, SearchBar } from 'react-native-elements';
import UserDto from '../models/usuario_model';
import userImage from './../../assets/User_Icon.png'
import Icon from 'react-native-vector-icons/AntDesign'
import { Formik } from 'formik';
import * as yup from 'yup';
const userImageURI = Image.resolveAssetSource(userImage).uri
import { LinearGradient } from 'expo-linear-gradient'
import Global from '../configuration/global';
import { HelloManager } from '../manager/hello_manager';
import { StackActions } from '@react-navigation/native';
import { withNavigation } from 'react-navigation';

const perfilValidationScheme = yup.object().shape({
  firstName: yup
    .string()
    .required('El nombre es requerido'),
  lastName: yup
    .string()
    .required('El apellido es requerido'),
})

export function PerfilUserPage({ route, navigation }) {
  useEffect(() => {
    // console.log('Entraaaaaaaaaaa', route.params)
  }, []);

  // const { viewId } = route.params;
  const [imageURI, setImageURI] = useState(userImageURI);
  const [firstName, setFirstName] = useState(userImageURI);
  const [lastName, setLastName] = useState(userImageURI);

  const dto = Global.user;

  return (
    <SafeAreaProvider >
      <Header
        centerComponent={{ text: 'PERFIL', style: { color: '#fff' } }} />
      <View style={styles.container}>
      <LinearGradient
        // Button Linear Gradient
        colors={['#A3F4D8', '#70F0C4', '#0CCE8B', '#37F497']}
        start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 0.0 }}
        style={styles.containerImgUser}>
        <Image
          style={styles.buttonImg}
          source={{ uri: imageURI }}
        />
      </LinearGradient>
        <View style={styles.containerRow}>
          {/* Comienza formulario  */}
          <Formik
            validationSchema={perfilValidationScheme}
            initialValues={{ firstName: dto.nombre, lastName: dto.apellido }}
            onSubmit={
              async (values) => {
                console.log(values)
                dto.nombre = values.firstName;
                dto.apellido = values.lastName;

                let newUser = await new HelloManager().editUser(dto);
                console.log('newUser', newUser);
                Global.user = dto;
              }
            }
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, isValid, touched }) => (
              <>
                <View >
                  <Text style={ [styles.txtDtos, {marginBottom:20}]}>
                      Correo:{'\n'}
                      {dto.correo}
                  </Text>
                  <Input
                    leftIcon={
                      <Icon
                        name='user'
                        size={24}
                        color='black'
                      />
                    }
                    name="firstName"
                    placeholder="Nombre"
                    style={styles.containerColumn, styles.txtDtos}
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
                        name='user'
                        size={24}
                        color='black'
                      />
                    }

                    name="lastName"
                    placeholder="Password"
                    style={{textAlign:'center',fontSize:15}}
                    onChangeText={handleChange('lastName')}
                    onBlur={handleBlur('lastName')}
                    value={values.lastName}
                  />
                  {(errors.lastName && touched.lastName) &&
                    <Text style={{ fontSize: 10, color: 'red' }}>{errors.lastName}</Text>
                  }
                  
                <Button containerStyle={styles.button}
                  title="Actualizar"
                  type="outline"
                  theme={{colors: {primary: '#32cd32'}}}
                  onPress={handleSubmit}
                />
                <Button containerStyle={styles.button}
                  title="Cerrar Sesión"
                  type="outline"
                  theme={{colors: {primary: 'grey'}}}
                  onPress={()=>{
                    Global.user = new UserDto();
                    navigation.navigate('Home');
                  }}
                />
                <Button containerStyle={styles.button}
                  title="Eliminar Cuenta"
                  type="outline"
                  theme={{colors: {primary: 'red'}}}
                  onPress={async ()=>{
                    const response = await fetch(`${Global.serverURL}/api/users/ById`, {
                        method: 'DELETE',
                        headers: {
                          'Content-type': 'application/json',
                          'Accept': 'application/json',
                        },
                        body: dto.encode()
                    });
                    Global.user = new UserDto();
                    navigation.navigate('Home');
                  }}
                />
                </View>

              </>
            )}

          </Formik>
          {/* Termina formulario */}
        </View>
      </View>

    </SafeAreaProvider>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    width:'100%',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  buttonImg: {
    borderRadius: 100,
    backgroundColor: "#ffffff",
    width: 90, height: 90,
    borderColor: "transparent"
  },
  containerImgUser: {
    height: 110,
    width: 110,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    elevation: 15,
    marginVertical: 25
  },
  containerRow: {
    flex: 1,
    // flexDirection: 'row',
    // flexGrow: 1,
  },
  txtDtos: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign:'center'
  },
  button:{
    marginVertical:2
  }
});