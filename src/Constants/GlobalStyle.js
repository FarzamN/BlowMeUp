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
}