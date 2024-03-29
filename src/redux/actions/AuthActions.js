import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { OTP, REGISTER, TOKEN, USER_DETAILS } from '../reducer/Holder';
import Toast from 'react-native-simple-toast';

import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { BaseUrl } from '../../utils/url';

export const login = (data, setErrorModal, setLoading, OS) => {
  return async dispatch => {
    setLoading(true);
    const Data = await AsyncStorage.getItem('onesignaltoken');
    try {
      let base_url = `${BaseUrl}login`;
      let myData = new FormData();

      myData.append('email', data.email);
      myData.append('password', data.password);
      myData.append('device', OS);
      myData.append('device_token', Data);
      const response = await fetch(base_url, {
        body: myData,
        method: 'POST',
        headers: 'bearer',
      });

      const responseData = await response.json();
      if (responseData?.success?.status == 200) {
        setLoading(false);
        await AsyncStorage.setItem(
          'user_details',
          JSON.stringify(responseData.success.data),
        );

        await AsyncStorage.setItem(
          'token',
          JSON.stringify(responseData.success.token),
        );
        Toast.show('successfully login');
        dispatch({ type: USER_DETAILS, payload: responseData.success.data });
        dispatch({ type: TOKEN, payload: responseData.success.token });
      } else {
        Toast.show('something went wrong');
        setLoading(false);
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

export const googleSignin = (navigation, OS, setLoad) => {
  return async dispatch => {
    try {
      GoogleSignin.configure({
        webClientId:
          Platform.OS == 'android'
            ? '786806587743-sqmrhl9rjq5s9u5chjlg6tdref287rpg.apps.googleusercontent.com'
            // : '786806587743-v10rinnvpec2t8qdbkbr8hq71b8n93ns.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
            : '786806587743-2u950vhs3ced12v490vefc87qvnuloh6.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
            // : '786806587743-2u950vhs3ced12v490vefc87qvnuloh6.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)

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

      dispatch(social_signin(socialObj, navigation, OS, setLoad));
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('You cancelled the sign in.');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Google sign In operation is in process');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Play Services not available');
      } else {
        console.log(
          'Something unknown went wrong with Google sign in. ' + error,
        );
      }
    }
  };
};
const social_signin = (data, navigation, OS, load) => {
  load(true);

  return async dispatch => {
    try {
      let base_url = `${BaseUrl}social-id`;
      let myData = new FormData();

      const device_token = await AsyncStorage.getItem('onesignaltoken');

      myData.append('social_id', data.uID);
      myData.append('device', OS);
      myData.append('device_token', device_token);

      console.log('device_token ==>', device_token, 'data.uID ==>', data.uID);
      const TokenData = await AsyncStorage.getItem('token');
      const Token = JSON.parse(TokenData);

      var myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${Token}`);
      const response = await fetch(base_url, {
        body: myData,
        method: 'POST',
        headers: myHeaders,
      });

      const responseData = await response.json();
      if (responseData?.success?.status == 200) {
        await AsyncStorage.setItem(
          'user_details',
          JSON.stringify(responseData.success.data),
        );
        await AsyncStorage.setItem(
          'token',
          JSON.stringify(responseData.success.token),
        );
        Toast.show('successfully login');
        load(false);
        dispatch({ type: USER_DETAILS, payload: responseData.success.data });
        dispatch({ type: TOKEN, payload: responseData.success.token });
      } else {
        navigation.navigate('SignUp', {
          social: 'social',
          socialData: data,
        });
        load(false);
      }
    } catch (error) {
      console.log('social_SignIn catch error', error);
      load(false);
    }
  };
};

export const verify_email_before_registration = (
  data,
  type,
  navigation,
  saveImage,
  setIsEmailExist,
  setLoading,
  OS,
) => {
  if (type == 'signup') {
    setLoading(true);
  }
  return async dispatch => {
    const Data = await AsyncStorage.getItem('onesignaltoken');
    try {
      let base_url = `${BaseUrl}verify_email_before_register`;
      let myData = new FormData();

      myData.append('email', data.email);
      myData.append('phone_number', data.phone_number);
      myData.append('password', data.confirm_password);
      myData.append('name', data.name);
      myData.append('image', saveImage);
      myData.append('device', OS);
      myData.append('device_token', Data);

      const response = await fetch(base_url, {
        body: myData,
        method: 'POST',
      });

      const responseData = await response.json();
      if (responseData?.success?.status == 200) {
        await dispatch({ type: OTP, payload: responseData.success.OTP });
        if (type == 'signup') {
          setLoading(false);
          navigation.navigate('OTP', {
            type: type,
            data: data,
            saveImage: saveImage,
          });
        }
      } else if (responseData.error == 'phone_number') {
        console.log('phoen number ki machudai hay');
        Toast.show('check your phone number');
      } else {
        console.log('first', responseData.message);
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
      Toast.show('change your phone number or email');
      setLoading(false);
    }
  };
};
export const verify_email_before_password = (
  data,
  type,
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
      if (responseData?.success?.status == 200) {
        await dispatch({ type: OTP, payload: responseData.success.OTP });

        if (type == 'forgot') {
          setLoading(false);

          navigation.navigate('OTP', {
            type: type,
            data: data,
            user_id: responseData.success.id,
          });
        }
      } else {
        Toast.show('something went wrong');
        if (type == 'forgot') {
          setLoading(false);
        }
      }
    } catch (error) {
      console.log('verify_email_before_password catch error -->', error);
      setLoading(false);
      setIsEmailExist(true);
      setTimeout(() => {
        setIsEmailExist(false);
      }, 2000);
    }
  };
};

export const register = (
  data,
  select,
  setIsArtist,
  setIsListener,
  setLoading,
  saveImage,
  socialData,
  OS,
) => {
  setLoading(true);
  return async dispatch => {
    const Data = await AsyncStorage.getItem('onesignaltoken');
    let base_url = `${BaseUrl}register`;
    let myData = new FormData();
    myData.append('name', data?.name ? data?.name : socialData?.user_name);
    myData.append('role_id', select);
    myData.append('email', data.email);
    myData.append('phone_number', data?.phone_number);
    myData.append('password', data?.confirm_password);
    myData.append('image', saveImage);
    myData.append('device', OS);
    myData.append('device_token', Data);
    {
      socialData?.uID && myData.append('social_id', socialData?.uID);
    }

    try {
      const response = await fetch(base_url, {
        method: 'POST',
        body: myData,
      });

      const responseData = await response.json();
      console.log(
        'responseData ===============>',
        responseData?.error?.phone_number,
      );
      if (responseData?.success?.status == 200) {

        setLoading(false);
        if (select == 1) {
          setIsListener(true);
          setTimeout(() => {
            setIsListener(false);
            dispatch({ type: USER_DETAILS, payload: responseData?.success?.data });
          }, 1500);


        } else {
          setIsArtist(true);
          setTimeout(() => {
            setIsArtist(false);
            dispatch({ type: USER_DETAILS, payload: responseData?.success?.data });
          }, 1500);
        }

        dispatch({ type: REGISTER, payload: responseData?.success?.data });
        dispatch({ type: TOKEN, payload: responseData.success.token });
        console.log('==============================================================')
        console.log('responseData?.success?.data', responseData?.success?.data)
        console.log('responseData.success.token', responseData.success.token)
        await AsyncStorage.setItem(
          'token',
          JSON.stringify(responseData.success.token),
        );
        await AsyncStorage.setItem(
          'user_details',
          JSON.stringify(responseData?.success?.data),
        );
      } else {
        console.log(responseData?.error?.message);
        setLoading(false);
      }
    } catch (error) {
      console.log('catch error in register', error);

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

    if (responseData?.success?.status == 200) {
      setLoading(false);
      setPasswordChange(true);
      setTimeout(() => {
        setPasswordChange(false);
        navigation.navigate('SignIn');
      }, 2000);
    } else {
      Toast.show('something went wrong');
      setLoading(false);
    }
  } catch (error) {
    console.log('update_password error -->', error);
    setLoading(false);
  }
};

export const Delete_Account = () => {
  return async dispatch => {
    const Data = await AsyncStorage.getItem('user_details');
    const userDetails = JSON.parse(Data);

    let base_url = `${BaseUrl}account-delete/${userDetails.id}`;
    try {
      const Data = await AsyncStorage.getItem('token');
      const Token = JSON.parse(Data);

      var myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${Token}`);

      const response = await fetch(base_url, {
        method: 'POST',
        // body: myData,
        headers: myHeaders,
      });

      const responseData = await response.json();
      if (responseData?.success?.status == 200) {
        await AsyncStorage.removeItem('user_details');
        dispatch({ type: USER_DETAILS, payload: null });
        Toast.show('Account is Successfully deleted');
      } else {
        Toast.show('something went wrong');
      }
    } catch (error) {
      console.log('catch error in Delete_Account', error);
    }
  };
};

export const Logout = load => {
  return async dispatch => {
    try {
      load(true);
      const Data = await AsyncStorage.getItem('user_details');
      const userDetails = JSON.parse(Data);

      let base_url = `${BaseUrl}logout-user/${userDetails.id}`;

      const response = await fetch(base_url, {
        method: 'post',
      });
      const responseData = await response.json();
      if (responseData?.success?.status === 200) {
        await AsyncStorage.removeItem('user_details');
        dispatch({ type: USER_DETAILS, payload: null });
        load(false);
        Toast.show('Successfully Logout');
      } else {
        Toast.show('something went wrong');
        load(false);
      }
    } catch (error) {
      console.log('error', error);
    }
  };
};
