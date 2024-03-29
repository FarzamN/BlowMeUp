import {
  moderateScale,
  moderateVerticalScale,
  scale,
  verticalScale,
} from 'react-native-size-matters';
import { Colors } from '../utils/Colors';
import { Font } from '../utils/font';
import { StyleSheet } from 'react-native';

export const GlobalStyle = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: Colors.ThemeBlue,
  },
  CustomButtonRestyle: {
    backgroundColor: Colors.Non,
    borderColor: Colors.White,
    borderRadius: scale(30),
    marginTop: verticalScale(30),
    width: '85%',
    height: verticalScale(50),
  },
  Row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  showBar: {
    display: 'flex',
    backgroundColor: Colors.ThemeGrey,
    height: verticalScale(60),
    borderTopColor: Colors.ThemeGrey,
    position:'absolute',
    bottom:0
  },
  HideBar: {
    display: 'none',
  },
  ModalText: {
    fontSize: scale(16),
    textAlign: 'center',
    padding: moderateScale(20),
    fontFamily: Font.Gilroy600,
    color: Colors.ThemeBlue,
  },
  ModalContainer: {
    justifyContent: 'center',
    width: '70%',
    borderRadius: scale(10),
    backgroundColor: Colors.Main,
    alignSelf: 'center',
  },
  MainModal: {
    justifyContent: 'center',
    margin: 0,
  },
  ModalLine: {
    width: '20%',
    height: verticalScale(4),
    backgroundColor: Colors.Grey,
    alignSelf: 'center',
    borderRadius: scale(10),
    marginVertical: verticalScale(15),
  },
  SocialSignInButton: {
    borderWidth: 1,
    borderColor: Colors.White,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: verticalScale(20),
    paddingVertical: moderateVerticalScale(12),
    width: '70%',
    alignSelf: 'center',
    borderRadius: scale(25),
    flexDirection: 'row',
  },
  LottieView: {
    height: verticalScale(150),
    alignSelf: 'center',
  },
  UploadTitle: {
    color: Colors.White,
    fontFamily: Font.Gilroy500,
    fontSize: scale(16),
  },
  Image: {
    width: '100%',
    height: '100%',
  },
  Upload_Container: {
    height: '100%',
    marginHorizontal: scale(20),
  },
  UploadBtnStyle: {
    borderWidth: scale(1),
    borderColor: Colors.White,
    height: verticalScale(50),
    borderRadius: scale(20),
    justifyContent: 'flex-start',
    paddingHorizontal: moderateScale(25),
    marginTop: verticalScale(15),
    backgroundColor: Colors.Non,
    width: '95%',
  },
  UploadBtnTextStyle: {
    color: Colors.White,
    fontFamily: Font.Gilroy500,
    top: 0,
  },
  noGap: {
    paddingHorizontal: 0,
  },
  Move: {
    width: scale(10),
  },
  ArtistImage: {
    width: scale(140),
    height: scale(140),
    borderRadius: 360,
    marginLeft: scale(15),
  },
  HeaderSmallText: {
    fontFamily: Font.Poppins500,
    fontSize: scale(13),
  },
  UploadImageBox: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.White,
    borderRadius: scale(15),
  },
  UploadImagePrev: {
    color: Colors.White,
    fontFamily: Font.Poppins500,
  },
  boxStyles: {
    backgroundColor: 'transparent',
    height: verticalScale(50),
    alignItems: 'center',
    borderRadius: scale(20),
    marginTop: verticalScale(20),
    borderWidth: scale(1),
    borderColor: Colors.White,
  },
  inputStyles: {
    color: Colors.White,
    fontSize: scale(13),
    fontFamily: Font.Gilroy500,
  },
  dropdownTextStyles: {
    color: Colors.White,
  },
  dropdownItemStyles: {
    backgroundColor: Colors.ThemeBlue,
  },
  dropdownStyles: {
    backgroundColor: Colors.ThemeBlue,
    borderWidth: scale(1),
    borderColor: Colors.Main,
  },
});
