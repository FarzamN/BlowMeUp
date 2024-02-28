import { StyleSheet, Image, View, StatusBar, ImageBackground, ActivityIndicator } from 'react-native'
import React from 'react'
import { Colors } from '../utils/Colors'
import { scale, verticalScale } from 'react-native-size-matters'
import { GlobalStyle } from '../Constants/GlobalStyle'

const SpalshScreen = () => {
  return (
    <View style={{ flex: 1, }}>
      <StatusBar translucent backgroundColor='transparent' />
      <ImageBackground
        source={require('../assets/image/Bacground/splashscreenbackground.png')}
        resizeMode="cover"
        style={[styles.Container, GlobalStyle.Container]}>
        <Image resizeMode='contain' source={require('../assets/image/SplashLogo.png')} />
        <View style={{ marginTop: '20%' }}>
          <ActivityIndicator size={scale(50)} color={Colors.White} />
        </View>
      </ImageBackground>
    </View>
  )
}
const styles = StyleSheet.create({
  Container: {
    justifyContent: 'center',
    alignItems: 'center'
  },
})
export default SpalshScreen
