import {  Text } from 'react-native'
import React from 'react'
import { GlobalStyle } from '../Constants/GlobalStyle'

const Validation = ({restyle,title}) => {
  return (
    <Text style={[GlobalStyle.error, restyle]}>{title} </Text>
  )
}

export default Validation
