import {FlatList, View} from 'react-native';
import React from 'react';
import SectionCard from '../../../components/Card/SectionCard';

const Video = () => {
  const VideoData = [
    {
      Name:"Olivia Mā Ddy",
          Time:"52 minute ago",
          source:require('../../../assets/image/section1.jpg'),
          LongText:"One good thing about music, when it hits you, you feel no pain. ❤️",
          Number:"36",
          avatar:require('../../../assets/image/dp1.png'),
    },
    {
      Name:"Olivia Mā Ddy",
      Time:"52 minute ago",
      source:require('../../../assets/image/section1.jpg'),
      LongText:"One good thing about music, when it hits you, you feel no pain. ❤️",
      Number:"36",
      avatar:require('../../../assets/image/dp1.png')
    },
    {
      Name:"Olivia Mā Ddy",
          Time:"52 minute ago",
          source:require('../../../assets/image/section1.jpg'),
          LongText:"One good thing about music, when it hits you, you feel no pain. ❤️",
          Number:"36",
          avatar:require('../../../assets/image/dp1.png')
    },
  ];
  return (
    <View>
      <FlatList
          scrollEnabled={true}
          showsVerticalScrollIndicator={false}
          data={VideoData}
          renderItem={({item}) => {
            return <SectionCard data={item} />;
          }}
        />
    </View>
  );
};

export default Video;

