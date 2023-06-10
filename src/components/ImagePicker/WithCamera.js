import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  PermissionsAndroid,
  TouchableOpacity,
} from 'react-native';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import Modal from 'react-native-modal';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {Colors} from '../../utils/Colors';
import {Font} from '../../utils/font';

const WithCamera = props => {
  const [saveimage, setsaveimage] = useState({});
  const [show, setShow] = useState(true);

  const [isModalVisible3, setModalVisible3] = useState(false);
  const toggleModal3 = () => {
    setModalVisible3(!isModalVisible3);
  };

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'App Gallery Permission',
          message: 'App needs access to your gallery ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted == PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
        toggleModal3();
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const photosave = () => {
    let options = {
      storageOptions: {
        mediaType: 'photo',
        path: 'image',
        includeExtra: true,
      },
      selectionLimit: 1,
    };

    launchImageLibrary(options, res => {
      if (res.didCancel) {
        console.log('=====> camera');
      } else if (res.error) {
        console.log('====> imagePicker');
      } else if (res.customButton) {
        alert(res.customButton);
      } else {
        setsaveimage(res.assets?.[0]?.uri);
        setShow(false);
      }
    });
  };
  const cameraLaunch = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchCamera(options, res => {
      const granted = PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
      );
      console.log('Response = ', res);
      if (res.didCancel) {
        console.log('User cancelled image picker');
      } else if (res.error) {
        console.log('ImagePicker Error: ', res.error);
      } else if (res.customButton) {
        console.log('User tapped custom button: ', res.customButton);
        alert(res.customButton);
      } else {
        setsaveimage(res.assets?.[0]?.uri);
        setShow(false);
      }
    });
  };
  return (
    <>
      <TouchableOpacity activeOpacity={0.6} onPress={toggleModal3}>
        {show ? (
          <Image
          resizeMode="contain"
            style={styles.circle}
            source={props.source}
          />
        ) : (
          <Image
          resizeMode="contain"
            style={styles.circle}
            source={{uri: saveimage}}
          />
        )}
      </TouchableOpacity>

      <Modal
        backdropOpacity={0.3}
        onBackdropPress={() => setModalVisible3(false)}
        isVisible={isModalVisible3}
        style={{
          width: '100%',
          margin: 0,
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}>
         
            <TouchableOpacity
              onPress={() => setModalVisible3(false)}
              style={styles.CrossBOx}>
              <Entypo name="cross" size={scale(25)} color={Colors.White} />
            </TouchableOpacity>
         

          <View style={styles.SecCon}>
            <TouchableOpacity
              onPress={() => {
                photosave();
                toggleModal3();
              }}
              style={styles.ModalBtn}>
              <MaterialIcons
                // style={styles.tinyLogo}
                name="photo"
                size={scale(32)}
                color={Colors.Main}
              />
              <Text style={styles.Text1}>Upload picture</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                cameraLaunch();
                toggleModal3();
              }}
              style={styles.ModalBtn}>
              <Entypo name="camera" size={scale(30)} color={Colors.Main} />
              <Text style={styles.Text1}>Take a picture</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  circle: {
    width: scale(110),
    height: scale(110),
    backgroundColor: Colors.White,
    borderRadius: scale(100),
    alignSelf: 'center',
  },
  Text1: {
    fontSize: scale(11),
    fontFamily: Font.Gilroy700,
    color: Colors.placeholderTextColor,
  },
  ModalBtn: {
    flex: 1,
    margin: verticalScale(2),
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: scale(15),
    borderTopRightRadius: scale(15),
  },
  SecCon: {
    paddingVertical:moderateScale(15),
    width: '100%',
    backgroundColor: Colors.ThemeBlue,
    borderTopLeftRadius: scale(10),
    borderTopRightRadius: scale(10),
    flexDirection: 'row',
  },
  tinyLogo: {
    height: verticalScale(50),
    width: scale(50),
    resizeMode: 'contain',
  },
  CrossBOx: {
    backgroundColor: Colors.Main,
    width: scale(25),
    borderRadius: 100,
    alignItems: 'center',
    marginBottom: verticalScale(-10),
    zIndex: 9,
    aspectRatio: 1 / 1,
  },
});

export default WithCamera;
