import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { GlobalStyle } from '../Constants/GlobalStyle'
import { Colors } from '../utils/Colors'
import { Font } from '../utils/font'
import { scale, verticalScale } from 'react-native-size-matters'

const LeaderBoardCrown = ({imgTwo,NumberTwo,NameTwo,imgOne,NameOne,NumberOne,imgThree,NumberThree,NameThree}) => {
  return (
   <>
       <View
        style={[
          GlobalStyle.Row,
          {justifyContent: 'space-evenly', marginTop: verticalScale(10)},
        ]}>
        <View>
          <View style={[styles.imageBox, {borderColor: Colors.ThemeCream}]}>
            <Image
              style={[GlobalStyle.Image, {borderRadius: 100}]}
              resizeMode="cover"
              source={imgTwo}
            />
            <View
              style={[styles.NumberBox, {backgroundColor: Colors.ThemeCream}]}>
              <Text style={styles.Number}>{NumberTwo}</Text>
            </View>
          </View>
          <Text style={styles.Name}>{NameTwo}</Text>
        </View>
        <View>
          <View style={styles.CrownBox}>
            <Image
              resizeMode="contain"
              style={GlobalStyle.Image}
              source={require('../assets/image/crawn.png')}
            />
          </View>
          <View
            style={[
              styles.imageBox,
              styles.imageBoxWinner,
              {borderColor: Colors.LightYellow},
            ]}>
            <Image
              style={[GlobalStyle.Image, {borderRadius: 100}]}
              resizeMode="cover"
              source={imgOne}
            />
            <View
              style={[styles.NumberBox, {backgroundColor: Colors.LightYellow}]}>
              <Text style={styles.Number}>{NumberOne}</Text>
            </View>
          </View>
          <Text style={styles.Name}>{NameOne}</Text>
        </View>
        <View>
          <View style={[styles.imageBox, {borderColor: Colors.ThemeOrange}]}>
            <Image
              style={[GlobalStyle.Image, {borderRadius: 100}]}
              resizeMode="cover"
              source={imgThree}
            />
            <View
              style={[styles.NumberBox, {backgroundColor: Colors.ThemeOrange}]}>
              <Text style={styles.Number}>{NumberThree}</Text>
            </View>
          </View>
          <Text style={styles.Name}>{NameThree}</Text>
        </View>
      </View>
   </>
  )
}
const styles = StyleSheet.create({
    imageBox: {
        width: scale(70),
        height: scale(70),
        borderWidth: scale(3),
        borderRadius: scale(100),
        marginTop: verticalScale(50),
      },
      imageBoxWinner: {
        width: scale(110),
        height: scale(110),
        marginHorizontal: scale(7),
        marginTop: verticalScale(-15),
      },
      NumberBox: {
        width: scale(25),
        height: scale(25),
        borderRadius: 100,
        alignSelf: 'center',
        marginTop: verticalScale(-10),
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: scale(2),
        borderColor: Colors.ThemeBlue,
      },
      Number: {
        color: Colors.ThemeBlue,
        fontFamily: Font.Nats,
        fontSize: scale(13),
        lineHeight: verticalScale(22),
      },
      CrownBox: {
        justifyContent: 'center',
        borderWidth: 0,
        borderRadius: 0,
        alignSelf: 'center',
        width: scale(75),
        height: verticalScale(60),
        zIndex: 9,
      },
      Name: {
        color: Colors.White,
        fontSize: scale(13),
        fontFamily: Font.Nats,
        textAlign: 'center',
        marginTop: verticalScale(10),
      },
     
})

export default LeaderBoardCrown
