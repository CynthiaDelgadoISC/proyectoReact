import React from 'react';
import { StyleSheet, Text, View,ScrollView } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Header, Input, Button } from 'react-native-elements';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Rating, AirbnbRating } from 'react-native-ratings';
import Icon from 'react-native-vector-icons/AntDesign'

const addValidationSchema = yup.object().shape({
  description: yup
    .string()
    .required('La descripción es requerida'),
  // rank: yup
  //   .string()
  //   .required('La calificación'),
})

export function AddReviewPage() {
    return (
      <SafeAreaProvider style={styles.container}>
        <Header
        centerComponent={{ text: 'NUEVA RESEÑA', style: { color: '#fff' } }}/>
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
              <Input label='Titulo' disabled labelStyle={{textAlign:'center'}}/>
            </View>
            <Button style={{flex: 1}}
                title="Seleccionar"
                type="outline"
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
          </>
          )}
        </Formik>    

        </ScrollView>
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
      
    }
  });