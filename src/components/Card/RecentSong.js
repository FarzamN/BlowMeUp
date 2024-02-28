import {StyleSheet, Text, View, Image, Pressable} from 'react-native';
import React, {useState} from 'react';
import {GlobalStyle} from '../../Constants/GlobalStyle';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
  verticalScale,
} from 'react-native-size-matters';
import {Colors} from '../../utils/Colors';
import {Font} from '../../utils/font';
import Entypo from 'react-native-vector-icons/Entypo';
import {Tooltip} from '@rneui/themed';
import OptionToolTip from '../OptionToolTip';
import { useNavigation } from '@react-navigation/native';
import DeleteModal from '../Modal/DeleteModal';
import { Delete_Audio } from '../../redux/actions/UserAction';
import Loading from '../Modal/Loading';

const RecentSong = ({data, onPress, Edit}) => {
  const navigation = useNavigation()
  const [showTool, setShowTool] = useState(false);
  const [Delete, setDelete] = useState(false);
  const [load, setLoad] = useState(false);
  
  const HandelDelete = () => {
    Delete_Audio(data, setDelete, setLoad);
  };
  return (
    <>
    <Pressable
      android_ripple={{color: 'rgba(20, 24, 36, 1)'}}
      onPress={onPress}
      style={styles.Container}>
      <View style={[GlobalStyle.Row, {justifyContent: 'center'}]}>
        <View style={styles.ImageBox}>
          <Image
            style={styles.Image}
            resizeMode="cover"
            source={{uri: data.image}}
          />
        </View>
        <View style={{marginHorizontal: scale(10), width: '65%'}}>
          <Text style={styles.TextOne} allowFontScaling numberOfLines={1.5}>
            {data.title}
          </Text>
          <View
            style={[
              GlobalStyle.Row,
              {
                alignSelf: 'flex-start',
                justifyContent: 'center',
              },
            ]}>
            <Text style={styles.TextTwo}>{data.type}</Text>
            <View style={styles.Dot} />
            <Text style={styles.TextTwo}>{data.name}</Text>
          </View>
        </View>
        {Edit ? (
          <Pressable
            onPress={() => setShowTool(true)}
            android_ripple={{
              color: Colors.Yellow,
              foreground: true,
              borderless: true,
            }}>
            <Entypo name="dots-three-vertical" color={Colors.Yellow} size={scale(20)} />
          </Pressable>
        ) : (
          <Entypo name="chevron-right" color={Colors.Yellow} size={scale(20)} />
        )}
       <Tooltip
              backgroundColor={Colors.Non}
              visible={showTool}
              onOpen={() => setShowTool(true)}
              onClose={() => setShowTool(false)}
              popover={
                <OptionToolTip
                  OptionOne={'Edit'}
                  OptionTwo={'Delete'}
                  onPress = {()=>navigation.navigate('EditAudio',{
                    Values: data
                  })}
                  onDelete={() => setDelete(true)}
                />
              }>
            </Tooltip>
      </View>
    </Pressable>
    <DeleteModal
        visible={Delete}
        KeepPress={() => setDelete(false)}
        OnClose={() => setDelete(false)}
        DeletePress={HandelDelete}
        value="this Audio"
        points
      />
       <Loading isVisible={load} />
    </>
  );
};
const styles = StyleSheet.create({
  Container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: moderateScale(20),

    paddingVertical: moderateVerticalScale(8),
    width: '100%',
    paddingLeft: moderateScale(15),
  },
  ImageBox: {
    width: scale(85),
    height: verticalScale(60),
  },
  Image: {width: '100%', height: '100%', borderRadius: scale(10)},
  TextOne: {
    fontSize: scale(16),
    fontFamily: Font.Inter700,
    color: Colors.White,
  },
  TextTwo: {
    fontSize: scale(14),
    fontFamily: Font.Inter400,
    color: Colors.Main,
  },
  Dot: {
    backgroundColor: Colors.White,
    width: scale(3),
    aspectRatio: 1 / 1,
    borderRadius: 100,
    marginHorizontal: scale(6),
  },
});

export default RecentSong;
