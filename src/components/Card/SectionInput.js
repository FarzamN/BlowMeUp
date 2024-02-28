import { StyleSheet, Image, View } from 'react-native';
import React, { useState } from 'react';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
  verticalScale,
} from 'react-native-size-matters';
import { Colors } from '../../utils/Colors';
import { Font } from '../../utils/font';
import { GlobalStyle } from '../../Constants/GlobalStyle';
import { useSelector } from 'react-redux';
import CustomButton from '../CustomButton';
import ImageViewModal from '../Modal/ImageViewModal';
import { Pressable } from '@react-native-material/core';

const SectionInput = props => {
  const userDetails = useSelector(state => state.userDetails);
  const [isDpViewVisible, setIsDpViewVisible] = useState(false);

  return (
    <>
      <View
        style={[
          GlobalStyle.Row,
          { alignSelf: 'center', paddingBottom: moderateVerticalScale(10) },
        ]}>
        <Pressable android_ripple={{ color: Colors.ThemeBlue }} onPress={() => setIsDpViewVisible(true)}>
          <Image
            style={styles.DP}
            source={{ uri: userDetails.image }}
          />
        </Pressable>
        <CustomButton
          textStyle={styles.TextInput}
          containerStyle={styles.TextInputBox}
          onPress={props.onPress}
          title="What’s on your mind?"
        />
        <Image
          style={styles.Image}
          resizeMode="contain"
          source={require('../../assets/image/picture.png')}
        />
      </View>
      <ImageViewModal
        images={userDetails.image}
        isVisible={isDpViewVisible}
        onClose={() => setIsDpViewVisible(false)}
      />
    </>
  );
};

export default SectionInput;

const styles = StyleSheet.create({
  TextInputBox: {
    borderWidth: scale(1),
    borderColor: Colors.White,
    borderRadius: scale(20),
    paddingHorizontal: moderateScale(20),
    height: verticalScale(40),
    width: '75%',
    marginHorizontal: scale(5),
    justifyContent: 'flex-start',
    backgroundColor: Colors.Non,
  },
  TextInput: {
    color: Colors.White,
    fontFamily: Font.Gilroy500,
    fontSize: scale(15),
    top: -1,
  },
  Image: {
    width: scale(28),
    height: scale(28),
  },
  DP: {
    width: scale(35),
    height: scale(35),
    borderRadius: scale(100)
  },
});
