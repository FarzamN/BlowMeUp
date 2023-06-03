import React, {useCallback, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
  Pressable,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import {Colors} from '../../utils/Colors';
import {Controller, useForm} from 'react-hook-form';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {Font} from '../../utils/font';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {GlobalStyle} from '../../Constants/GlobalStyle';
import {useFocusEffect} from '@react-navigation/native';
import RecentSong from '../../components/Card/RecentSong';
const SearchScreen = ({navigation}) => {
  const [searchValue, setSearchValue] = useState('');
  // const [searchQuery, setSearchQuery] = useState();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: '',
  });
  const onSubmit = data => console.log(data);
  useFocusEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useCallback(() => {
      navigation.getParent()?.setOptions({
        tabBarStyle: GlobalStyle.HideBar,
      });
    }),
  );
  const params = [
    {
      id: 1,
      title: 'First Item',
      source: require('../../assets/image/album3.jpg'),
      Value: 'Song',
      Singer: 'FIFTY FIFTY',
    },
    {
      id: 2,
      title: 'Second Item',
      source: require('../../assets/image/album2.jpg'),
      Value: 'Song',
      Singer: 'FIFTY FIFTY',
    },
    {
      id: 4,
      title: 'Third Item',
      source: require('../../assets/image/album1.jpg'),
      Value: 'Song',
      Singer: 'FIFTY FIFTY',
    },
    {
      id: 5,
      title: 'First Item',
      source: require('../../assets/image/album3.jpg'),
      Value: 'Song',
      Singer: 'FIFTY FIFTY',
    },
    {
      id: 6,
      title: 'Second Item',
      source: require('../../assets/image/album2.jpg'),
      Value: 'Song',
      Singer: 'FIFTY FIFTY',
    },
    {
      id: 7,
      title: 'Third Item',
      source: require('../../assets/image/album1.jpg'),
      Value: 'Song',
      Singer: 'FIFTY FIFTY',
    },
    {
      id: 8,
      title: 'First Item',
      source: require('../../assets/image/album3.jpg'),
      Value: 'Song',
      Singer: 'FIFTY FIFTY',
    },
    {
      id: 9,
      title: 'Second Item',
      source: require('../../assets/image/album2.jpg'),
      Value: 'Song',
      Singer: 'FIFTY FIFTY',
    },
    {
      id: 10,
      title: 'Third Item',
      source: require('../../assets/image/album1.jpg'),
      Value: 'Song',
      Singer: 'FIFTY FIFTY',
    },
    {
      id: 11,
      title: 'First Item',
      source: require('../../assets/image/album3.jpg'),
      Value: 'Song',
      Singer: 'FIFTY FIFTY',
    },
    {
      id: 12,
      title: 'Second Item',
      source: require('../../assets/image/album2.jpg'),
      Value: 'Song',
      Singer: 'FIFTY FIFTY',
    },
    {
      id: 13,
      title: 'Third Item',
      source: require('../../assets/image/album1.jpg'),
      Value: 'Song',
      Singer: 'FIFTY FIFTY',
    },
    {
      id: 14,
      title: 'First Item',
      source: require('../../assets/image/album3.jpg'),
      Value: 'Song',
      Singer: 'FIFTY FIFTY',
    },
    {
      id: 15,
      title: 'Second Item',
      source: require('../../assets/image/album2.jpg'),
      Value: 'Song',
      Singer: 'FIFTY FIFTY',
    },
    {
      id: 16,
      title: 'Third Item',
      source: require('../../assets/image/album1.jpg'),
      Value: 'Song',
      Singer: 'FIFTY FIFTY',
    },
  ];

  return (
    <>
      <SafeAreaView style={{backgroundColor: Colors.Ash}} />
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <StatusBar backgroundColor={Colors.Ash} barStyle={'light-content'} />
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, searchvalue}}) => (
              <View style={styles.InputBox}>
                <View style={GlobalStyle.Row}>
                  <AntDesign
                    name="arrowleft"
                    color={Colors.White}
                    size={scale(22)}
                    onPress={() => navigation.goBack()}
                  />
                  <TextInput
                    style={styles.Input}
                    placeholderTextColor="#A9A9A9"
                    placeholder="Artists, Songs or Live Streams"
                    // onBlur={onBlur}
                    onChangeText={onSubmit}
                    // value={searchValue}
                    // autoFocus
                  />
                </View>
                {/* {searchValue.length >= 1 ? (
                  <Pressable
                    style={{
                      alignSelf: 'center',
                    }}
                    onPress={() => setSearchValue('')}>
                    <Ionicons
                      name="close-circle"
                      color={Colors.White}
                      size={scale(22)}
                    />
                  </Pressable>
                ) : null} */}
              </View>
            )}
            name="search"
          />
          <ScrollView style={{flex:1}}>
          <Text style={styles.Recent}>Recent Searches</Text>
          {params?.map(item => {
            return <RecentSong Data={item} key={item.id} />;
          })}
          <TouchableOpacity style={{marginTop: verticalScale(10)}}>
            <Text style={styles.Recent}>Clear recent search</Text>
          </TouchableOpacity>
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.ThemeBlue,
  },
  InputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.Ash,
    height: verticalScale(55),
    paddingHorizontal: moderateScale(15),
    shadowColor: '#fff',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    justifyContent: 'space-between',
  },
  Input: {
    marginLeft: scale(7),
    width: '100%',
    color: Colors.White,
    fontFamily: Font.Inter400,
    fontSize: scale(14),
  },
  Recent: {
    fontSize: scale(14),
    fontFamily: Font.Gilroy600,
  },
});
export default SearchScreen;
