import {
  StyleSheet,
  StatusBar,
  View,
  SafeAreaView,
  Image,
  TextInput,
  FlatList,
} from 'react-native';
import React, { useState } from 'react';
import MainHeader from '../../components/Header/MainHeader';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { Colors } from '../../utils/Colors';
import { Font } from '../../utils/font';
import SectionCard from '../../components/Card/SectionCard';
import { useForm } from 'react-hook-form';
import { GlobalStyle } from '../../Constants/GlobalStyle';
const PictureSection = () => {
  const [text, setText] = useState('');
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: 'all' });
  const handleInputChange = inputValue => {
    console.log('Input value:', inputValue);
    setText(inputValue);
  };

  const SectionItem = [
    {
      Name: 'Olivia Mā Ddy',
      Time: '52 minute ago',
      source: require('../../assets/image/section1.jpg'),
      LongText:
        'One good thing about music, when it hits you, you feel no pain. ❤️',
      Number: '36',
    },
    {
      Name: 'Prisha Mclaughlin',
      Time: '52 minute ago',
      source: require('../../assets/image/section2.jpg'),
      LongText:
        'One good thing about music, when it hits you, you feel no pain. ❤️',
      Number: '36',
    },
  ];

  return (
    <SafeAreaView style={GlobalStyle.Container}>
      <StatusBar backgroundColor={Colors.ThemeBlue} />
      <MainHeader
        Notification={true}
        Logo={true}
        source={require('../../assets/image/photo.png')}
        Title={true}
        Text="Picture Section"
      />

      <View style={styles.Row}>
        <Image
          style={[styles.Image, { borderRadius: scale(100) }]}
          source={require('../../assets/image/dp.jpg')}
        />
        <View style={styles.TextInputBox}>
          <TextInput
            style={styles.TextInput}
            placeholder="What’s on your mind?"
            placeholderTextColor={Colors.placeholderTextColor}
            control={control}
            value={text}
            onChangeText={handleInputChange}
          />
        </View>
        <Image
          style={styles.Image}
          resizeMode="contain"
          source={require('../../assets/image/picture.png')}
        />
      </View>
      <FlatList
        scrollEnabled={true}
        showsVerticalScrollIndicator={false}
        data={SectionItem}
        renderItem={({ item }) => {
          return <SectionCard data={item} />;
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  Row: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    paddingHorizontal: moderateScale(10)
  },
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
});

export default PictureSection;
