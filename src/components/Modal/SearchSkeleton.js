import React from 'react';
import { moderateScale, moderateVerticalScale, scale, verticalScale } from 'react-native-size-matters';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { Colors } from '../../utils/Colors';
import { StyleSheet, View, ScrollView } from 'react-native';
import { GlobalStyle } from '../../Constants/GlobalStyle';
import ReactNativeModal from 'react-native-modal'
const SearchSkeleton = () => {

    return (
        <ReactNativeModal
            visible={true}
            style={[styles.modal, styles.Container]}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <SkeletonPlaceholder
                    speed={1350}
                    borderRadius={scale(10)}
                    highlightColor={Colors.Main}
                    backgroundColor={Colors.Ash}>
                    <SkeletonPlaceholder.Item marginTop={verticalScale(15)}>
                        <View style={GlobalStyle.Row}>
                            <SkeletonPlaceholder.Item
                                width="15%"
                                height={verticalScale(40)}
                            />
                            <SkeletonPlaceholder.Item
                                width="25%"
                                height={verticalScale(40)}
                                marginLeft={scale(10)}
                            />
                        </View>

                        <SkeletonPlaceholder.Item
                            width="100%"
                            height={verticalScale(75)}
                            marginTop={verticalScale(15)}
                        />
                        <SkeletonPlaceholder.Item
                            width="30%"
                            height={verticalScale(25)}
                            marginTop={verticalScale(10)}
                        />
                        <View style={GlobalStyle.Row}>
                            <SkeletonPlaceholder.Item
                                width={scale(140)}
                                aspectRatio={1 / 1}
                                marginVertical={verticalScale(20)}
                                marginHorizontal={scale(5)}
                            />
                            <SkeletonPlaceholder.Item
                                width={scale(140)}
                                aspectRatio={1 / 1}
                                marginVertical={verticalScale(20)}
                                marginHorizontal={scale(5)}
                            />
                        </View>
                        <View style={GlobalStyle.Row}>
                            <SkeletonPlaceholder.Item
                                width={scale(140)}
                                aspectRatio={1 / 1}
                                marginHorizontal={scale(5)}
                            />
                            <SkeletonPlaceholder.Item
                                width={scale(140)}
                                aspectRatio={1 / 1}
                                marginHorizontal={scale(5)}
                            />
                        </View>
                        <SkeletonPlaceholder.Item
                            width="30%"
                            height={verticalScale(25)}
                            marginTop={verticalScale(15)}
                        />
                        <SkeletonPlaceholder.Item
                            width="100%"
                            height={verticalScale(85)}
                            marginTop={verticalScale(15)}
                            borderRadius={scale(15)}
                        />
                        <SkeletonPlaceholder.Item
                            width="30%"
                            height={verticalScale(25)}
                            marginTop={verticalScale(15)}
                        />
                        <View style={[GlobalStyle.Row, { marginTop: verticalScale(20) }]}>
                            <SkeletonPlaceholder.Item
                                width={scale(140)}
                                aspectRatio={1 / 1}
                                marginLeft={scale(5)}
                                borderRadius={360}
                            />
                            <SkeletonPlaceholder.Item
                                width={scale(140)}
                                aspectRatio={1 / 1}
                                marginLeft={scale(5)}
                                borderRadius={360}
                            />

                        </View>
                    </SkeletonPlaceholder.Item>
                </SkeletonPlaceholder>
                <View style={{ height: verticalScale(20) }} />
            </ScrollView>
        </ReactNativeModal>
    )
}
const styles = StyleSheet.create({
    modal: {
        margin: 0,
        paddingHorizontal: moderateScale(20)
    },
    Container: {
        backgroundColor: Colors.ThemeBlue,
        justifyContent: 'flex-start',
        paddingTop: moderateVerticalScale(15)
    }
})

export default SearchSkeleton
