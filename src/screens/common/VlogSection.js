import {
  StatusBar,
  SafeAreaView,
  FlatList,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import MainHeader from '../../components/Header/MainHeader';
import {
  scale,
} from 'react-native-size-matters';
import {Colors} from '../../utils/Colors';
import {GlobalStyle} from '../../Constants/GlobalStyle';
import {useFocusEffect} from '@react-navigation/native';
import ConnectionModal from '../../components/Modal/ConnectionModal';
import Netinfo from '@react-native-community/netinfo';
import SectionInput from '../../components/Card/SectionInput';
import {useForm} from 'react-hook-form';
import Validation from '../../components/Validation';
import VideoCard from '../../components/Card/VideoCard';
import EmptyCard from '../../components/Card/EmptyCard';
import { show_all_video } from '../../redux/actions/UserAction';

const VlogSection = ({navigation}) => {
  const [isConnected, setIsConnected] = useState(false);
  const [VideoData, setVideoData] = useState('');
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

  useFocusEffect(
    useCallback(() => {
      show_all_video(setVideoData);
    }, []),
  );
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
        data={VideoData}
        ListEmptyComponent={() => {
          return <EmptyCard />;
        }}
        renderItem={({item}) => {
          return <VideoCard key={item.id} data={item} LikeWork/>
        }}
      />
      <ConnectionModal isVisible={!isConnected} />
    </SafeAreaView>
  );
};


export default VlogSection;
// https://sassolution.org/BlowMeUp/api/videos
