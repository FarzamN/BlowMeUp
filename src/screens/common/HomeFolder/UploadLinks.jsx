import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
} from 'react-native';
import Validation from '../../../components/Validation';
import {useForm} from 'react-hook-form';
import {GlobalStyle} from '../../../Constants/GlobalStyle';
import CustomInput from '../../../components/CustomInput';
import { scale, verticalScale} from 'react-native-size-matters';
import CustomButton from '../../../components/CustomButton';
import {upload_VR} from '../../../redux/actions/UserAction';
import {Colors} from '../../../utils/Colors';
import Toast from 'react-native-simple-toast';
import Success from '../../../components/Modal/Success';
import Loading from '../../../components/Modal/Loading';
import { WebsiteLinkRegix } from '../../../utils/url';

const UploadLinks = ({setSelect}) => {
  const [Load, setLoad] = useState(false);
  const [Done, setDone] = useState(false);
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({mode: 'all'});

  const onSubmit = data => {
    upload_VR(data, setDone, setLoad, setSelect);
    Toast.show('Please Wait...');
  };

  return (
    <View style={GlobalStyle.Upload_Container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.Container}>
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
            />
            {errors.link && <Validation title={errors.link.message} />}
          <CustomButton
            onPress={handleSubmit(onSubmit)}
            containerStyle={GlobalStyle.CustomButtonRestyle}
            textStyle={{color: Colors.White}}
            title="Upload"
          />
        </View>
      </ScrollView>
      <Success isVisible={Done} message={'Successfully uploaded your link'} />
      <Loading isVisible={Load} />
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    marginTop: verticalScale(30),
  },
});
export default UploadLinks;

