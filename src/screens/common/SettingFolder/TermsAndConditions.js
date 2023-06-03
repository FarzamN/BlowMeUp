import React, { useCallback } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
} from 'react-native';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';

import CustomButton from '../../../components/CustomButton';
import {Colors} from '../../../utils/Colors';
import {Font} from '../../../utils/font';
import MainHeader from '../../../components/Header/MainHeader';
import { useFocusEffect } from '@react-navigation/native';
import { GlobalStyle } from '../../../Constants/GlobalStyle';

const TermsAndConditions = ({navigation,route}) => {
  const Type = route.params.type

    const onSubmit = () => {
      navigation.goBack()
      // if (Type == 'auth') {
      //   navigation.goBack()
      // } else {
      //   navigation.navigate('Setting')
      // }
    }
    useFocusEffect(
      // eslint-disable-next-line react-hooks/exhaustive-deps
      useCallback(() => {
        navigation.getParent()?.setOptions({
          tabBarStyle: GlobalStyle.HideBar
        })
      }),
    )
  return (
    <SafeAreaView style={styles.Container}>
      <View style={{marginTop: Type == 'auth' ? '10%' : 0}}>
        <MainHeader
          Notification={false}
          BackArrow={true}
          Title={true}
          Text="Terms and Conditions"
        />
      </View>
      <View style={styles.firstView}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              height: verticalScale(100),
              width: '80%',
              alignSelf: 'center',
              // marginTop: scale(30),
            }}>
            <Image
              source={require('../../../assets/image/logo.png')}
              style={styles.logo}
            />
          </View>
          <Text style={styles.accept}>Terms and Condition</Text>
          <Text style={styles.lorem}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry&asp;s standard dummy
            text ever since the 1500s, when an unknown printer took a galley of
            type and scrambled it to make a type specimen book. It has survived
            not only five centuries, but also the leap into electronic
            typesetting, remaining essentially unchanged. It was popularized in
            the 1960s with the release of Letraset sheets containing Lorem Ipsum
            passages, and more recently with desktop publishing software like
            Aldus PageMaker including versions of Lorem Ipsum. A Terms and
            Conditions agreement acts as a legal contract between you (the
            company) and the user. It&asp;s where you maintain your rights to
            exclude users from your app in the event that they abuse your
            website/app, set out the rules for using your service and note other
            important details and disclaimers. Your Terms and Conditions
            agreement will be uniquely yours. While some clauses are standard
            and commonly seen in pretty much every Terms and Conditions
            agreement, it&asp;s up to you to set the rules and guidelines that the
            user must agree to. Terms and Conditions agreements are also known
            as Terms of Service or Terms of Use agreements. These terms are
            interchangeable, practically speaking. You can use this agreement
            anywhere, regardless of what platform your business operates on:
            Websites WordPress blogs or blogs on any kind of platform: Joomla!,
            Drupal etc. Ecommerce stores Mobile apps Facebook apps Desktop apps
            SaaS apps Desktop apps usually have an EULA (End-User License
            Agreement) instead of a Terms and Conditions agreement, but your
            business can use both. Mobile apps are increasingly using Terms and
            Conditions along with an EULA if the mobile app has an online
            service component, i.e. it connects with a server.
          </Text>
          <CustomButton
            onPress={onSubmit}
            title="Accept and Continue"
            containerStyle={{
              width: '85%',
              alignSelf: 'center',
              marginBottom: verticalScale(20)
            }}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: Colors.ThemeBlue,
  },
  logo: {
    resizeMode: 'contain',
    width: '100%',
    height: '100%',
  },
  accept: {
    textAlign: 'center',
    fontSize: scale(25),
    color: Colors.White,
    fontFamily: Font.Gilroy700,
  },

  lorem: {
    textAlign: 'center',
    marginHorizontal: scale(15),
    marginTop: scale(10),
    color: Colors.White,
    fontSize: scale(12),
    fontFamily: Font.NunitoSans400,
  },

  firstView: {
    width: '88%',
    height: '90%',
    backgroundColor: Colors.Ash,
    borderRadius: scale(20),
    // justifyContent: 'center',
    alignSelf: 'center',
  },
});
export default TermsAndConditions;
