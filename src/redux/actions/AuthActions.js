import {Platform} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {USER_DETAILS} from '../reducer/Holder';

export const sign_in = (email, password) => {
  return async dispatch => {
    try {
      // let myJson = {
      //     email: email,
      //     password: password
      // }
      await AsyncStorage.setItem('user_details', email);
      await dispatch({type: USER_DETAILS, payload: email});
      console.log('Success Laraib!');
    } catch (error) {
      console.log('error', error);
    }
  };
};
