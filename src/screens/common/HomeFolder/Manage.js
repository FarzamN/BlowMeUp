import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import MainHeader from '../../../components/Header/MainHeader';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {Colors} from '../../../utils/Colors';
import {Font} from '../../../utils/font';
import Upload from './Upload';
import Video from './Video';

const Manage = () => {
  const [upload, setUpload] = useState(true);
  const [videos, setVideos] = useState(false);

  const [uploadColor, setUploadColor] = useState(Colors.Main);
  const [videoColor, setVideoColor] = useState('#556084');

  const HandleUpload = () => {
    setUpload(true);
    setVideos(false);
    setUploadColor(Colors.Main);
    setVideoColor('#556084');
  };
  const HandleVideos = () => {
    setVideos(true);
    setUpload(false);
    setUploadColor('#556084');
    setVideoColor(Colors.Main);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={Colors.ThemeBlue} />
      <MainHeader
        Notification={true}
        BackArrow={true}
        Title={true}
        Text="Manage Podcast/Music Videos"
        TextRestyle={styles.TextRestyle}
      />
      <View
        style={[
          styles.Row,
          {justifyContent: 'space-between', marginHorizontal: scale(15),marginBottom:verticalScale(8)},
        ]}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => HandleUpload()}
          style={[styles.ChangeBox, {backgroundColor: uploadColor}]}>
          <Text style={styles.ChangeText}>Upload</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => HandleVideos()}
          style={[styles.ChangeBox, {backgroundColor: videoColor}]}>
          <Text style={styles.ChangeText}>Videos</Text>
        </TouchableOpacity>
      </View>
      <View style={{marginHorizontal: scale(15)}}>
        {upload && <Upload />}
        {videos && <Video />}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.ThemeBlue,
  },
  TextRestyle: {
    fontFamily: Font.Poppins500,
    fontSize: scale(13),
  },
  Row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ChangeBox: {
    height: verticalScale(40),
    width: scale(120),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scale(100),
  },
  ChangeText: {
    color: Colors.White,
    fontFamily: Font.Roboto500,
    fontSize: scale(13),
  },
});
export default Manage;
