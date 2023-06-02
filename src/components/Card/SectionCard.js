import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Dimensions,
  Image,
  TouchableOpacity
} from 'react-native';
import {Colors} from '../../utils/Colors';

import {
  moderateVerticalScale,
  scale,
  verticalScale,
} from 'react-native-size-matters';
import {Font} from '../../utils/font';
import {Like} from '../Like';
const W = Dimensions.get('window').width;
const H = Dimensions.get('window').height;

const SectionCard = ({data}) => {
  return (
    <View style={styles.Container}>
      <View style={styles.Row}>
        <Image style={styles.Dp} source={data.avatar} />
        <View style={styles.Active} />
        <View>
          <Text style={styles.Name}>{data.Name}</Text>
          <Text style={styles.Time}>{data.Time}</Text>
        </View>
      </View>
      <View style={styles.ImageBox}>
        <ImageBackground
          resizeMode="cover"
          style={[
            styles.Image,
            {justifyContent: 'center', alignItems: 'center'},
          ]}
          source={data.source}>
            <TouchableOpacity onPress={() => console.log('first')}>
          <Image
            style={{height: scale(30), width: scale(30)}}
            source={require('../../assets/image/play.png')}
          />
          </TouchableOpacity>
        </ImageBackground>
      </View>
      <View style={{marginHorizontal:20}}>
      <Text style={styles.Text}>{data.LongText}</Text>
      <View style={styles.Row}>
        <Like />
        <Text style={styles.Number}>{data.Number}</Text>
      </View>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    marginTop: verticalScale(30),
    borderBottomWidth: scale(1),
    borderBottomColor: Colors.Grey,
    paddingBottom: moderateVerticalScale(20),
  },
  Row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  Active: {
    backgroundColor: Colors.Green,
    borderRadius: 100,
    height: scale(15),
    width: scale(15),
    borderWidth: 1,
    borderColor: Colors.White,
    marginLeft: scale(-10),
    marginRight: scale(20),
    alignSelf: 'flex-end',
  },
  Name: {
    color: Colors.White,
    fontFamily: Font.Poppins500,
    fontSize: scale(15),
  },
  Time: {
    color: Colors.Grey,
    fontFamily: Font.Poppins400,
    fontSize: scale(12),
  },
  ImageBox: {
    width: W * 0.95,
    height: H * 0.3,
    marginVertical: verticalScale(10),
    alignSelf:'center'
  },
  Image: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
  },

  Text: {
    fontSize: scale(12),
    fontFamily: Font.Poppins400,
    color: Colors.White,
    marginVertical: verticalScale(15),
  },
  heartImage: {
    width: scale(22),
    height: scale(22),
    marginRight: scale(8),
  },
  Number: {
    fontFamily: Font.Poppins400,
    fontSize: scale(12),
    color: Colors.White,
    marginLeft: scale(10),
  },
  Dp: {
    width: scale(40),
    height: scale(40),
  },
});

export default SectionCard;
