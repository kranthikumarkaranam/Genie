import React, {useState} from 'react';
import {Image, Modal, StyleSheet, Text, View} from 'react-native';
import constants from '../util/constants';
import {TouchableNativeFeedback} from 'react-native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Location from './Location';
import {TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface HeaderT {
  menuPress: () => void;
}
const Header = ({menuPress}: HeaderT) => {
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
  };

  const locationHandler = () => {
    console.log('location Handler pressed');
  };
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
      <TouchableNativeFeedback onPress={openModal}>
        <View style={styles.locationContainer}>
          <Text style={styles.location}>Location</Text>

          <MaterialCommunityIcon
            name="map-marker-radius"
            size={24}
            color="white"
          />
        </View>
      </TouchableNativeFeedback>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              onPress={closeModal}
              style={{
                position: 'absolute',
                top: '2%',
                right: '2%',
              }}>
              <Ionicons name={'close-circle'} color={'grey'} size={30} />
            </TouchableOpacity>
            <Location />
          </View>
        </View>
      </Modal>
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
    marginLeft: 45,
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
    paddingRight: 1,
    paddingTop: 4,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    position: 'relative',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 40,
    borderRadius: 10,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignSelf: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Header;
