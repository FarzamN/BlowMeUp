import React, { useEffect, useState } from 'react';
import AuthNavigator from './src/navigation/AuthNavigator';
import { useDispatch, useSelector } from 'react-redux';
import UserNavigator from './src/navigation/UserNavigator';
import ArtistNavigator from './src/navigation/ArtistNavigator';
import SpalshScreen from './src/screens/SpalshScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { USER_DETAILS } from './src/redux/reducer/Holder';
import OneSignal  from 'react-native-onesignal';
import Toast from 'react-native-simple-toast'
import SplashScreen from 'react-native-splash-screen'

const App = () => {
  const userData = useSelector(state => state.userDetails);
  // console.log('user_data ==>', userData)
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);




  const checkStatus = async () => {
    const data = await AsyncStorage.getItem('user_details');
    const userData = JSON.parse(data);
    if (userData != null) {
      dispatch({ type: USER_DETAILS, payload: userData });
    } else {
      Toast.show('Please login');
    }
  };

  useEffect(() => {
    checkStatus();
  }, []);
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 300);
  }, []);

  useEffect(() => {
    // OneSignal.setLogLevel(6, 0);
    OneSignal.setAppId('f926500f-38e2-4fdb-8d87-02df9663b9cf');
    // OneSignal.setAppId('f926500f-38e2-4fdb-8d87-02df9663b9cf');
    OneSignal.promptForPushNotificationsWithUserResponse(response => {
      console.log('Prompt response:', response);
    });

    OneSignal.setNotificationWillShowInForegroundHandler(
      notificationReceivedEvent => {
        let notification = notificationReceivedEvent.getNotification();
        console.log('notification: ', notification);
        OneSignal.add;
        const data = notification.additionalData;
        console.log('additionalData: ', data);
        notificationReceivedEvent.complete(notification);
      },
    );
    console.log('object')
    OneSignal.setNotificationOpenedHandler(notification => { });
    console.log('v')
    OneSignal.addSubscriptionObserver(async event => {
      console.log('evvent', event)
      if (event.to.isSubscribed) {
        const state = await OneSignal.getDeviceState();
        console.log('state.userId ==>c', state.userId);
        await AsyncStorage.setItem('onesignaltoken', state.userId);
        console.log('tokvvccvvven', state.userId);
      }
    });
  }, []);

  setTimeout(() => {
    setLoading(false);
  }, 3000);


  return (
    <>
      {loading ? (
        <SpalshScreen />
      ) : (
        <>
          {userData == null && <AuthNavigator />}
          {userData !== null && userData.role_id == 1 && <UserNavigator />}
          {userData !== null && userData.role_id == 2 && <ArtistNavigator />}
        </>
      )}
    </>
  );
};
export default App;