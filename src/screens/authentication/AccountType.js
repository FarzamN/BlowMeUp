import React, { useState } from 'react';
import {
  View,
  ImageBackground,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
  Platform,
} from 'react-native';
import { GlobalStyle } from '../../Constants/GlobalStyle';
import CustomButton from '../../components/CustomButton';
import Success from '../../components/Modal/Success';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { scale, verticalScale } from 'react-native-size-matters';
import { Colors } from '../../utils/Colors';
import { Font } from '../../utils/font';
import { useDispatch } from 'react-redux';
import { register } from '../../redux/actions/AuthActions';
import Error from '../../components/Modal/Error';
import Loading from '../../components/Modal/Loading';
import ConnectionModal from '../../components/Modal/ConnectionModal';
import LogoCard from '../../components/Card/LogoCard';

const AccountType = ({ route }) => {
  const { data, saveImage, socialData } = route.params;
  const OS = Platform.OS;
  const [isArtist, setIsArtist] = useState(false);
  const [isListener, setIsListener] = useState(false);
  const [isNull, setIsNull] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const DATA = [
    { id: 1, title: 'Are you a Listener?' },
    { id: 2, title: 'Are you an Artist?' },
  ];
  const [select, setSelect] = useState('');
  const handelItem = item => {
    setSelect(item.id);
  };

  const handelBtn = () => {
    if (select == '') {
      setIsNull(true);
      setTimeout(() => {
        setIsNull(false);
      }, 2000);
    } else {
      dispatch(
        register(
          data,
          select,
          setIsArtist,
          setIsListener,
          setLoading,
          saveImage,
          socialData,
          OS,
        ),
      );
    }
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.Box}>
        <Pressable
          onPress={() => handelItem(item)}
          android_ripple={{
            color: select == item.id ? Colors.ThemeBlue : Colors.Main,
            borderless: true,
            foreground: true,
          }}
          style={[
            styles.Pressable,
            {
              backgroundColor:
                select == item.id ? Colors.Main : Colors.ThemeBlue,
              borderColor: select == item.id ? Colors.Yellow : 'transparent',
            },
          ]}>
          {item.id == 1 ? (
            <Fontisto
              name="headphone"
              size={scale(50)}
              color={select == item.id ? Colors.ThemeBlue : Colors.Main}
            />
          ) : (
            <MaterialCommunityIcons
              name="microphone-variant"
              size={scale(50)}
              color={select == item.id ? Colors.ThemeBlue : Colors.Main}
            />
          )}

          <Text
            style={[
              styles.Text,
              { color: select == item.id ? Colors.ThemeBlue : Colors.Main },
            ]}>
            {item.title}
          </Text>
        </Pressable>
      </View>
    );
  };

  return (
    <View style={GlobalStyle.Container}>
      <ImageBackground
        source={require('../../assets/image/Bacground/otp.png')}
        resizeMode="cover"
        style={[GlobalStyle.Container, { justifyContent: 'space-between' }]}>
        <LogoCard />
        <View style={{ alignItems: 'center' }}>
          <FlatList
            data={DATA}
            horizontal
            keyExtractor={item => item.id}
            renderItem={item => renderItem(item)}
          />
        </View>
        <View style={{ marginBottom: '15%' }}>
          <CustomButton title="Continue" onPress={handelBtn} />
        </View>
      </ImageBackground>
      <Success
        isVisible={isListener}
        message="Your have Registered as Listener"
      />
      <Success
        isVisible={isArtist}
        message="Your have Registered as Artist"
      />
      <Error isVisible={isNull} message="Please select One" />
      <Loading isVisible={loading} />
      <ConnectionModal />
    </View>
  );
};
const styles = StyleSheet.create({
  Text: {
    fontSize: scale(15),
    fontFamily: Font.Gilroy600,
    maxWidth: '80%',
    textAlign: 'center',
    marginTop: verticalScale(15),
  },
  Pressable: {
    justifyContent: 'center',
    alignItems: 'center',
    height: verticalScale(130),
    aspectRatio: 1 / 1,
    borderRadius: scale(20),
    overflow: 'hidden',
    borderWidth: scale(2),
  },
  Box: {
    borderRadius: scale(20),
    borderWidth: scale(2),
    height: verticalScale(130),
    aspectRatio: 1 / 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: scale(10),
  },
});
export default AccountType;
