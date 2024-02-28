import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  FlatList
} from 'react-native';
import React, { useCallback, useState } from 'react';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import LinearGradient from 'react-native-linear-gradient';
import { SwipeListView } from 'react-native-swipe-list-view';
import Feather from 'react-native-vector-icons/Feather';
import { useFocusEffect } from '@react-navigation/native';
import moment from 'moment';
import { GlobalStyle } from '../../Constants/GlobalStyle';
import { Notification, ReadNotification } from '../../redux/actions/UserAction';
import { Colors } from '../../utils/Colors';
import MainHeader from '../../components/Header/MainHeader';
import { Font } from '../../utils/font';
import EmptyCard from '../../components/Card/EmptyCard';
import ConnectionModal from '../../components/Modal/ConnectionModal';
import AlertLoader from '../../components/Modal/AlertLoader';
import { GeneratoinItem } from '../../Constants/SongData';

const Alert = ({ navigation }) => {
  const [notification, setNotification] = useState('');
  const [load, setLoad] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  useFocusEffect(
    useCallback(() => {
      navigation.getParent()?.setOptions({
        tabBarStyle: GlobalStyle.HideBar,
      });
      Notification(setNotification, setLoad);
    }, []),
  );
  const Read = item => {
    ReadNotification(item);
    Notification(setNotification, setLoad);
  };

  const onRefresh = () => {
    setRefreshing(true);
    Notification(setNotification, setLoad);
    setRefreshing(false);
  };
  const Item = ({ data }) => (
    <View style={[styles.Main, GlobalStyle.Row]}>
      <View style={styles.ImageBox}>
        <Image
          style={[GlobalStyle.Image, { borderRadius: 100 }]}
          resizeMode="cover"
          source={{ uri: data.image }}
        />
      </View>
      <View style={{ marginHorizontal: scale(15) }}>
        <View style={GlobalStyle.Row}>
          <Text style={styles.Name}>{data.name}</Text>
          <Text style={styles.About}>{data.notification}</Text>
        </View>
        <Text style={styles.Time}>
          {moment(data.updated_at).startOf('hour').fromNow()}
        </Text>
      </View>
    </View>
  );
  return (
    <SafeAreaView style={GlobalStyle.Container}>
      <MainHeader NoSearch BackArrow Title Text="Notifications" />
      <View
        style={{
          marginBottom: scale(70),
        }}>
        {load ? (
          <FlatList
            data={GeneratoinItem}
            renderItem={() => <AlertLoader />}
          />
        ) : (
          <SwipeListView
            onRefresh={onRefresh}
            refreshing={refreshing}
            data={notification}
            ListEmptyComponent={() => {
              return <EmptyCard />;
            }}
            scrollEnabled
            showsVerticalScrollIndicator={false}
            style={{ height: '100%' }}
            renderItem={({ item }) => <Item data={item} />}
            renderHiddenItem={({ item }) => (
              <View style={styles.rowBack}>
                <LinearGradient
                  colors={['#FF6B00', '#CD2828']}
                  style={{ borderRadius: scale(10) }}>
                  <TouchableOpacity
                    onPress={() => Read(item)}
                    style={styles.IconBox}>
                    <Feather name="check" size={scale(22)} color={Colors.White} />
                    <Text style={styles.Read}>Read</Text>
                  </TouchableOpacity>
                </LinearGradient>
              </View>
            )}
            swipeDirection={'right'}
            disableRightSwipe
            rightOpenValue={scale(-95)}
          />
        )}

      </View>
      <ConnectionModal />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  Main: {
    paddingHorizontal: moderateScale(10),
    height: scale(80),
    backgroundColor: '#fff',
    marginBottom: verticalScale(20),
    borderRadius: scale(10),
    width: '90%',
    alignSelf: 'center',
  },
  rowBack: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginRight: '7%',
  },
  IconBox: {
    width: scale(80),
    height: scale(80),
    justifyContent: 'center',
    alignItems: 'center',
  },
  ImageBox: {
    width: scale(45),
    height: scale(45),
    borderRadius: 100,
  },
  Name: {
    fontFamily: Font.Poppins500,
    fontSize: scale(12),
    color: '#1A1B23',
  },
  About: {
    fontFamily: Font.Poppins400,
    fontSize: scale(12),
    color: '#676767',
    marginLeft: scale(5),
  },
  Time: {
    fontFamily: Font.Poppins400,
    fontSize: scale(11),
    color: '#919191',
  },
  Image: {
    width: '100%',
    height: '100%',
  },
  Read: {
    fontFamily: Font.Poppins400,
    fontSize: scale(11),
    color: Colors.White,
  },
});

export default Alert;

// import { Dimensions, SafeAreaView, StyleSheet, Text, View } from 'react-native';
// import React, { useCallback } from 'react';
// import { Colors } from '../../utils/Colors';
// import MainHeader from '../../components/Header/MainHeader';
// import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
// import { Font } from '../../utils/font';
// import { useFocusEffect } from '@react-navigation/native';
// import { GlobalStyle } from '../../Constants/GlobalStyle';

// const fontScale = Dimensions.get('window').fontScale;
// const Alert = ({ navigation }) => {
//   useFocusEffect(
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     useCallback(() => {
//       navigation.getParent()?.setOptions({
//         tabBarStyle: GlobalStyle.HideBar
//       })
//     }),
//   )
//   return (
//     <SafeAreaView style={GlobalStyle.Container}>
//       <MainHeader BackArrow />
//       <View style={{ paddingHorizontal: moderateScale(20) }}>
//         <Text style={styles.Heading}>What&apos;s new</Text>
//         <Text
//           style={[
//             styles.Heading,
//             {
//               fontSize: scale(13),
//               fontFamily: Font.Gilroy500,
//               marginTop: verticalScale(5),
//             },
//           ]}>
//           The Latest release from Artists, podcasts and shows you follow
//         </Text>
//         <View
//           style={{
//             justifyContent: 'center',
//             alignItems: 'center',
//             height: '80%',
//           }}>
//           <Text
//             style={[
//               styles.Heading,
//               {
//                 textAlign: 'center',
//                 fontSize: scale(17),
//                 fontFamily: Font.Gilroy700,
//               },
//             ]}>
//             We currently do not have any thing new for you
//           </Text>

//           <Text style={styles.lastText}>
//             When There is news, we will post it here. {`\n`}
//             Follow your favorite artists and podcasts to stay updated on them
//             too.
//           </Text>
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// };
// const styles = StyleSheet.create({
//   Heading: {
//     color: Colors.White,
//     fontSize: scale(30),
//     fontFamily: Font.Gilroy700,
//   },
//   lastText: {
//     textAlign: 'center',
//     fontSize: fontScale * scale(12),
//     fontFamily: Font.Gilroy700,
//     marginTop: '10%',
//     marginHorizontal: scale(20),
//     color: Colors.White,
//   },
// });
// export default Alert;
