import React from 'react';
import {Image} from 'react-native';

const LogoCard = ({style}) => {
  return (
    <Image
      style={[{alignSelf: 'center', marginTop: '12%'}, style]}
      source={require('../../assets/image/logo.png')}
    />
  );
};

export default LogoCard;
