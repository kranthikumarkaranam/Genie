import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  PermissionsAndroid,
  Platform,
} from 'react-native';

import Geolocation from '@react-native-community/geolocation';
import CustomButton from './CustomButton';

const Location = () => {
  const [currentLongitude, setCurrentLongitude] = useState('...');
  const [currentLatitude, setCurrentLatitude] = useState('...');
  const [locationStatus, setLocationStatus] = useState('');

  useEffect(() => {
    let watchID: number; // Delacre wathID
    const requestLocationPermission = async () => {
      if (Platform.OS === 'ios') {
        getOneTimeLocation();
        watchID = subscribeLocationChange(); // Assign the returned watchID
      } else {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Location Access Required',
              message: 'This App needs to Access your location',
              buttonPositive: 'OK',
            },
          );
          // To Check, If Permission is granted
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            getOneTimeLocation();
            watchID = subscribeLocationChange(); // Assign the returned watchID
          } else {
            setLocationStatus('Permission Denied');
          }
        } catch (err) {
          console.warn(err);
        }
      }
    };
    requestLocationPermission();
    //  cleanup function to  remove listener when component unmounts
    return () => {
      Geolocation.clearWatch(watchID); // to clear the watch for the device's location.
    };
  }, []);

  const getOneTimeLocation = () => {
    setLocationStatus('Getting Location ...');
    setCurrentLatitude('...');
    setCurrentLongitude('...');
    Geolocation.getCurrentPosition(
      //Will give you the current location
      position => {
        setLocationStatus('You are Here');

        //getting the Longitude from the location json
        const currentLongitude = JSON.stringify(position.coords.longitude);

        //getting the Latitude from the location json
        const currentLatitude = JSON.stringify(position.coords.latitude);

        //Setting Longitude state
        setCurrentLongitude(currentLongitude);

        //Setting Longitude state
        setCurrentLatitude(currentLatitude);
      },
      error => {
        setLocationStatus(error.message);
      },
      {
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 1000,
      },
    );
  };

  const subscribeLocationChange = () => {
    const watchID: number = Geolocation.watchPosition(
      position => {
        //Will give you the location on location change

        setLocationStatus('You are Here');
        console.log(position);

        //getting the Longitude from the location json
        const currentLongitude = JSON.stringify(position.coords.longitude);

        //getting the Latitude from the location json
        const currentLatitude = JSON.stringify(position.coords.latitude);

        //Setting Longitude state
        setCurrentLongitude(currentLongitude);

        //Setting Latitude state
        setCurrentLatitude(currentLatitude);
      },
      error => {
        setLocationStatus(error.message);
      },
      {
        enableHighAccuracy: false,
        maximumAge: 1000,
      },
    );
    return watchID; // Return the watchID
  };

  return (
    <>
      <Image
        source={{
          uri: 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/location.png',
        }}
        style={{width: 70, height: 70}}
      />
      <Text style={styles.boldText}>{locationStatus}</Text>
      <View
        style={{
          paddingVertical: 10,
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View style={{flexDirection: 'row', marginTop: 0}}>
          <Text style={styles.text}>Latitude: </Text>
          <Text style={[styles.text, {fontWeight: '700', color: '#444'}]}>
            {currentLatitude}
          </Text>
        </View>
        <View style={{flexDirection: 'row', marginTop: 8}}>
          <Text style={styles.text}>Longitude: </Text>
          <Text style={[styles.text, {fontWeight: '700', color: '#444'}]}>
            {currentLongitude}
          </Text>
        </View>
      </View>
      <View style={{marginTop: 20, width: '100%'}}>
        <CustomButton
          title="Refresh"
          onPress={getOneTimeLocation}
          containerStyle={{marginTop: 0, borderRadius: 8}}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  boldText: {
    fontSize: 26,
    color: 'red',
    marginTop: 10,
    marginBottom: 20,
    textAlign: 'center',
  },
  text: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 20,
  },
});

export default Location;
