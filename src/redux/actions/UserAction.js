import AsyncStorage from '@react-native-async-storage/async-storage';
import {BaseUrl} from '../../utils/url';
import {USER_DETAILS} from '../reducer/Holder';

export const Edit_profile = (
  data,
  saveImage,
  setActiveLoading,
  setEdit,
  setShowInput,
) => {
  return async dispatch => {
    setActiveLoading(true);
    const Data = await AsyncStorage.getItem('user_details');
    const userDetails = JSON.parse(Data);
    console.log('data', data);
    try {
      let base_url = `${BaseUrl}edit-profile/${userDetails.id}`;

      let myData = new FormData();

      myData.append('email', data.email ? data.email : userDetails.email);
      myData.append(
        'phone_number',
        data.phone ? data.phone : userDetails.phone_number,
      );
      myData.append('name', data.name ? data.name : userDetails.name);
      myData.append('image', saveImage ? saveImage : userDetails.image);

      const Data = await AsyncStorage.getItem('token');
      const Token = JSON.parse(Data);

      var myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${Token}`);

      const response = await fetch(base_url, {
        body: myData,
        method: 'POST',
        headers: myHeaders,
      });

      const responseData = await response.json();
      if (responseData.success.status === 200) {
        setActiveLoading(false);
        dispatch({type: USER_DETAILS, payload: responseData.success.data});
        setEdit(false);
        setShowInput(false);
        await AsyncStorage.setItem(
          'user_details',
          JSON.stringify(responseData.success.data),
        );
      } else {
        console.log('else error');
        setActiveLoading(false);
      }
    } catch (error) {
      console.log('catch error in edit profile', error);
      setActiveLoading(false);
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
    let base_url = `${BaseUrl}change-password/${userData.id}`;

    // let base_url = `https://sassolution.org/BlowMeUp/api/change-password/${userData.id}`;
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
  data, type, saveVideo, saveImage, setSelect, setDone, setLoad
) => {
  const Data = await AsyncStorage.getItem('user_details');
  const userData = JSON.parse(Data);
  try {
    setLoad(true)
    let base_url = `https://sassolution.org/BlowMeUp/api/create-video/${userData.id}`;
    let myData = new FormData();

    myData.append('video_title', data.title);
    myData.append('description', data.description);
    myData.append('video_type', type);
    myData.append('video', saveVideo);
    myData.append('img', saveImage);

    const Data = await AsyncStorage.getItem('token');
    const Token = JSON.parse(Data);

    var myHeaders = new Headers();
     myHeaders.append('Authorization', `Bearer ${Token}`);

     const response = await fetch(base_url, {
      method: 'POST',
      body: myData,
      headers: myHeaders,
    });
    const responseData = await response.json();
    if (responseData.success.status === 200) {
      setLoad(false)
      // setSelect(2);
      // setDone(true);
      // setTimeout(() => {
      //   setDone(false);
      // }, 2000);
    } else {
      console.log('else error in create_Video');
      setLoad(false)
    }
  } catch (error) {
    console.log('catch error in create_Video', error);
    setLoad(false)
  }
};

export const show_own_video = async setVideoData => {
  const Data = await AsyncStorage.getItem('user_details');
  const userData = JSON.parse(Data);
  try {
    let base_url = `${BaseUrl}show-video-user/${userData.id}`;

    const response = await fetch(base_url, {
      method: 'GET',
    });
    const responseData = await response.json();
    console.log('responseData of show Video ==>', responseData.success.data);
    if (responseData.success.status === 200) {
      setVideoData(responseData.success.data.reverse());
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
