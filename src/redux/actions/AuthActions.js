import {Platform} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {USER_DETAILS} from '../reducer/Holder';

import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {BaseUrl, token} from '../../utils/url';

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

export const login = data => {
  return async dispatch => {
    try {
      let BaseUrl = `${BaseUrl}Authentication/login.php`;
      let myData = new FormData();

      myData.append('token', token);
      myData.append('email', data.email);
      myData.append('password', data.password);

      const response = await fetch(BaseUrl, {
        body: myData,
        method: 'post',
      });

      const responseData = await response.json();

      if (responseData.status == true) {
        alert('login success');
        // await AsyncStorage.setItem('user_details', responseData.data);
        // await dispatch({type: USER_DETAILS, payload: responseData.data});
      } else {
        alert('not found bro');
      }
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

      console.log('socialObj', socialObj);

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

export const verify_email_before_registration = (
  data,
  setSuccessModal,
  navigation,
  type,
  setIsEmailExist,
  setLoading
) => {
  console.log('data in redux', data);
  return async dispatch => {
    setLoading(true)
    try {
      let base_url = `${BaseUrl}Authentication/verify_email_before_registration.php`;
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
        setLoading(false)
        setSuccessModal(true);
        setTimeout(() => {
          setSuccessModal(false);
          navigation.navigate('OTP', {
            type: 'register',
            data: data,
            OTP: responseData.Code,
          });
        }, 2000);
      } else {
        console.log('else error', responseData.message);
        setIsEmailExist(true);
        setTimeout(() => {
          setIsEmailExist(false);
        }, 2000);
      }
    } catch (error) {
      console.log('verify_email_before_registration catch error -->', error);
    }
  };
};

export const register = (
  data,
  select,
  setIsListener,
  setIsArtist,
  navigation,
  setLoading
) => {
  console.log(
    'data',
    data.email,
    data.phone_number,
    data.password,
    data.name,
    'typeof(select) ==>',
    typeof select,
  );
  setLoading(true)
  return async dispatch => {
    try {
      let base_url = `https://sassolution.org/BlowMeUp/APIs/Authentication/register.php`;
      let myData = new FormData();

      myData.append(
        'token',
        'as23rlkjadsnlkcj23qkjnfsDKJcnzdfb3353ads54vd3favaeveavgbqaerbVEWDSC',
      );
      myData.append('user_name', data.name);
      myData.append('role_id', select);
      myData.append('email', data.email);
      myData.append('phone_number', data.phone_number);
      myData.append('password', data.confirm_password);

      const response = await fetch(base_url, {
        method: 'POST',
        body: myData,
      });

      console.log('response', response);

      const responseData = await response.json();

      console.log('responseData', responseData);
      if (responseData.status == true) {
        if (select == 1) {
          setIsListener(true);
          setTimeout(() => {
            setIsListener(false);
            navigation.navigate('SignIn');
          }, 3000);
        } else {
          setIsArtist(true);
          setTimeout(() => {
            setIsArtist(false);
            navigation.navigate('SignIn');
          }, 3000);
        }
      } else {
        console.log('else error');
        setLoading(false)
      }
    } catch (error) {
      console.log('catch error in register', error);
    }
  };
};

export const verify_email_before_password = async (
  data,
  setSuccessModal,
  navigation,
  setIsEmailExist,
  user_id,
  setUser_id,
  setLoading
) => {
  setLoading(true)
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
    setUser_id('responseData user_id',responseData.user_id)
    if (responseData.status == true) {
      
      console.log('responseData', responseData);
      setLoading(false)
      
      setSuccessModal(true);
      setTimeout(() => {
        setSuccessModal(false);
        navigation.navigate('OTP', {
          type: 'forgot',
          data: data,
          OTP: responseData.Code,
          user_id: responseData.user_id
        });
      }, 2000);
    } else {
      console.log('else error', responseData.message);
      setLoading(false)
      setIsEmailExist(true);
      setTimeout(() => {
        setIsEmailExist(false);
      }, 2000);
    }
  } catch (error) {
    console.log('verify_email_before_password catch error -->', error);
  }
};

export const update_password = async (data, setPasswordChange, navigation,user_id,setLoading) => {
  console.log('user_id', user_id)
  console.log('data', data)
  setLoading(true)
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
    console.log('response', response)
    const responseData = await response.json();
    console.log('responseData', responseData);
    
    if (responseData.status == true) {
      console.log('new_password', data.password);
      setLoading(false)
      setPasswordChange(true);
      setTimeout(() => {
        setPasswordChange(false);
        navigation.navigate('SignIn');
      }, 2000);
    }
    else{
      console.log('error');
      setLoading(false)
    }
  } catch (error) {
    console.log('update_password error -->', error);
  }
};
