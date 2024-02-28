import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {GlobalStyle} from '../../Constants/GlobalStyle';
import {scale} from 'react-native-size-matters';
import { Colors } from '../../utils/Colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const UploadHeader = ({title, source,icon}) => {
  return (
    <>
      <View style={[GlobalStyle.Row, styles.Row]}>
        <Text style={GlobalStyle.UploadTitle}>Upload {title}</Text>
        {icon ? (
          <MaterialIcons name="audiotrack" size={24} color={Colors.Main} />
        ) : (
          <Image resizeMode="contain" style={styles.Image} source={source} />
        )}
      </View>
    </>
  );
};

export default UploadHeader;

const styles = StyleSheet.create({
  Image: {
    width: scale(25),
    height: scale(25),
  },
  Row: {
    justifyContent: 'space-between',
    marginRight: scale(20),
  },
});
