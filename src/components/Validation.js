import { Text, StyleSheet } from 'react-native';
import React from 'react';
import { scale, verticalScale } from 'react-native-size-matters';
import { Font } from '../utils/font';

const Validation = ({ restyle, title, space }) => {
  return <Text style={[styles.error, restyle, { marginLeft: space ? '15%' : scale(10), marginTop: space ? verticalScale(10) : 0 }]}>{title} </Text>;
};

const styles = StyleSheet.create({
  error: {
    color: 'red',
    fontSize: scale(14),
    marginBottom: verticalScale(-5),
    fontFamily: Font.NunitoSans700,
    letterSpacing: -1.2,
  },
});

export default Validation;
