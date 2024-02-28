import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Image,
} from 'react-native';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {Font} from '../../utils/font';
import {Colors} from '../../utils/Colors';

const StreamCard = ({data}) => {
  return (
    <TouchableOpacity activeOpacity={0.8} style={[styles.Container,{marginLeft:data.Type === 'first' ? scale(10) : 0}]}>
      <ImageBackground
        resizeMode="cover"
        imageStyle={{borderRadius: scale(15)}}
        style={styles.Image}
        source={data.source}>
        <View style={styles.TextBox}>
          <View style={styles.Row}>
            <View>
              <Text style={styles.Song}>{data.Song}</Text>
              <Text style={styles.Singer}>{data.Singer}</Text>
            </View>
            <TouchableOpacity>
              <Image
                style={styles.PlayImage}
                source={require('../../assets/image/play.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  Container: {
    width: scale(130),
    aspectRatio: 1 / 1,
    marginVertical: verticalScale(20),
    marginRight:scale(10)
  },
  Image: {
    width: '100%',
    height: '100%',
  },
  TextBox: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: moderateScale(10),
  },
  Song: {
    fontSize: scale(13),
    fontFamily: Font.Poppins600,
    color: Colors.White,
  },
  Singer: {
    fontSize: scale(12),
    fontFamily: Font.Poppins400,
    color: Colors.White,
  },
  Row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  PlayImage: {
    width: scale(35),
    height: scale(35),
    marginTop: -10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});
export default StreamCard;
