import {ScrollView} from 'react-native';
import React, {useState, useCallback} from 'react';

import Loading from '../../../components/Modal/Loading';
import {useFocusEffect} from '@react-navigation/native';
import {leaderboard} from '../../../redux/actions/UserAction';
import LeaderBoardCard from '../../../components/Card/LeaderBoardCard';

const Month = () => {
  const Days = 7;
  const [Load, setLoad] = useState(false);
  const [Data, setData] = useState('');

  useFocusEffect(
    useCallback(() => {
      leaderboard(setLoad, Days, setData);
    }, []),
  );

  return (
    <>
<ScrollView showsVerticalScrollIndicator={false}>
      {Data.top_user?.map(item => {
        return (
          <>
            <LeaderBoardCard data={item} key={Data.id}/>
          </>
        );
      })}
     
      {Data.user?.map(item => {
        return (
          <>
            <LeaderBoardCard data={item} key={Data.id}/>
          </>
        );
      })}
  </ScrollView>
      <Loading isVisible={Load} />
    </>
  );
};

export default Month;
