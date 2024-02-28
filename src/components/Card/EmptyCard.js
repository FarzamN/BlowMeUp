import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import FastImage from 'react-native-fast-image';
import { GlobalStyle } from '../../Constants/GlobalStyle';
import { scale, verticalScale } from 'react-native-size-matters';

import { DotIndicator } from 'react-native-indicators';
import { Colors } from '../../utils/Colors';

const EmptyCard = props => {

  return (
    <View style={styles.container}>
      <View style={styles.ImageBox}>
        <FastImage
          style={styles.Image}
          source={require('../../assets/image/empty.png')}
          resizeMode={FastImage.resizeMode.contain}
        />
      </View>
      <Text style={[GlobalStyle.UploadTitle, { fontSize: scale(22) }, props.textRestyle]}>
        Nothing to Show
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    marginTop: '30%',
  },
  Image: {
    width: '100%',
    height: '100%',
  },
  ImageBox: {
    width: scale(200),
    height: scale(200),
    marginVertical: verticalScale(10),
  },
});
export default EmptyCard;
