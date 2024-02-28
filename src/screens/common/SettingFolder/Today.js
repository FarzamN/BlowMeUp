import {ScrollView} from 'react-native';
import React, {useCallback, useState} from 'react';

import {useFocusEffect} from '@react-navigation/native';
import {leaderboard} from '../../../redux/actions/UserAction';
import Loading from '../../../components/Modal/Loading';
import LeaderBoardCard from '../../../components/Card/LeaderBoardCard';
import LeaderBoardCrown from '../../../components/LeaderBoardCrown';
import IndicatorModal from '../../../components/Modal/IndicatorModal';
const Today = () => {
  const Days = 1;
  const [Load, setLoad] = useState(false);
  const [Data, setData] = useState('');
  console.log('Data', Data.top_user)

  useFocusEffect(
    useCallback(() => {
      leaderboard(setLoad, Days, setData);
    }, []),
  );

  return (
    <>

      {Data.top_user === undefined  ? (
        <IndicatorModal Visible={true} />
      ) : (
        <LeaderBoardCrown
          imgTwo={{uri:  Data?.top_user[1]?.image}}
          NameTwo={Data?.top_user[1]?.name}
          NumberTwo={Data?.top_user[1]?.type === 'second' ? 2 : null }
          LevelTwo={2}

          imgOne={{uri:  Data?.top_user[0]?.image}}
          NameOne={Data?.top_user[0]?.name}
          NumberOne={Data?.top_user[0]?.type === 'first' ? 1 : null }
          LevelOne={1}

          imgThree={{uri: Data?.top_user[2]?.image}}
          NumberThree={Data?.top_user[0]?.type === 'third' ? 3 : null }
          NameThree={Data?.top_user[2]?.name}
          LevelThree={3}
        />
      )}
    <ScrollView showsVerticalScrollIndicator={false}>
      {Data.top_user?.map((item,index) => {
        return (
          <>
            <LeaderBoardCard data={item} key={index}/>
          </>
        );
      })}
     
      {Data.user?.map((item,index) => {
        return (
          <>
            <LeaderBoardCard data={item} key={index}/>
          </>
        );
      })}
  </ScrollView>
      <Loading isVisible={Load} />
    </>
  );
};

export default Today;
