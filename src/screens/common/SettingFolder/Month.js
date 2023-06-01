import {StyleSheet, Text, View, Image, FlatList} from 'react-native';
import React from 'react';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
  verticalScale,
} from 'react-native-size-matters';
import {Colors} from '../../../utils/Colors';
import {Font} from '../../../utils/font';
import Entypo from 'react-native-vector-icons/Entypo';

const Month = () => {
  const DATA = [
    {
      id: '1',
      Date: '2019 pts.',
      Name: 'Iman',
      Icon: 'chevron-down',
      color: Colors.ThemeGreen,
      type: 'first',
      colorType: 'winner',
      source: require('../../../assets/image/leader1.jpg'),
    },
    {
      id: '2',
      title: 'Second Item',
      Date: '2019 pts.',
      Name: 'Iman',
      type: 'sec',
      Icon: 'chevron-up',
      color: Colors.ThemeRed,
      colorType: 'winner',
      source: require('../../../assets/image/leader2.jpg'),
    },
    {
      id: '3',
      title: 'Third Item',
      Date: '2019 pts.',
      Name: 'Iman',
      type: 'third',
      Icon: 'minus',
      color: Colors.ThemeLightGreen,
      colorType: 'winner',
      source: require('../../../assets/image/leader3.jpg'),
    },
    {
      id: '4',
      title: 'Third Item',
      Date: '2019 pts.',
      Name: 'Iman',
      Icon: 'minus',
      color: Colors.ThemeLightGreen,
      source: require('../../../assets/image/dp.jpg'),
    },
    {
      id: '5',
      title: 'Third Item',
      Date: '2019 pts.',
      Name: 'Iman',
      Icon: 'minus',
      color: Colors.ThemeLightGreen,
      source: require('../../../assets/image/dp1.png'),
    },
    {
      id: '6',
      title: 'Third Item',
      Date: '2019 pts.',
      Name: 'Iman',
      Icon: 'minus',
      color: Colors.ThemeLightGreen,
      source: require('../../../assets/image/dp2.png'),
    },
  ];
  const Item = ({item}) => (
    <View
      style={[
        styles.Row,
        styles.container,
        {
          backgroundColor:
            item.type === 'first'
              ? Colors.Yellow
              : item.type === 'sec'
              ? '#F4F4F4'
              : item.type === 'third'
              ? Colors.ThemeOrange
              : 'transparent',
        },
      ]}>
      <View style={styles.Row}>
        <Entypo name={item.Icon} size={scale(20)} color={item.color} />
        <Text
          style={[
            styles.Text,
            {
              marginHorizontal: scale(5),
              color:
                item.colorType === 'winner' ? Colors.ThemeBlue : Colors.White,
            },
          ]}>
          {item.id}
        </Text>
        <View style={styles.imageBox}>
          <Image style={styles.Image} source={item.source} />
        </View>
        <Text
          style={[
            styles.Text,
            {
              color:
                item.colorType === 'winner' ? Colors.ThemeBlue : Colors.White,
            },
          ]}>
          {item.Name}
        </Text>
      </View>
      <Text
        style={[
          styles.Text,
          {
            color:
              item.colorType === 'winner' ? Colors.ThemeBlue : Colors.White,
          },
        ]}>
        {item.Date}
      </Text>
    </View>
  );
  return (
    <FlatList
      data={DATA}
      renderItem={Item}
      keyExtractor={item => item.id}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    justifyContent: 'space-between',
    alignSelf: 'center',
    paddingHorizontal: moderateScale(20),
    marginTop: verticalScale(20),
    paddingVertical: moderateVerticalScale(10),
    borderRadius: scale(17),
  },
  Row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  Image: {
    width: '100%',
    height: '100%',
    borderRadius: scale(100),
  },
  imageBox: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(100),
    marginHorizontal: scale(10),
  },
  Text: {
    fontFamily: Font.Nats,
    fontSize: scale(14),
  },
});
export default Month;
