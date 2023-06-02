import React, {useState} from 'react';
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
} from 'react-native';
import {Colors} from '../../utils/Colors';
import {Controller, useForm} from 'react-hook-form';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {Font} from '../../utils/font';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {GlobalStyle} from '../../Constants/GlobalStyle';
const SearchScreen = ({navigation}) => {
  const [searchValue, setSearchValue] = useState([]);
  // const [searchQuery, setSearchQuery] = useState();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: '',
  });
  const onSubmit = data => console.log(data);
  return (
    <>
      <SafeAreaView style={{backgroundColor: Colors.Ash}} />
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <StatusBar backgroundColor={Colors.Ash} barStyle={'light-content'} />
          {/* <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, searchvalue}}) => ( */}
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
              />
            </View>
            {/* {searchValue.length >= 1 ? ( */}
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
            {/* ) : null}  */}
          </View>
          {/* )}
            name="search"
          /> */}
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
});
export default SearchScreen;
