import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SearchPage } from './search_page';
import { NavigationContainer } from '@react-navigation/native';
import { HomePage } from './home_page';
import Icon from 'react-native-vector-icons/AntDesign';

const Tab = createBottomTabNavigator();

const screenOptions = (route, color) => {
    let iconName;
  
    switch (route.name) {
      case 'Home':
        iconName = 'home';
        break;
      case 'Search':
        iconName = 'search1';
        break;
    }
  
    return <Icon name={iconName} color={color} size={24} />;
};  

const TabNavigator = () => {
    return (
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({color}) => screenOptions(route, color),
        })}
        tabBarOptions={{
            activeTintColor: '#21eab3',
            inactiveTintColor: 'gray',
        }}>
        <Tab.Screen name="Search" component={SearchPage}/>
        <Tab.Screen name="Home" component={ HomePage } />
      </Tab.Navigator>
    );
  };

export function SwitchPage() {
    return (
      <NavigationContainer>
          <TabNavigator />
{/*            <Tab.Navigator>
              <Tab.Screen name="search" component={SearchPage}/>
              <Tab.Screen name="home" component={ HomePage } />
          </Tab.Navigator>  */}
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
  