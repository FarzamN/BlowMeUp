import {Platform} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {USER_DETAILS} from '../reducer/Holder';


import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

export const sign_in = (email, password) => {
  return async dispatch => {
    try {
      await AsyncStorage.setItem('user_details', email);
      await dispatch({type: USER_DETAILS, payload: email});
      console.log('Login Success fully!');
    } catch (error) {
      console.log('error', error);
    }
  };
};
export const googleSignin = navigation => {
  return async dispatch => {
    try {
      GoogleSignin.configure({
        webClientId:
          Platform.OS == 'android'
            ? '786806587743-2u950vhs3ced12v490vefc87qvnuloh6.apps.googleusercontent.com'
            : '1027704725204-8ra8ndftf0ovqh7jn4fik17gv4cm2ghr.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)

        offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
        forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
      });
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      const socialObj = {
        email: userInfo.user.email ? userInfo.user.email : '',
        firstName: userInfo.user.givenName,
        lastName: userInfo.user.familyName,
        picUrl: userInfo.user.photo,
        uID: userInfo.user.id,
      };

      console.log('socialObj', socialObj)

      // dispatch(social_signin(socialObj, navigation));
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('You cancelled the sign in.');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Google sign In operation is in process');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Play Services not available');
      } else {
        console.log(
          'Something unknown went wrong with Google sign in. ' + error.message,
        );
      }
    }
  };
};