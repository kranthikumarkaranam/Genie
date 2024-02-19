import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import constants from '../util/constants';
import {TouchableNativeFeedback} from 'react-native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

interface HeaderT {
  menuPress: () => void;
}
const Header = ({menuPress}: HeaderT) => {
  return (
    <View style={styles.container}>
      <TouchableNativeFeedback onPress={menuPress}>
        <View style={styles.menu}>
          <MaterialIcon name="menu" size={36} color="white" />
        </View>
      </TouchableNativeFeedback>
      <Image
        style={styles.image}
        source={require('../assets/Images/name-logo-removebg.png')}
      />
      <TouchableNativeFeedback onPress={menuPress}>
        <View style={styles.locationContainer}>
          <Text style={styles.location}>Chennai</Text>

          <MaterialCommunityIcon
            name="map-marker-radius"
            size={24}
            color="white"
          />
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: constants.PrimaryColor,
    height: 52,
    paddingTop: 12,
  },
  menu: {
    marginLeft: 8,
    marginTop: -8,
  },
  image: {
    marginTop: -5,
    width: 120,
    height: 34,
    resizeMode: 'contain',
    marginLeft: 20,
  },
  locationContainer: {
    paddingBottom: 10,
    flexDirection: 'row',
    minWidth: '20%',
    paddingHorizontal: 8,
  },
  location: {
    fontSize: 16,
    color: 'white',
    fontWeight: '500',
    paddingRight: 4,
    paddingTop: 4,
  },
});

export default Header;
