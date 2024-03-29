import {StyleSheet, Text, View, ImageBackground} from 'react-native';
import React from 'react';
import {scale, verticalScale} from 'react-native-size-matters';
import {Colors} from '../../utils/Colors';
import {Font} from '../../utils/font';
import {Pressable} from '@react-native-material/core';

const GenerationCard = ({data, onPress}) => {
  return (
    <Pressable onPress={onPress}>
      <ImageBackground
        resizeMode="cover"
        imageStyle={{borderRadius: scale(15)}}
        source={{uri: data.image}}
        style={styles.Image}>
        <View style={styles.ContainerBox}>
          <Text style={styles.Text}>{data.name}</Text>
        </View>
      </ImageBackground>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  Image: {
    width: scale(140),
    aspectRatio: 1 / 1,
    marginVertical: verticalScale(10),
    marginHorizontal: scale(5),
  },
  Text: {
    color: Colors.White,
    fontFamily: Font.Inter700,
    fontSize: scale(16),
  },
  ContainerBox: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    height: '25%',
    width: '100%',
    position: 'absolute',
    bottom: 0,
    borderBottomRightRadius: scale(15),
    borderBottomLeftRadius: scale(15),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default GenerationCard;
