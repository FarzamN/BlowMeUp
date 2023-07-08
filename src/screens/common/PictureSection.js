import {
  StyleSheet,
  StatusBar,
  View,
  SafeAreaView,
  Image,
  TextInput,
  FlatList,
  Text,
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
import {Image_BaseUrl} from '../../utils/url';
import {useSelector} from 'react-redux';
import ConnectionModal from '../../components/Modal/ConnectionModal';
import Netinfo from '@react-native-community/netinfo';
import SectionInput from '../../components/Card/SectionInput';
import {useForm} from 'react-hook-form';
import Validation from '../../components/Validation';

const PictureSection = ({navigation}) => {
  const [text, setText] = useState('');
  const [isConnected, setIsConnected] = useState(false);

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
    console.log('data', data)
  }
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

export default PictureSection;
