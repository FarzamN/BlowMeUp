import AsyncStorage from '@react-native-async-storage/async-storage';
import {BaseUrl} from '../../utils/url';
import {ROLE_ID, USER_DETAILS} from '../reducer/Holder';

export const Edit_profile = (
  data,
  saveImage,
  setActiveLoading,
) => {
  return async dispatch => {
    setActiveLoading(true);
    const Data = await AsyncStorage.getItem('user_details')
    const userDetails = JSON.parse(Data)
    console.log('userDetails', userDetails)
    try {
      let base_url = `${BaseUrl}edit-profile/${userDetails.id}`;

      let myData = new FormData();

      myData.append('email', data.email);
      myData.append('phone_number', data.phone_number);
      myData.append('name', data.name);
      myData.append('image', saveImage);

      const response = await fetch(base_url, {
        body: myData,
        method: 'POST',
        headers: 'bearer'
      });

      const responseData = await response.json();
      if (responseData.success.status === 200) {
        setActiveLoading(false);
        console.log('responseData', responseData);
        dispatch({type: USER_DETAILS, payload: responseData.success.data});
        dispatch({type: ROLE_ID, payload: responseData.data.role});
        await AsyncStorage.setItem(
          'user_details',
          JSON.stringify(responseData.success.data),
        );
      } else {
        console.log('else error');
        setActiveLoading(true);
      }
    } catch (error) {
      console.log('catch error in edit profile', error);
      setActiveLoading(true);
    }
  };
};

export const Update = async (
  data,
  setPasswordChange,
  navigation,
  setLoading,
) => {
  setLoading(true);
  const Data = await AsyncStorage.getItem('user_details');
  const userData = JSON.parse(Data);
  try {
    // let base_url = `${BaseUrl}change-password/${userData.id}`;
    let base_url = `https://sassolution.org/BlowMeUp/api/change-password/${userData.id}`;
    let myData = new FormData();

    myData.append('old_password', data.password);
    myData.append('password', data.confirm_password);

    const response = await fetch(base_url, {
      method: 'post',
      body: myData,
    });
    console.log('response', response);
    const responseData = await response.json();
    if (responseData.success.status === 200) {
      setLoading(false);
      setPasswordChange(true);
      setTimeout(() => {
        setPasswordChange(false);
        navigation.goBack();
      }, 2000);
    } else {
      console.log('error');
      setLoading(false);
    }
  } catch (error) {
    console.log('error', error);
    setLoading(false);
  }
};

export const create_Video = async (
  data,
  type,
  saveVideo,
  saveImage,
  setSelect,
  setDone,
) => {
  // const Data = await AsyncStorage.getItem('user_details');
  // const userData = JSON.parse(Data);
  // console.log('userData', userData)
  try {
    const data = 1
    // let base_url = `${BaseUrl}create-video/${userData.id}`;
    let base_url = `${BaseUrl}create-video/${data}`;
    let myData = new FormData();

    myData.append('video_title', data.title);
    myData.append('description', data.description);
    myData.append('video_type', type);
    myData.append('video', saveVideo);
    myData.append('image', saveImage);

    const response = await fetch(base_url, {
      method: 'POST',
      body: myData,
    });
    const responseData = await response.json();

    if (responseData.success.status === 200) {
      console.log('responseData', responseData);
      // setSelect(2);
      // setDone(true);
      // setTimeout(() => {
      //   setDone(false);
      // }, 2000);
    } else {
      console.log('else error in create_Video');
    }
  } catch (error) {
    console.log('catch error in create_Video', error);
  }
}; 

export const show_own_video = async setVideoData => {
  const Data = await AsyncStorage.getItem('user_details');
  const userData = JSON.parse(Data);
  const data = 1
  try {
    // let base_url = `${BaseUrl}show-video-user/${userData.id}`;
    let base_url = `${BaseUrl}show-video-user/${data}`;

    const response = await fetch(base_url, {
      method: 'GET',
    });
    const responseData = await response.json();
    console.log('responseData of show Video ==>', responseData.success.data);
    if (responseData.success.status === 200) {
      setVideoData(responseData.success.data);
    } else {
      console.log('else error in show_video');
    }
  } catch (error) {
    console.log('catch error in show_video', error);
  }
};

export const show_all_video = async setVideoData => {
  try {
    let base_url = `${BaseUrl}videos`;

    const response = await fetch(base_url, {
      method: 'GET',
    });
    const responseData = await response.json();
    console.log('responseData of show Video ==>', responseData.success.data);
    if (responseData.success.status === 200) {
      setVideoData(responseData.success.data);
    } else {
      console.log('else error in show_video');
    }
  } catch (error) {
    console.log('catch error in show_all_video', error);
  }
};
