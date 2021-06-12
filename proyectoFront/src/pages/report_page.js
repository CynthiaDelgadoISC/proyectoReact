import React from 'react';
import { StyleSheet, Text, View, Dimensions, ToastAndroid } from 'react-native';
import { VictoryBar, VictoryChart, VictoryTheme } from "victory-native";
import io from "socket.io-client";
import * as MediaLibrary from 'expo-media-library';
import * as Print from 'expo-print';
import Global from '../configuration/global';
import DropDownPicker from 'react-native-dropdown-picker';

export class ReportPage extends React.Component{


  htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Pdf Content</title>
        <style>
            body {
                font-size: 16px;
                color: rgb(255, 196, 0);
            }
            h1 {
                text-align: center;
            }
        </style>
    </head>
    <body>
        <h1>Hola profe!</h1>
    </body>
    </html>
`;

  constructor(props){
    super(props);
    this.state = {
      data : [
        { quarter: 1, earnings: 13000 },
        { quarter: 2, earnings: 16500 },
        { quarter: 3, earnings: 14250 },
        { quarter: 4, earnings: 19000 }
      ],
      items:[
        {label: 'Apple', value: 'apple'},
        {label: 'Banana', value: 'banana'}
      ],
      value: '',
      open: false
   };
   this.getContenidos();
   this.setValue = this.setValue.bind(this);
   //this.createAndSavePDF(this.htmlContent);
   
  }

 getContenidos = () =>{
  fetch(`${Global.serverURL}/api/resenas/contenidos/ByUsuario?id=${Global.user.idUsuario}`, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      'Accept': 'application/json',
    },
  })
  .then((res)=> res.json())
  .then((data) => {
    let itemsAux = [];
    for(let item in data){
      itemsAux.push({label: data[item]._titulo, value: data[item]._id});
    }
    this.setState({items : itemsAux});
  });
}

  setOpen = (open) => {
    this.setState({
      open
    });
  }

  setValue = (callback) => {
    this.setState(state => ({
      value: callback(state.value)
    }));
  }

  setItems = (callback) => {
    this.setState(state => ({
      items: callback(state.items)
    }));
  }


  createAndSavePDF = async (html) => {
    try {
      const { uri } = await Print.printToFileAsync({ html });
      if (Platform.OS === "ios") {
        await Sharing.shareAsync(uri);
      } else {
        const permission = await MediaLibrary.requestPermissionsAsync();
        if (permission.granted) {
          let asset = await MediaLibrary.createAssetAsync(uri);
          if(asset != null){
            ToastAndroid.showWithGravity(
              "Reporte guardado",
              ToastAndroid.SHORT,
              ToastAndroid.CENTER
            );
          }else{
            ToastAndroid.showWithGravity(
              "Error",
              ToastAndroid.SHORT,
              ToastAndroid.CENTER
            );
          }
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
  componentDidMount() {
    try{
      console.log("MONTADO");
      this.socket = io("http://192.168.0.245:3000",{jsonp: false});
      
    this.socket.on("chartData", (msg) => {
           this.setState({ data :  msg });
    });
    }catch(e){
      console.log(e);
    }

 }

  render(){
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
    });

    const { open, value, items } = this.state;
    return (

      <View style={styles.container}>
    <View style={styles.container}>
      <DropDownPicker
         open={open}
         value={value}
         items={items}
         setOpen={this.setOpen}
         setValue={this.setValue}
         setItems={this.setItems}
      />
      </View>
        <VictoryChart 
          width={Dimensions.get('window').width}
          theme={VictoryTheme.material}
          animate={{duration: 500}}>
          <VictoryBar data={this.state.data} x="quarter" y="earnings" />
        </VictoryChart>
      
      </View>
    );
    
  }
}
  
