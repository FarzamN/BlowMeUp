import {Platform} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {OTP, REGISTER, ROLE_ID, USER_DETAILS} from '../reducer/Holder';

import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {BaseUrl, token} from '../../utils/url';

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

export const login = (
  data,
  setSuccessModal,
  setErrorModal,
  setErrorMessage,
  setSuccessMessage,
  setLoading,
) => {
  return async dispatch => {
    setLoading(true);
    try {
      let base_url = `${BaseUrl}login`;
      let myData = new FormData();

      // myData.append('token', token);
      myData.append('email', data.email);
      myData.append('password', data.password);

      const response = await fetch(base_url, {
        body: myData,
        method: 'POST',
        headers: 'bearer' 
      });

      console.log('response of login ki api', response);

      const responseData = await response.json();
      console.log('responseData', responseData.success.data);
      if (responseData.success.status === 200) {
        dispatch({type: USER_DETAILS, payload: responseData.success.data});
        dispatch({type: ROLE_ID, payload: responseData.success.data.role_id});
        await AsyncStorage.setItem(
          'user_details',
          JSON.stringify(responseData.data),
        );
        setSuccessMessage(responseData.success.message);
        setLoading(false);
        setSuccessModal(true);
        setTimeout(() => {
          setSuccessModal(false);
        }, 2000);
      } else {
        setErrorMessage(responseData.success.message);
        setLoading(false);
        setErrorModal(true);
        setTimeout(() => {
          setErrorModal(false);
        }, 2000);
      }
    } catch (error) {
      console.log('error', error);
      setLoading(false);
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
        dispatch({type: ROLE_ID, payload: responseData.success.data.role});
        await AsyncStorage.setItem(
          'user_details',
          JSON.stringify(responseData.data),
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
  saveimage,
  setIsEmailExist,
  setLoading,
) => {
  if (type == 'signup') {
    setLoading(true);
  }
  return async dispatch => {
    try {
      let base_url = `${BaseUrl}verify_email_before_registration`;
      // let base_url = `${BaseUrl}register`;
      let myData = new FormData();

      myData.append('token', token);
      myData.append('email', data.email);

      const response = await fetch(base_url, {
        body: myData,
        method: 'post',
      });

      const responseData = await response.json();

      if (responseData.status == true) {
        console.log('responseData', responseData);
        await dispatch({type: OTP, payload: responseData.success.Code});

        if (type == 'signup') {
          setLoading(false);
          setSuccessModal(true);
          setTimeout(() => {
            setSuccessModal(false);
            navigation.navigate('OTP', {
              type: type,
              data: data,
              saveimage: saveimage,
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
  navigation,
  setLoading,
  saveimage,
  socialData,
) => {
  // console.log('socialData', socialData)
  console.log('data ==>', data);

  setLoading(true);
  return async dispatch => {
    try {
      let base_url = `${BaseUrl}register`;
      let myData = new FormData();

      // myData.append(
      //   'token',
      //   'as23rlkjadsnlkcj23qkjnfsDKJcnzdfb3353ads54vd3favaeveavgbqaerbVEWDSC',
      // );
      myData.append('name', data?.name ? data?.name : socialData?.user_name);
      myData.append('role_id', select);
      myData.append('email', data.email);
      myData.append('phone_number', data?.phone_number);
      myData.append('password', data?.confirm_password);
      myData.append('image', saveimage);

      {
        socialData?.uID && myData.append('social_id', socialData?.uID);
      }

      const response = await fetch(base_url, {
        method: 'POST',
        body: myData,
      });
      console.log('response', response);

      const responseData = await response.json();
      console.log('responseData', responseData);

      if (responseData.success.data.status === 200) {
        REGISTER({type: register, payload: responseData.success.data});

        setLoading(false);
        if (select == 1) {
          setIsListener(true);
          setTimeout(() => {
            setIsListener(false);
          }, 3000);
          await AsyncStorage.setItem(
            'user_details',
            JSON.stringify(responseData.success.Data),
          );
          dispatch({type: USER_DETAILS, payload: responseData.success.Data});
          dispatch({type: ROLE_ID, payload: responseData.success.Data.role});
        } else {
          setIsArtist(true);
          setTimeout(() => {
            setIsArtist(false);
          }, 3000);
          await AsyncStorage.setItem(
            'user_details',
            JSON.stringify(responseData.success.Data),
          );
          dispatch({type: USER_DETAILS, payload: responseData.success.Data});
          dispatch({type: ROLE_ID, payload: responseData.success.Data.role});
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
      let base_url = `${BaseUrl}Authentication/verify_email_before_password.php`;
      let myData = new FormData();

      myData.append('token', token);
      myData.append('email', data.email);

      const response = await fetch(base_url, {
        body: myData,
        method: 'post',
      });

      const responseData = await response.json();
      if (responseData.status == true) {
        console.log('responseData', responseData);
        await dispatch({type: OTP, payload: responseData.Code});

        if (type == 'forgot') {
          setLoading(false);
          setSuccessModal(true);
          setTimeout(() => {
            setSuccessModal(false);
            navigation.navigate('OTP', {
              type: type,
              data: data,
              // OTP: responseData.Code,
              user_id: responseData.user_id,
            });
          }, 2000);
        } else {
          setSuccessModal(10);
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
  console.log('user_id', user_id);
  console.log('data', data);
  setLoading(true);
  try {
    let base_url = `${BaseUrl}Authentication/update_password.php`;
    let myData = new FormData();

    myData.append('token', token);
    myData.append('new_password', data.password);
    myData.append('user_id', user_id);

    const response = await fetch(base_url, {
      method: 'post',
      body: myData,
    });
    console.log('response', response);
    const responseData = await response.json();
    console.log('responseData', responseData);

    if (responseData.status == true) {
      
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
  }
};
