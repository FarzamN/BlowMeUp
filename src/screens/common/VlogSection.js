import {
  StyleSheet,
  StatusBar,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  TextInput,
  FlatList
} from 'react-native';
import React from 'react';
import MainHeader from '../../components/Header/MainHeader';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {Colors} from '../../utils/Colors';
import {Font} from '../../utils/font';
import SectionCard from '../../components/Card/SectionCard';

const VlogSection = () => {
  const SectionItem = [
    {
      Name: 'Olivia Mā Ddy',
      Time: '52 minute ago',
      source: require('../../assets/image/section1.jpg'),
      LongText:
        'One good thing about music, when it hits you, you feel no pain. ❤️',
      Number: '36',
      Avatar:require('../../assets/image/dp2.png')
    },
    {
      Name: 'Prisha Mclaughlin',
      Time: '52 minute ago',
      source: require('../../assets/image/section2.jpg'),
      LongText:
        'One good thing about music, when it hits you, you feel no pain. ❤️',
      Number: '36',
      Avatar:require('../../assets/image/dp1.png')
    },
  ];
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={Colors.ThemeBlue} />
      <MainHeader
        Notification={true}
        Logo={true}
        source={require('../../assets/image/video.png')}
        Title={true}
        Text="Vlog Section"
      />

        <View style={styles.Row}>
          <Image
            resizeMode="contain"
            style={styles.Image}
            source={require('../../assets/image/avatar.png')}
          />
          <View style={styles.TextInputBox}>
            <TextInput
              style={styles.TextInput}
              placeholder="What’s on your mind?"
              placeholderTextColor={Colors.placeholderTextColor}
            />
          </View>
          <Image
            resizeMode="contain"
            style={styles.Image}
            source={require('../../assets/image/picture.png')}
          />
        </View>
        <FlatList
        scrollEnabled={true}
        showsVerticalScrollIndicator={false}
        data={SectionItem}
        renderItem={({item}) => {
          return <SectionCard data={item} />;
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.ThemeBlue,
    paddingLeft: moderateScale(12),
  },

  Row: {
    flexDirection: 'row',
    alignItems: 'center',
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

export default VlogSection;
