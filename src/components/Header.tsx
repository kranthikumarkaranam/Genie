import React from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import constants from '../util/constants';
import {IconButton, MD3Colors} from 'react-native-paper';

interface HeaderT {
  menuPress: () => void;
}
const Header = ({menuPress}: HeaderT) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: constants.PrimaryColor,
        height: 52,
        paddingTop: 12,
      }}>
      <TouchableOpacity onPress={menuPress}>
        <Text
          style={{
            fontSize: 20,
            color: 'white',
            paddingHorizontal: 10,
            paddingBottom: 10,
            backgroundColor: constants.PrimaryColor,
          }}>
          HOME
        </Text>
      </TouchableOpacity>
      <Image
        style={{
          marginTop: -5,
          width: 120,
          height: 34,
          resizeMode: 'contain',
        }}
        source={require('../assets/Images/name-logo-removebg.png')}
      />
      <Text
        style={{
          fontSize: 20,
          color: 'white',
          paddingHorizontal: 10,
          paddingBottom: 10,
          backgroundColor: constants.PrimaryColor,
        }}>
        LOCATION
      </Text>
    </View>
  );
};

export default Header;
