import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import constants from '../util/constants';
import {Icon, IconButton} from 'react-native-paper';

interface HeaderT {
  menuPress: () => void;
}
const Header = ({menuPress}: HeaderT) => {
  return (
    <View style={styles.container}>
      <IconButton
        icon="menu"
        iconColor="white"
        size={36}
        style={styles.menu}
        onPress={menuPress}
      />
      <Image
        style={styles.image}
        source={require('../assets/Images/name-logo-removebg.png')}
      />
      <View style={styles.locationContainer}>
        <Text style={styles.location}>Chennai</Text>
        <Icon source="map-marker-radius" color="white" size={22} />
      </View>
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
  menu: {paddingBottom: 10, marginLeft: 0},
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
    paddingRight: 2,
    paddingTop: 2,
  },
});

export default Header;
