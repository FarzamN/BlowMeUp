import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import MainHeader from '../../../components/Header/MainHeader';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {Colors} from '../../../utils/Colors';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Zocial from 'react-native-vector-icons/Zocial';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Font} from '../../../utils/font';
import CustomButton from '../../../components/CustomButton';
import CustomInput from '../../../components/CustomInput';
import {useForm} from 'react-hook-form';

const Profile = ({navigation}) => {
  const {
    control,
    handleSubmit,
    formState: {errors, isValid},
  } = useForm({mode: 'all'});
  const [edit, setEdit] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [showForName,setShowForName] = useState(false)

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={Colors.ThemeBlue} />
      <MainHeader
        edit={true}
        BackArrow={true}
        Title={true}
        Text={!edit ? 'Profile' : 'Edit Profile'}
        editText={!edit ? 'Edit' : 'Cancel'}
        editOnPress={() => {
          setEdit(!edit);
          setShowInput(false);
        }}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.ImageBox}>
          <Image
            style={styles.Image}
            resizeMode="contain"
            source={require('../../../assets/image/dp.jpg')}
          />
        </View>

        <View
          style={[
            styles.Row,
            {justifyContent: 'center', marginTop: verticalScale(10)},
          ]}>
          <Text style={styles.Name}>Beverly_Salas96</Text>
          {!edit ? null : (
            <TouchableOpacity activeOpacity={0.6}>
              <FontAwesome5 name="edit" color={Colors.White} size={scale(20)} />
            </TouchableOpacity>
          )}
        </View>
        
        <View style={[styles.Row, styles.margins]}>
          <View style={styles.Row}>
            <FontAwesome5
              name="user-alt"
              size={scale(20)}
              color={Colors.White}
            />
            {showInput == true ? (
              <CustomInput
              Hello={styles.CustomInputRestyle}
              Gapp={styles.Gapp}
                control={control}
                keyboardType="default"
                name="name"
                placeholder="Enter Your Name"
                defaultValue='Beverly Salas'
                value='Beverly Salas'
              />
            ) : (
              <Text style={styles.Text}>Beverly Salas</Text>
            )}
          </View>
          {showInput == false ? (
            !edit ? null : (
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => setShowInput(true)}>
                <FontAwesome5
                  name="edit"
                  color={Colors.White}
                  size={scale(20)}
                />
              </TouchableOpacity>
            )
          ) : null}
        </View>

        <View style={[styles.Row, styles.margins]}>
          <View style={styles.Row}>
          <Zocial name="email" size={scale(20)} color={Colors.White} />
            {showInput == true ? (
              <CustomInput
              Hello={styles.CustomInputRestyle}
              Gapp={styles.Gapp}
                control={control}
                keyboardType="email-address"
                name="email"
                placeholder="Enter Your Email"
                defaultValue='beverlysalas96@gmail.com'
                value='beverlysalas96@gmail.com'
              />
            ) : (
              <Text style={styles.Text}>beverlysalas96@gmail.com</Text>
            )}
          </View>
          {showInput == false ? (
            !edit ? null : (
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => setShowInput(true)}>
                <FontAwesome5
                  name="edit"
                  color={Colors.White}
                  size={scale(20)}
                />
              </TouchableOpacity>
            )
          ) : null}
        </View>

        <View style={[styles.Row, styles.margins]}>
          <View style={styles.Row}>
          <FontAwesome5
              name="phone-alt"
              size={scale(20)}
              color={Colors.White}
            />
            {showInput == true ? (
              <CustomInput
              Hello={styles.CustomInputRestyle}
              Gapp={styles.Gapp}
                control={control}
                keyboardType="number-pad"
                name="Phone"
                placeholder="Enter Phone Number"
                defaultValue='303-496-6102'
                value='303-496-6102'
              />
            ) : (
              <Text style={styles.Text}>303-496-6102</Text>
            )}
          </View>
          {showInput == false ? (
            !edit ? null : (
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => setShowInput(true)}>
                <FontAwesome5
                  name="edit"
                  color={Colors.White}
                  size={scale(20)}
                />
              </TouchableOpacity>
            )
          ) : null}
        </View>
        <View style={[styles.Row, styles.margins]}>
          <View style={styles.Row}>
          <Ionicons
              name="md-location-sharp"
              size={scale(20)}
              color={Colors.White}
            />
            {showInput == true ? (
              <CustomInput
              Hello={styles.CustomInputRestyle}
              Gapp={styles.Gapp}
                control={control}
                keyboardType="default"
                name="address"
                placeholder="Enter Your Address"
                defaultValue='2140 Scheuvront Drive, Englewood, Colorado, United States.'
                value='2140 Scheuvront Drive, Englewood, Colorado, United States.'
              />
            ) : (
              <Text style={styles.Text}>
              2140 Scheuvront Drive, Englewood, Colorado, United States.
            </Text>
            )}
          </View>
          {showInput == false ? (
            !edit ? null : (
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => setShowInput(true)}>
                <FontAwesome5
                  name="edit"
                  color={Colors.White}
                  size={scale(20)}
                />
              </TouchableOpacity>
            )
          ) : null}
        </View>
        {!edit ? null : (
          <CustomButton
            title="Save Changes"
            containerStyle={{
              marginTop: verticalScale(40),
              height: verticalScale(60),
            }}
          />
        )}
        <View style={{height: verticalScale(10)}} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.ThemeBlue,
  },
  Row: {flexDirection: 'row', alignItems: 'center'},
  Image: {
    width: '100%',
    height: '100%',
    borderRadius: scale(100),
  },
  ImageBox: {
    width: scale(130),
    aspectRatio: 1 / 1,
    borderRadius: scale(100),
    alignSelf: 'center',
    borderWidth: scale(2),
    borderColor: '#4F5565',
  },
  Name: {
    color: Colors.White,
    fontFamily: Font.Poppins600,
    fontSize: scale(20),
    paddingRight: scale(10),
    top: verticalScale(3),
  },
  Text: {
    color: Colors.White,
    fontFamily: Font.Gilroy500,
    fontSize: scale(14),
    marginLeft: scale(20),
    marginRight: scale(10),
  },
  margins: {
    marginTop: verticalScale(40),
    marginLeft: scale(20),
    marginRight: scale(60),
  },
  CustomInputRestyle:{
    borderWidth:0,
    borderBottomWidth:1,
    borderBottomColor:Colors.White,
    borderRadius:0,
    width:'90%',
    marginTop: verticalScale(-10),
    marginLeft:scale(15),
    paddingHorizontal: 0,
    height: verticalScale(40),
  },
  Gapp:{
    paddingHorizontal: moderateScale(5),
  }
});
export default Profile;
