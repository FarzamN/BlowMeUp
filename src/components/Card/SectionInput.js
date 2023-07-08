import { StyleSheet, Image, View,TextInput,TouchableOpacity } from 'react-native'
import React, { forwardRef } from 'react'
import { moderateScale, moderateVerticalScale, scale, verticalScale } from 'react-native-size-matters'
import { Colors } from '../../utils/Colors'
import { Font } from '../../utils/font'
import { useController } from 'react-hook-form'
import { GlobalStyle } from '../../Constants/GlobalStyle'
import { useSelector } from 'react-redux'
import { Image_BaseUrl } from '../../utils/url'

const SectionInput = forwardRef((props, ref) => {
  const userDetails = useSelector(state => state.userDetails);

    const { field } = useController({
        control: props.control,
        defaultValue: props.defaultValue || '',
        name: props.name,
        rules: props.rules,
      });
  return (
   <>
       <View
        style={[
          GlobalStyle.Row,
          {alignSelf: 'center', paddingBottom: moderateVerticalScale(10)},
        ]}>
        <Image
          style={[styles.Image, {borderRadius: scale(100)}]}
          source={{uri: Image_BaseUrl + userDetails.profile_image}}
        />
        <View style={styles.TextInputBox}>
          <TextInput
            style={styles.TextInput}
            placeholder="What’s on your mind?"
            placeholderTextColor={Colors.placeholderTextColor}
            value={field.value}
            onChangeText={field.onChange}
            ref={ref}
            pattern={props.pattern}
          />
        </View>
        <TouchableOpacity onPress={props.onPress}>
        <Image
          style={styles.Image}
          resizeMode="contain"
          source={require('../../assets/image/picture.png')}
        />
        </TouchableOpacity>
      </View>
   </>
  )
})

export default SectionInput

const styles = StyleSheet.create({
 
      TextInputBox: {
        borderWidth: scale(1),
        borderColor: Colors.White,
        borderRadius: scale(20),
        paddingHorizontal: moderateScale(20),
        height: verticalScale(40),
        width: '75%',
        marginHorizontal: scale(5),
      },
      TextInput: {
        color: Colors.White,
        fontFamily: Font.Gilroy500,
        fontSize: scale(16),
      },
      Image: {
        width: scale(30),
        height: scale(30),
      },
})