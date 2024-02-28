import React from 'react'
import { StyleSheet, View, Dimensions, StatusBar, TouchableOpacity, Text, Platform } from 'react-native'
import { moderateVerticalScale, scale } from 'react-native-size-matters';
import Modal from 'react-native-modal';
import ImageViewer from 'react-native-image-zoom-viewer';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Colors } from '../../utils/Colors';
import { GlobalStyle } from '../../Constants/GlobalStyle';
import { Font } from '../../utils/font';


const { width, height } = Dimensions.get('window')

const ImageViewModal = ({ isVisible, onClose, images, title, isTitle }) => {
    return (

        <Modal swipeDirection='down' onSwipeComplete={onClose} isVisible={isVisible} style={GlobalStyle.MainModal}>
            <View style={styles.ModalContainer}>
                <TouchableOpacity style={styles.IconBox} onPress={onClose}>
                    <Ionicons name='close' size={scale(15)} color={Colors.Black} />
                </TouchableOpacity>
                <View style={styles.imageBox}>
                    <ImageViewer
                        imageUrls={[{ url: images }]}
                        enableSwipeDown
                        onSwipeDown={onClose}
                        saveToLocalByLongPress
                        renderIndicator={() => null}
                    />
                </View>
                {isTitle && <View style={styles.TitleBox}>
                    <Text style={styles.TitleText}>{title}</Text>
                </View>}
            </View>
        </Modal>
    )
}
const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: '100%',
    },
    imageBox: {
        width: width,
        height: height
    },
    IconBox: {
        right: scale(20),
        position: 'absolute',
        top: Platform.OS == 'android' ? StatusBar.currentHeight : 70,
        zIndex: 99,
        backgroundColor: Colors.White,
        borderRadius: 100,
        width: scale(20),
        height: scale(20),
        justifyContent: 'center',
        alignItems: 'center'
    },
    ModalContainer: {
        justifyContent: 'center',
        borderRadius: scale(10),
        backgroundColor: Colors.Black,
        alignSelf: 'center',
    },
    TitleBox: {
        backgroundColor: Colors.Ash,
        paddingVertical: moderateVerticalScale(10),
        position: 'absolute',
        bottom: 0,
        alignSelf: 'center',
        width: '100%'
    },
    TitleText: {
        color: Colors.White,
        fontFamily: Font.Gilroy600,
        fontSize: scale(15),
        textAlign: 'center',
        textAlignVertical: 'center'
    }
})

export default ImageViewModal
