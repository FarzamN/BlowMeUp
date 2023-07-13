import {Platform} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {OTP, REGISTER, TOKEN, USER_DETAILS} from '../reducer/Holder';

import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {BaseUrl} from '../../utils/url';

// export const sign_in = (email, password) => {
//   return async dispatch => {
//     try {
//       await AsyncStorage.setItem('user_details', email);
//       await dispatch({type: USER_DETAILS, payload: email});
//       console.log('Login Success fully!');
//     } catch (error) {
//       console.log('error', error);
//     }
//   };
// };

export const login = (data, setSuccessModal, setErrorModal, setLoading) => {
  return async dispatch => {
    setLoading(true);
    try {
      let base_url = `${BaseUrl}login`;
      let myData = new FormData();

      myData.append('email', data.email);
      myData.append('password', data.password);
      const response = await fetch(base_url, {
        body: myData,
        method: 'POST',
        headers: 'bearer',
      });

      const responseData = await response.json();
      if (responseData.success.status === 200) {
        setLoading(false);
        setSuccessModal(true);

        await AsyncStorage.setItem(
          'user_details',
          JSON.stringify(responseData.success.data),
        );
        
        await AsyncStorage.setItem(
          'token',
          JSON.stringify(responseData.success.token),
        );
        
        setTimeout(() => {
          setSuccessModal(false);
          
          dispatch({type: USER_DETAILS, payload: responseData.success.data});
          dispatch({type: TOKEN, payload: responseData.success.token});

        }, 1500);
      } else {
        console.log('else error login api');
      }
    } catch (error) {
      console.log('catch error login ', error);
      setLoading(false);
      setErrorModal(true);
      setTimeout(() => {
        setErrorModal(false);
      }, 2000);
    }
  };
};

export const googleSignin = navigation => {
  return async dispatch => {
    try {
      GoogleSignin.configure({
        webClientId:
          Platform.OS == 'android'
            ? '786806587743-sqmrhl9rjq5s9u5chjlg6tdref287rpg.apps.googleusercontent.com'
            : '786806587743-2u950vhs3ced12v490vefc87qvnuloh6.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)

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
        user_name: userInfo.user.name,
      };

      dispatch(social_signin(socialObj, navigation));
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
const social_signin = (data, navigation) => {
  return async dispatch => {
    try {
      let base_url = `${BaseUrl}/social_login`;
      let myData = new FormData();

      // myData.append('token', token);
      myData.append('social_id', data.uID);

      const response = await fetch(base_url, {
        body: myData,
        method: 'post',
      });

      console.log('response', response);

      const responseData = await response.json();
      console.log('responseData', responseData);
      if (responseData.status == true) {
        dispatch({type: USER_DETAILS, payload: responseData.success.data});
        await AsyncStorage.setItem(
          'user_details',
          JSON.stringify(responseData.success.data),
        );
      } else {
        navigation.navigate('SignUp', {
          social: 'social',
          socialData: data,
        });
      }
    } catch (error) {
      console.log('error', error);
    }
  };
};

export const verify_email_before_registration = (
  data,
  type,
  setSuccessModal,
  navigation,
  saveImage,
  setIsEmailExist,
  setLoading,
) => {
  console.log('saveImage', saveImage);
  if (type == 'signup') {
    setLoading(true);
  }
  return async dispatch => {
    try {
      let base_url = `${BaseUrl}verify_email_before_register`;
      let myData = new FormData();

      myData.append('email', data.email);
      myData.append('phone_number', data.phone_number);
      myData.append('password', data.confirm_password);
      myData.append('name', data.name);
      myData.append('image', saveImage);

      const response = await fetch(base_url, {
        body: myData,
        method: 'POST',
      });

      const responseData = await response.json();
      console.log('sign up', responseData);
      if (responseData.success.status === 200) {
        await dispatch({type: OTP, payload: responseData.success.OTP});

        if (type == 'signup') {
          setLoading(false);
          setSuccessModal(true);
          setTimeout(() => {
            setSuccessModal(false);
            navigation.navigate('OTP', {
              type: type,
              data: data,
              saveImage: saveImage,
            });
          }, 2000);
        } else {
          setSuccessModal(10);
        }
      } else {
        console.log('else error', responseData.success.message);
        if (type == 'signup') {
          setLoading(false);
          setIsEmailExist(true);
          setTimeout(() => {
            setIsEmailExist(false);
          }, 2000);
        }
      }
    } catch (error) {
      console.log('verify_email_before_registration catch error -->', error);
      setLoading(false);
    }
  };
};

export const register = (
  data,
  select,
  setIsListener,
  setIsArtist,
  setLoading,
  saveImage,
  socialData,
) => {
  setLoading(true);
  return async dispatch => {
    let base_url = `${BaseUrl}register`;
    let myData = new FormData();
    myData.append('name', data?.name ? data?.name : socialData?.user_name);
    myData.append('role_id', select);
    myData.append('email', data.email);
    myData.append('phone_number', data?.phone_number);
    myData.append('password', data?.confirm_password);
    myData.append('image', saveImage);

    {
      socialData?.uID && myData.append('social_id', socialData?.uID);
    }

    try {
      const response = await fetch(base_url, {
        method: 'POST',
        body: myData,
      });

      const responseData = await response.json();
      if (responseData.success.status === 200) {
        dispatch({type: REGISTER, payload: responseData.success.data});

        setLoading(false);
        if (select == 1) {
          setIsListener(true);
          setTimeout(() => {
            setIsListener(false);
          }, 3000);
          await AsyncStorage.setItem(
            'user_details',
            JSON.stringify(responseData.success.data),
          );
          dispatch({type: USER_DETAILS, payload: responseData.success.data});
        } else {
          setIsArtist(true);
          setTimeout(() => {
            setIsArtist(false);
          }, 3000);
          await AsyncStorage.setItem(
            'user_details',
            JSON.stringify(responseData.success.data),
          );
          dispatch({type: USER_DETAILS, payload: responseData.success.data});
        }
      } else {
        console.log('else error');
        setLoading(false);
      }
    } catch (error) {
      console.log('catch error in register', error);

      setLoading(false);
    }
  };
};

export const verify_email_before_password = (
  data,
  type,
  setSuccessModal,
  navigation,
  setIsEmailExist,
  setLoading,
) => {
  if (type == 'forgot') {
    setLoading(true);
  }
  return async dispatch => {
    try {
      let base_url = `${BaseUrl}verifyemail`;
      let myData = new FormData();

      myData.append('email', data.email);

      const response = await fetch(base_url, {
        body: myData,
        method: 'POST',
      });

      const responseData = await response.json();
      if (responseData.success.status === 200) {
        await dispatch({type: OTP, payload: responseData.success.OTP});

        if (type == 'forgot') {
          setLoading(false);
          setSuccessModal(true);
          setTimeout(() => {
            setSuccessModal(false);
            navigation.navigate('OTP', {
              type: type,
              data: data,
              user_id: responseData.success.id,
            });
          }, 2000);
        } else {
          setSuccessModal(true);
        }
      } else {
        console.log('else error', responseData.success.message);
        if (type == 'forgot') {
          setLoading(false);
          setIsEmailExist(true);
          setTimeout(() => {
            setIsEmailExist(false);
          }, 2000);
        }
      }
    } catch (error) {
      console.log('verify_email_before_password catch error -->', error);
      setLoading(false);
    }
  };
};

export const update_password = async (
  data,
  setPasswordChange,
  navigation,
  user_id,
  setLoading,
) => {
  setLoading(true);

  try {
    let base_url = `${BaseUrl}resetpassword/${user_id}`;
    let myData = new FormData();

    myData.append('password', data.confirm_password);

    const response = await fetch(base_url, {
      method: 'POST',
      body: myData,
    });
    console.log('response', response);
    const responseData = await response.json();
    console.log('responseData', responseData);

    if (responseData.success.status === 200) {
      setLoading(false);
      setPasswordChange(true);
      setTimeout(() => {
        setPasswordChange(false);
        navigation.navigate('SignIn');
      }, 2000);
    } else {
      console.log('error');
      setLoading(false);
    }
  } catch (error) {
    console.log('update_password error -->', error);
    setLoading(false);
  }
};
