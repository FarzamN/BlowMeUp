import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { Colors } from "../utils/Colors";
import { Font } from "../utils/font"

export const GlobalStyle = {
  Container: {
    flex: 1,
    backgroundColor: Colors.ThemeBlue
  },
  error: {
    color: Colors.Danger,
    fontSize: scale(14),
    marginLeft: scale(10),
    marginBottom: verticalScale(-5),
    fontFamily: Font.NunitoSans700,
    letterSpacing: -1.2
  },
  CustomButtonRestyle: {
    backgroundColor: 'transparent',
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
  },
  HideBar: {
    display: 'none'
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
    backgroundColor: 'rgba(0, 0, 0, 0.8)'
  }
}