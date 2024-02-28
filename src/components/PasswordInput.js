import React, { forwardRef, useState } from 'react';
import { useController } from 'react-hook-form';
import { StyleSheet, TextInput, View, Text } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { Colors } from '../utils/Colors';
import { Font } from '../utils/font';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';

const PasswordInput = forwardRef((props, ref) => {
  const { field } = useController({
    control: props.control,
    defaultValue: props.defaultValue || '',
    name: props.name,
    rules: props.rules,
  });

  const [password, setPassword] = useState(true)
  return (
    <View style={[styles.smallbox, props.style, props.Hello]}>
      {props.FontAwesome ? (
        <FontAwesome
          name={props.FontAwesome_Name}
          size={props.size}
          color={Colors.White}
        />
      ) : null}
      <Fontisto
        name={'unlocked'}
        size={scale(20)}
        color={Colors.White}
      />
      <TextInput
        onFocus={props.onFocus}
        textContentType={props.textContentType}
        value={field.value}
        ref={ref}
        onChangeText={field.onChange}
        multiline={props.multiline}
        numberOfLines={props.numberOfLines}
        placeholder={props.placeholder}
        placeholderTextColor={Colors.placeholderTextColor}
        style={[styles.InputStyles, props.Gapp, props.restyle]}
        secureTextEntry={password}
        keyboardType={'default'}
        textAlignVertical={props.textAlignVertical}
        pattern={props.pattern}
        label={props.label}
        placeholderStyle={props.placeholderStyle}
        fontSize={props.fontSize}
        maxLength={props.maxLength}
        cursorColor={Colors.Main}
        keyboardAppearance='dark'
        selectionColor={Colors.Main}
      />
      <Text style={styles.Text} onPress={() => setPassword(!password)}>{password == true ? 'SHOW' : 'HIDE'}</Text>
    </View>
  );
});

const styles = StyleSheet.create({
  InputStyles: {
    width: '80%',
    height: '100%',
    color: Colors.White,
    fontFamily: Font.Gilroy500,
    paddingHorizontal: moderateScale(20),
  },
  smallbox: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: verticalScale(20),
    width: '100%',
    paddingHorizontal: moderateScale(20),
    height: verticalScale(50),
    backgroundColor: 'transparent',
    borderWidth: scale(1),
    borderColor: Colors.White,
    borderRadius: scale(20),
  },
  Text: {
    color: Colors.White,
    fontFamily: Font.Gilroy600,
    fontSize: scale(15)
  }
});
export default PasswordInput;


