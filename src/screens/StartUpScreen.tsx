import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import CustomButton from '../components/CustomButton';
import constants from '../util/constants';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../routes/routeTypes';

type NavigationPropsT = NativeStackScreenProps<RootStackParamList, 'StartUp'>;

const StartUpScreen = ({navigation}: NavigationPropsT) => {
  const goToSignInScreenHandler = () => {
    navigation.navigate('SignIn');
  };
  const goToSignUpScreenHandler = () => {
    navigation.navigate('SignUp');
  };
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require('../assets/Images/logo-vertical-removebg.png')}
          style={styles.image}
        />
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton
          title="Log In"
          onPress={goToSignInScreenHandler}
          containerStyle={{width: '60%'}}
        />
        <CustomButton
          title="Sign Up"
          onPress={goToSignUpScreenHandler}
          containerStyle={styles.signupButtonConatiner}
          textStyle={{color: constants.PrimaryColor}}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  imageContainer: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '40%',
    resizeMode: 'contain',
  },
  buttonContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 80,
  },
  signupButtonConatiner: {
    width: '60%',
    marginTop: 40,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: constants.PrimaryColor,
  },
});

export default StartUpScreen;
