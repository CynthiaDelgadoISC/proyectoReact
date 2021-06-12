import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack' ;
import { LoginPage } from './src/pages/login_page';
import { SwitchPage } from './src/pages/switch_page';
import { SubscribePage } from './src/pages/subscribe_page';

const Stack=createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
                <Stack.Navigator initialRouteName='Login'>
                    <Stack.Screen name="Switch" options={{headerShown: false}} component={ SwitchPage } />
                    <Stack.Screen name="Login" options={{headerShown: false}} component={ LoginPage } />
                    {/* <Stack.Screen name="Subscribe" component={ SubscribePage } /> */}
                </Stack.Navigator>
    </NavigationContainer>
  );
}
