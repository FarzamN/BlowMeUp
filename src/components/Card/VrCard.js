import {StyleSheet, Text, View, Linking, Pressable} from 'react-native';
import React, {useState} from 'react';
import {GlobalStyle} from '../../Constants/GlobalStyle';
import {
  ms,
  s,
  vs,
} from 'react-native-size-matters';
import {Colors} from '../../utils/Colors';
import {Font} from '../../utils/font';
import Entypo from 'react-native-vector-icons/Entypo';
import {Tooltip} from '@rneui/themed';
import OptionToolTip from '../OptionToolTip';
import {useNavigation} from '@react-navigation/native';
import DeleteModal from '../Modal/DeleteModal';
import { Delete_VrLink} from '../../redux/actions/UserAction';
import Loading from '../Modal/Loading';

const VrCard = ({data,Edit}) => {
  const navigation = useNavigation();
  const [showTool, setShowTool] = useState(false);
  const [Delete, setDelete] = useState(false);
  const [load, setLoad] = useState(false);

  const HandelDelete = () => {
    Delete_VrLink(data, setDelete,setLoad);
  };
  return (
    <Pressable
      onPress={() => Linking.openURL(data.link)}
      android_ripple={{color: Colors.Main}}
      style={[GlobalStyle.Row, styles.Container]}>
        <View style={[GlobalStyle.Row,{width:'95%'}]}>
      <Entypo name="dot-single" size={s(25)} color={Colors.Main} />
      <Text style={styles.Text}>{data.link}</Text>
      </View>
      {Edit ? (
          <Pressable
            onPress={() => setShowTool(true)}
            android_ripple={{
              color: Colors.Yellow,
              foreground: true,
              borderless: true,
            }}>
            <Entypo name="dots-three-vertical" color={Colors.Yellow} size={s(20)} />
          </Pressable>
        ) : (
          <Entypo name="chevron-right" color={Colors.Yellow} size={s(20)} />
        )}
       <Tooltip
              backgroundColor={Colors.Non}
              visible={showTool}
              onOpen={() => setShowTool(true)}
              onClose={() => setShowTool(false)}
              popover={
                <OptionToolTip
                  OptionOne={'Edit'}
                  OptionTwo={'Delete'}
                  onPress = {()=>navigation.navigate('EditVrLink',{
                    Values: data
                  })}
                  onDelete={() => setDelete(true)}
                />
              }>
            </Tooltip>
            <DeleteModal
        visible={Delete}
        KeepPress={() => setDelete(false)}
        OnClose={() => setDelete(false)}
        DeletePress={HandelDelete}
        value="this link"
        points
      />
      <Loading isVisible={load}/>
    </Pressable>
  );
};

const styles = StyleSheet.create({
    Container: {
        justifyContent: 'space-between',
        paddingRight: ms(20),
        width: '100%',
        paddingLeft: ms(15),
        height:vs(50)
      },
  Text: {
    fontSize: s(16),
    fontFamily: Font.Gilroy500,
    color: Colors.White,
  },
});
export default VrCard;
