import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React from 'react';
import SectionCard from '../../../components/Card/SectionCard';
import {verticalScale} from 'react-native-size-matters';

const Video = () => {
  return (
    <View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <SectionCard
          Name="Olivia Mā Ddy"
          Time="52 minute ago"
          source={require('../../../assets/image/section1.jpg')}
          LongText="One good thing about music, when it hits you, you feel no pain. ❤️"
          Number="36"
          Avatar={require('../../../assets/image/dp1.png')}
        />
        <SectionCard
          Name="Prisha Mclaughlin"
          Time="52 minute ago"
          source={require('../../../assets/image/section2.jpg')}
          LongText="One good thing about music, when it hits you, you feel no pain. ❤️"
          Number="36"
          Avatar={require('../../../assets/image/dp2.png')}
        />
        <View style={{height: verticalScale(130)}} />
      </ScrollView>
    </View>
  );
};

export default Video;

const styles = StyleSheet.create({});
