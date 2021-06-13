import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MyReviewPage } from './my_review_page';
import { NavigationContainer } from '@react-navigation/native';
import { HomePage } from './home_page';
import { ReportPage } from './report_page';
import { PerfilUserPage } from './perfil_user';
import { AddReviewPage } from './add_review_page';

import Icon from 'react-native-vector-icons/AntDesign';

const Tab = createBottomTabNavigator();

const screenOptions = (route, color) => {
    let iconName;
  
    switch (route.name) {
      case 'Home':
        iconName = 'home';
        break;
      case 'MyReview':
        iconName = 'book';
        break;
      case 'AddReview':
        iconName = 'addfile';
        break;
      case 'Report':
        iconName = 'linechart';
        break;
      case 'Perfil':
        iconName = 'user';
        break;
    }
  
    return <Icon name={iconName} color={color} size={24} />;
};  

const TabNavigator = () => {
    return (
      <Tab.Navigator initialRouteName='Home'
        screenOptions={({route}) => ({
          tabBarIcon: ({color}) => screenOptions(route, color),
        })}
        tabBarOptions={{
            showLabel: false,
            activeTintColor: '#21eab3',
            inactiveTintColor: 'gray',
        }}>
        <Tab.Screen name="MyReview" component={MyReviewPage}/>
        <Tab.Screen name="AddReview" component={ AddReviewPage } initialParams={{ viewId: '' }}/>
        <Tab.Screen name="Home" component={ HomePage } />
        <Tab.Screen name="Report" component={ ReportPage } />
        <Tab.Screen name="Perfil" component={ PerfilUserPage } />

      </Tab.Navigator>
    );
  };

export function SwitchPage() {
    return (
      <NavigationContainer independent={true}>
          <TabNavigator />
        </NavigationContainer> 
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  