import {
  StyleSheet,
  StatusBar,
  View,
  SafeAreaView,
  Image,
  TextInput,
  FlatList,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import MainHeader from '../../components/Header/MainHeader';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
  verticalScale,
} from 'react-native-size-matters';
import {Colors} from '../../utils/Colors';
import {Font} from '../../utils/font';
import SectionCard from '../../components/Card/SectionCard';
import {GlobalStyle} from '../../Constants/GlobalStyle';
import {useFocusEffect} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {Image_BaseUrl} from '../../utils/url';
import ConnectionModal from '../../components/Modal/ConnectionModal';
import Netinfo from '@react-native-community/netinfo';
import SectionInput from '../../components/Card/SectionInput';
import {useForm} from 'react-hook-form';
import Validation from '../../components/Validation';

const VlogSection = ({navigation}) => {
  const userDetails = useSelector(state => state.userDetails);
  const [isConnected, setIsConnected] = useState(false);
  const SectionItem = [
    {
      Name: 'Olivia Mā Ddy',
      Time: '52 minute ago',
      source: require('../../assets/image/section1.jpg'),
      LongText:
        'One good thing about music, when it hits you, you feel no pain. ❤️',
      Number: '36',
      Avatar: require('../../assets/image/dp2.png'),
    },
    {
      Name: 'Prisha Mclaughlin',
      Time: '52 minute ago',
      source: require('../../assets/image/section2.jpg'),
      LongText:
        'One good thing about music, when it hits you, you feel no pain. ❤️',
      Number: '36',
      Avatar: require('../../assets/image/dp1.png'),
    },
  ];

  useFocusEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useCallback(() => {
      navigation.getParent()?.setOptions({
        tabBarStyle: GlobalStyle.showBar,
      });
    }),
  );

  useEffect(() => {
    const unsubscribe = Netinfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({mode: 'all'});

  const onSubmit = data => {
    console.log('data', data);
  };
  return (
    <SafeAreaView style={GlobalStyle.Container}>
      <StatusBar backgroundColor={Colors.ThemeBlue} />
      <MainHeader
        Notification
        Logo
        source={require('../../assets/image/video.png')}
        Title
        Text="Vlog Section"
      />

      <SectionInput
        control={control}
        name="on_mind"
        rules={{
          required: '*required',

          maxLength: {
            value: 300,
            message: '*Can not Push empty inPut',
          },
        }}
        onPress={handleSubmit(onSubmit)}
      />
      {errors.on_mind && (
        <Validation restyle={{marginLeft: scale(40), marginBottom: 0}} message={errors.on_mind.message}/>
      )}
      <FlatList
        scrollEnabled={true}
        showsVerticalScrollIndicator={false}
        data={SectionItem}
        renderItem={({item}) => {
          return <SectionCard data={item} />;
        }}
      />
      <ConnectionModal isVisible={!isConnected} />
    </SafeAreaView>
  );
};

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
});

export default VlogSection;
