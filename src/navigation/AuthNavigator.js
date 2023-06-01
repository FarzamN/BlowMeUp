import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';

import Spalsh from '../screens/authentication/Splash';
import SignIn from '../screens/authentication/SignIn.js';
import SignUp from '../screens/authentication/SignUp.js';
import FindAccount from '../screens/authentication/FindAccount.js';
import OTP from '../screens/authentication/OTP.js';
import Reset from '../screens/authentication/Reset.js';

// import UserNavigator from './UserNavigator';
const AuthNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="Spalsh">
        <Stack.Screen name="Spalsh" component={Spalsh} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="FindAccount" component={FindAccount} />
        <Stack.Screen name="OTP" component={OTP} />
        <Stack.Screen name="Reset" component={Reset} />
        {/* <Stack.Screen name="UserNavigator" component={UserNavigator} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AuthNavigator;
