import { StyleSheet, View, SafeAreaView } from 'react-native';
import React, { useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { GlobalStyle } from '../../../Constants/GlobalStyle';
import { GenreData } from '../../../Constants/SongData';
import GernCard from '../../../components/Card/GernCard';
import { moderateScale } from 'react-native-size-matters';
import MainHeader from '../../../components/Header/MainHeader';
import ConnectionModal from '../../../components/Modal/ConnectionModal';

const Genre = ({ navigation }) => {
  useFocusEffect(
    useCallback(() => {
      navigation.getParent()?.setOptions({
        tabBarStyle: GlobalStyle.HideBar,
      });
    }, []),
  );



  return (
    <SafeAreaView style={GlobalStyle.Container}>
      <MainHeader Notification BackArrow Title Text="Genre" />
      <View style={styles.Container}>
        {GenreData.map((item, index) => {
          return (
            <>
              <GernCard
                boxRestyle={{
                  width: '45%',
                }}
                key={index}
                data={item}
                onPress={() => navigation.navigate('PopularSong', { item: item })}
              />
            </>
          );
        })}
      </View>
      <ConnectionModal />
    </SafeAreaView>
  );
};

export default Genre;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: moderateScale(15),
    marginLeft: '5%',
  },
});
