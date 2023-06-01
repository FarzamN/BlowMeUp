import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
  FlatList,
  StatusBar,
} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MainHeader from '../../../components/Header/MainHeader';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {Colors} from '../../../utils/Colors';
import {Font} from '../../../utils/font';
import CustomButton from '../../../components/CustomButton';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Entypo from 'react-native-vector-icons/Entypo';
import AlbumCard from '../../../components/Card/AlbumCard';
const W = Dimensions.get('window').width;
const H = Dimensions.get('window').height;

const PlayAll = ({navigation}) => {
  const AlbumData = [
    {
      Name: 'Antisocialites',
      source: require('../../../assets/image/album1.jpg'),
      type:'first'
    },
    {
      Name: 'Alvvays',
      source: require('../../../assets/image/album2.jpg'),
    },
    {
      Name: 'Mф BendaйoLy',
      source: require('../../../assets/image/album3.jpg'),
    },
  ];
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={Colors.ThemeBlue} />
      <MainHeader
        Notification={true}
        BackArrow={true}
        // Container={{paddingRight: moderateScale(20)}}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.FirstBox}>
          <View style={styles.ImageBox}>
            <Image
              style={styles.Image}
              resizeMode="cover"
              source={require('../../../assets/image/artist2.jpg')}
            />
          </View>
          <Text style={styles.Name}>Marcus Morgan</Text>
          <View style={styles.Row}>
            <CustomButton
              title="Play All"
              Play={true}
              containerStyle={styles.containerStyle}
              textStyle={styles.textStyle}
            />
            <TouchableOpacity activeOpacity={0.6} style={styles.IconBox}>
              <Ionicons
                name="md-shuffle"
                color={Colors.ThemePurple}
                size={scale(30)}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.SecBox}>
          <Text style={styles.Recent}>Recent Song</Text>
          <View
            style={[
              styles.Row,
              {
                justifyContent: 'space-between',
                marginVertical: verticalScale(15),
              },
            ]}>
            <View style={styles.Row}>
              <View style={styles.MusicIconBox}>
                <Fontisto
                  name="music-note"
                  size={scale(25)}
                  color={Colors.ThemePurple}
                />
              </View>
              <View style={{marginLeft: scale(7)}}>
                <Text style={[styles.Recent, {color: Colors.White}]}>
                  Dreams Tonite
                </Text>
                <View style={styles.Row}>
                  <Text style={styles.AftNameText}>Alvvays</Text>
                  <Text
                    style={[styles.AftNameText, {marginHorizontal: scale(5)}]}>
                    •
                  </Text>
                  <Text style={styles.AftNameText}>09 March 2023</Text>
                </View>
              </View>
            </View>
            <Entypo name="dots-three-vertical" size={20} color={Colors.White} />
          </View>
        </View>
        <View style={styles.ThirdBox}>
          <Text style={[styles.Recent,{
    marginLeft: scale(20)

          }]}>Albums</Text>
          <FlatList
            scrollEnabled={true}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={AlbumData}
            renderItem={({item}) => {
              return <AlbumCard data={item} />;
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.ThemeBlue,
  },
  FirstBox: {
    marginHorizontal: scale(20),
    alignItems: 'center',
  },
  SecBox: {
    marginHorizontal: scale(20),
  },
  // ThirdBox: {marginLeft: scale(20)},
  Image: {width: '100%', height: '100%', borderRadius: scale(20)},
  ImageBox: {width: W * 0.9, height: H * 0.3},
  Name: {
    fontFamily: Font.NunitoSans700,
    fontSize: scale(25),
    textAlign: 'center',
    color: Colors.White,
    marginTop: verticalScale(10),
    marginBottom: verticalScale(20),
  },
  Row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  containerStyle: {
    backgroundColor: Colors.ThemePurple,
    borderWidth: null,
    width: '75%',
  },
  textStyle: {
    color: Colors.White,
    fontFamily: Font.Inter500,
  },
  IconBox: {
    width: scale(50),
    aspectRatio: 1 / 1,
    borderWidth: scale(1),
    borderColor: Colors.ThemePurple,
    borderRadius: 100,
    marginLeft: scale(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  MusicIconBox: {
    backgroundColor: '#2B3151',
    width: scale(60),
    aspectRatio: 1 / 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scale(15),
  },
  Recent: {
    color: Colors.Grey,
    fontFamily: Font.NunitoSans700,
    fontSize: scale(15),
  },
  AftNameText: {
    fontFamily: Font.NunitoSans400,
    color: '#8F9AA3',
    fontSize: scale(11),
  },
});
export default PlayAll;
