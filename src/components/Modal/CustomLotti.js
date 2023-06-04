import { StyleSheet, Text, SafeAreaView } from 'react-native'
import React from 'react'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { Colors } from '../../utils/Colors'
import { Font } from '../../utils/font'
import Modal from 'react-native-modal';
import LottieView from 'lottie-react-native';

const CustomLotti = ({ visible, Title, source, Title2, TitleTrue, TextRestyle }) => {
    return (
        <Modal
            visible={visible}
            style={styles.modal}>
            <SafeAreaView style={styles.buttons}>
                <LottieView
                    autoPlay
                    style={{ height: verticalScale(150), alignSelf: 'center' }}
                    source={source}
                />
                <Text style={[styles.text, TextRestyle]}>
                    {Title}
                </Text>
                {TitleTrue ? <Text style={[styles.text, { padding: 0, }]}>
                    {Title2}
                </Text> : null}

            </SafeAreaView>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modal: {
        justifyContent: 'center',
        margin: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
    },
    buttonIcon: {
        alignSelf: 'center',
    },
    buttons: {
        justifyContent: 'center',
        // height: '35%',
        width: '70%',
        borderRadius: scale(10),
        backgroundColor: Colors.Main,
        alignSelf: 'center',
    },
    text: {
        fontSize: scale(16),
        textAlign: 'center',
        padding: moderateScale(20),
        fontFamily: Font.Gilroy600,
    },
})
export default CustomLotti
