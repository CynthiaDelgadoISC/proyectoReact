import React, { Component } from 'react';
// import Icon from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/AntDesign'
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from 'react-native';
import { Input } from 'react-native-elements';

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

