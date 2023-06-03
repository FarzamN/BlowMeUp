import { scale, verticalScale } from "react-native-size-matters";
import { Colors } from "../utils/Colors";
import { Font } from "../utils/font";

export const GlobalStyle = {
    error: {
        color: Colors.Danger,
        fontSize: scale(14),
        marginLeft: scale(10),
        marginBottom: verticalScale(-5),
        fontFamily:Font.NunitoSans700,
        letterSpacing:-1.2
      },
      CustomButtonRestyle: {
        backgroundColor: 'transparent',
        borderColor: Colors.White,
        borderRadius: scale(30),
        marginTop: verticalScale(30),
        width: '85%',
        height: verticalScale(50),
      },
      Row:{
        flexDirection: 'row',
        alignItems: 'center',
      },
      showBar:{
        display: 'flex',
        backgroundColor: Colors.ThemeGrey,
          height: verticalScale(60),
          borderTopColor: Colors.ThemeGrey,
      },
      HideBar:{
        display:'none'
      }
}