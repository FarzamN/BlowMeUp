import AsyncStorage from '@react-native-async-storage/async-storage';
import {BaseUrl, token} from '../../utils/url';
import {ROLE_ID, USER_DETAILS} from '../reducer/Holder';
const user_id = 1;
export const Update_profile = (
  data,
  userDetails,
  saveimage,
  setActiveLoading,
) => {
  console.log('data laraib', saveimage);
  return async dispatch => {
    setActiveLoading(true);
    try {
      let base_url = `${BaseUrl}update_profile.php`;
      //   let base_url = `https://sassolution.org/BlowMeUp/APIs/update_profile.php`;
      let myData = new FormData();

      myData.append('token', token);
      myData.append('user_id', userDetails.user_id);
      myData.append('user_name', data.name);
      myData.append('phone', data.phone);
      myData.append('profilepic', saveimage);
      myData.append('email', data.email);

      const response = await fetch(base_url, {
        body: myData,
        method: 'post',
      });

      const responseData = await response.json();
      if (responseData.status == true) {
        setActiveLoading(false);
        console.log('responseData', responseData);
        dispatch({type: USER_DETAILS, payload: responseData.data});
        dispatch({type: ROLE_ID, payload: responseData.data.role});
        await AsyncStorage.setItem(
          'user_details',
          JSON.stringify(responseData.data),
        );
      } else {
        console.log('else error');
      }
    } catch (error) {
      console.log('catch error', error);
    }
  };
};

export const Update = async (
  data,
  setPasswordChange,
  userDetails,
  navigation,
  setLoading,
) => {
  console.log('data', data, 'userDetails ==>', userDetails);
  setLoading(true);
  try {
    let base_url = `${BaseUrl}Authentication/update_password.php`;
    let myData = new FormData();

    myData.append('token', token);
    myData.append('new_password', data.confirm_password);
    myData.append('user_id', userDetails.user_id);

    const response = await fetch(base_url, {
      method: 'post',
      body: myData,
    });
    console.log('response', response);
    const responseData = await response.json();
    if (responseData.status == true) {
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

export const create_Video = async (data, type, saveVideo,saveImage, setSelect,setDone) => {
  console.log('data', data.title, type, saveVideo, saveImage, setSelect);
  const user_id = 1;
  try {
    let base_url = `${BaseUrl}create-video/${user_id}`;
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
      setSelect(2);
      setDone(true);
      setTimeout(() => {
        setDone(false);
      }, 2000);
    } else {
      console.log('else error in create_Video');
    }
  } catch (error) {
    console.log('catch error in create_Video', error);
  }
};

export const show_own_video = async setVideoData => {
  const user_id = 1;
  try {
    // let base_url = `${BaseUrl}show-video-user${user_id}`;
    let base_url = `${BaseUrl}show-video-user/${user_id}`;

    const response = await fetch(base_url, {
      method: 'GET',
    });
    const responseData = await response.json();
    console.log('responseData of show Video ==>',responseData.success.data)
    if (responseData.success.status === 200) {
      setVideoData(responseData.success.data);
    } else {
      console.log('else error in show_video');
    }
  } catch (error) {
    console.log('catch error in show_video', error);
  }
};

export const show_all_video = async setVideoData =>{
 
  try {
    let base_url = `${BaseUrl}videos`;

    const response = await fetch(base_url, {
      method: 'GET',
    });
    const responseData = await response.json();
    console.log('responseData of show Video ==>',responseData.success.data)
    if (responseData.success.status === 200) {
      setVideoData(responseData.success.data);
    } else {
      console.log('else error in show_video');
    }

  } catch (error) {
    console.log('catch error in show_all_video', error);
  }
}