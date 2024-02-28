import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';

import Spalsh from '../screens/authentication/Splash';
import SignIn from '../screens/authentication/SignIn';
import SignUp from '../screens/authentication/SignUp';
import FindAccount from '../screens/authentication/FindAccount';
import OTP from '../screens/authentication/OTP';
import Reset from '../screens/authentication/Reset';
import TermsAndConditions from '../screens/common/SettingFolder/TermsAndConditions';
import AccountType from '../screens/authentication/AccountType';

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
        <Stack.Screen name="AccountType" component={AccountType} />
        <Stack.Screen name="TermsAndConditions" component={TermsAndConditions} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AuthNavigator;
