import React, { useState } from 'react';
import { Pressable, StyleSheet, View, Text } from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';
import YoutubePlayer from 'react-native-youtube-iframe';
import { UrlRegex } from '../../utils/url';
import { Colors } from '../../utils/Colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DeleteModal from '../Modal/DeleteModal';
import { useNavigation } from '@react-navigation/native';
import { GlobalStyle } from '../../Constants/GlobalStyle';
import Loading from '../Modal/Loading';
import { Delete_stream } from '../../redux/actions/UserAction';
import { Font } from '../../utils/font';
const IFrameCard = ({ data }) => {
  const navigation = useNavigation();
  const [Delete, setDelete] = useState(false);
  const [Load, setLoad] = useState(false);

  console.log('data', data);
  const youtubeUrl = data.live_stream;
  const match = youtubeUrl.match(UrlRegex);
  const videoId = match[6];

  const HandelDelete = () => {
    Delete_stream(data, setDelete, setLoad);
  };
  return (
    <>
      <YoutubePlayer height={verticalScale(200)} videoId={videoId} />
      <View style={[GlobalStyle.Row, styles.row]}>
        <Text style={styles.title}>{data.title}</Text>
        <View style={GlobalStyle.Row}>
          <Pressable
            onPress={() =>
              navigation.navigate('EditStream', {
                Values: data,
              })
            }
            android_ripple={styles.ripple}>
            <MaterialCommunityIcons
              name="movie-edit"
              size={scale(22)}
              color={Colors.ThemeCream}
            />
          </Pressable>
          <Text style={{ color: Colors.Non }}>0</Text>
          <Pressable
            onPress={() => setDelete(true)}
            android_ripple={styles.ripple}>
            <MaterialCommunityIcons
              name="delete"
              size={scale(22)}
              color="red"
            />
          </Pressable>
        </View>
      </View>
      <View style={styles.line} />
      <DeleteModal
        visible={Delete}
        KeepPress={() => setDelete(false)}
        OnClose={() => setDelete(false)}
        DeletePress={HandelDelete}
        value="this Stream"
        points
      />
      <Loading isVisible={Load} />
    </>
  );
};
const styles = StyleSheet.create({
  ripple: {
    color: Colors.Main,
    borderless: true,
    foreground: true,
  },
  title: {
    color: Colors.White,
    fontFamily: Font.Gilroy400,
    fontSize: scale(16),
  },
  row: {
    justifyContent: 'space-between',
    marginHorizontal: scale(20),
    marginBottom: verticalScale(20),
  },
  line: {
    borderBottomWidth: scale(1.5),
    borderBottomColor: Colors.Grey
  }
});
export default IFrameCard;
