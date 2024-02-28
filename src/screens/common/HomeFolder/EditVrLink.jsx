import {StyleSheet, Text, View, SafeAreaView} from 'react-native';
import React, {useState} from 'react';
import {GlobalStyle} from '../../../Constants/GlobalStyle';
import CustomButton from '../../../components/CustomButton';
import {Colors} from '../../../utils/Colors';
import MainHeader from '../../../components/Header/MainHeader';
import {useForm} from 'react-hook-form';
import {ms, scale, vs} from 'react-native-size-matters';
import Validation from '../../../components/Validation';
import {WebsiteLinkRegix} from '../../../utils/url';
import CustomInput from '../../../components/CustomInput';
import {Edit_VrLink} from '../../../redux/actions/UserAction';

const EditVrLink = ({navigation, route}) => {
  const {Values} = route.params;
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({mode: 'all'});

  const onSubmit = data => {
    Edit_VrLink(data, navigation, Values);
  };
  return (
    <SafeAreaView style={GlobalStyle.Container}>
      <MainHeader
        NoSearch
        BackArrow
        Title
        Text="Edit Your Vr Link"
        TextRestyle={GlobalStyle.HeaderSmallText}
      />
      <View style={{paddingHorizontal: ms(13), marginTop: vs(20)}}>
        <Text style={GlobalStyle.UploadTitle}>Your VR link</Text>
        <CustomInput
          fontSize={scale(16)}
          control={control}
          Gapp={GlobalStyle.noGap}
          name="link"
          rules={{
            required: '*Link is required',
            pattern: {
              value: WebsiteLinkRegix,
              message: 'Link is not valid',
            },
          }}
          placeholder="Your VR link"
          defaultValue={Values.link}
        />
        {errors.link && <Validation title={errors.link.message} />}

        <CustomButton
          onPress={handleSubmit(onSubmit)}
          containerStyle={GlobalStyle.CustomButtonRestyle}
          textStyle={{color: Colors.White}}
          title="Upload"
        />
      </View>
    </SafeAreaView>
  );
};

export default EditVrLink;

const styles = StyleSheet.create({});
