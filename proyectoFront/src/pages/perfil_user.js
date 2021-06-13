import React,{ useState, useEffect  } from 'react';
import { StyleSheet, Text, View,ScrollView,Modal,Pressable, FlatList, TouchableOpacity,Image } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Header, Input, Button, SearchBar } from 'react-native-elements';
import UserDto from '../models/usuario_model';
import userImage from './../../assets/User_Icon.png'
const userImageURI = Image.resolveAssetSource(userImage).uri
import  {LinearGradient} from 'expo-linear-gradient'


export function PerfilUserPage({route, navigation}) {
  useEffect(() => {
    // console.log('Entraaaaaaaaaaa', route.params)
  }, []);

  // const { viewId } = route.params;
  const [imageURI, setImageURI] = useState(userImageURI);

  const dto = new UserDto("", "Alberto","Lopez","","tuNegritoRompeCulitos@gmail.com", "tuJefa",userImageURI);

    return (
      <SafeAreaProvider style={styles.container}>
        <Header
        centerComponent={{ text: 'PERFIL', style: { color: '#fff' } }}/>
         <LinearGradient
          // Button Linear Gradient
          colors={['#A3F4D8', '#70F0C4', '#0CCE8B', '#37F497']}
          start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 0.0 }}
          style={styles.containerImgUser}>
            <Image
              style={styles.buttonImg}
              source={{uri: imageURI}}
            />
        </LinearGradient>
        <View style={styles.containerDtos}>
          <View style={styles.containerRow}>
            <Text style={styles.containerColumn, styles.txtDtos}>
              Nombre:{'\n'}
              {dto.nombre+' '+dto.apellido}
            </Text>
            <Text style={styles.containerColumn, styles.txtDtos}>
              Correo:{'\n'}
              {dto.correo}
            </Text>
          </View>

        </View>
        <Button
          title="Holiwis"
        />
      </SafeAreaProvider>
    );
  }


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      // alignItems: 'center',
      // justifyContent: 'center',
      flexDirection: 'column'
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
      marginVertical: 25
    },
    containerDtos: {
      flex: 1,
      flexDirection: 'row',
    },
    containerRow: {
      flex: 1,
      flexDirection: 'row',
      flexGrow: 1,
    },
    containerColumn: {
      flex: 1,
      flexDirection: 'column',
    },
    txtDtos: {
      fontSize: 20,
      fontWeight: 'bold',
      flexGrow: 1,
      flexShrink: 1,
      marginHorizontal: 15
    }
  });