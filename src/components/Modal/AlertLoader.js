import React from 'react';
import { scale, verticalScale } from 'react-native-size-matters';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { Colors } from '../../utils/Colors';

const AlertLoader = () => {
    return (
        <SkeletonPlaceholder
            speed={1350}
            borderRadius={scale(20)}
            highlightColor={Colors.Main}
            backgroundColor={Colors.Ash}>
            <SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
                <SkeletonPlaceholder.Item
                    width={'90%'}
                    height={verticalScale(70)}
                    marginLeft={scale(20)}
                    marginRight={0}
                    marginTop={verticalScale(15)}
                    borderRadius={10}
                />
            </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder>
    )
}

export default AlertLoader
