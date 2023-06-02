import { StyleSheet, Image, View,StatusBar,ImageBackground,ActivityIndicator } from 'react-native'
import React from 'react'
import { Colors } from '../utils/Colors'
import { scale } from 'react-native-size-matters'

const SpalshScreen = () => {
  return (
    <View style={{ flex:1,}}>
        <StatusBar translucent backgroundColor='transparent'/>
        <ImageBackground
        source={require('../assets/image/Bacground/splashscreenbackground.png')}
        resizeMode="cover"
        style={styles.Container}>
            <Image resizeMode='contain' source={require('../assets/image/SplashLogo.png')}/>
            <View style={{marginTop:'20%'}}>
           <ActivityIndicator size={scale(50)} color={Colors.White} />
           </View>
            </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
    Container:{
        flex:1,
        backgroundColor:Colors.ThemeBlue,
        justifyContent:'center',
        alignItems:'center'
    }
})
export default SpalshScreen
