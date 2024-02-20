import React, {useState} from 'react';
import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import {useAppDispatch} from '../store/pre-Typed';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import constants from '../util/constants';
import {RootStackParamList} from '../routes/routeTypes';
import {ValidateUser} from '../store/ApiUserSlice';
import {TouchableNativeFeedback} from 'react-native';

type NavigationPropsT = NativeStackScreenProps<RootStackParamList, 'SignIn'>;

const SignInScreen = ({navigation}: NavigationPropsT) => {
  const [username, setUsername] = useState('kminchelle');
  const [password, setPassword] = useState('0lelplR');

  const dispatch = useAppDispatch();

  const ValidateUserDispatcher = async (username: string, password: string) => {
    try {
      const originalPromiseResult = await dispatch(
        ValidateUser({username, password}),
      ).unwrap();
      console.log('ApiUserSlice  -----  ', originalPromiseResult);
      // handle result here
    } catch (rejectedValueOrSerializedError) {
      // handle error here
    }
  };

  const SignInHandler = () => {
    if (!username || !password) {
      Alert.alert('Error', 'Please fill out all fields');
    } else {
      ValidateUserDispatcher(username, password);
      // Clear form fields
      setUsername('');
      setPassword('');

      // Navigate to next screen
      navigation.navigate('Main');
    }
  };

  const goToSignUpHandler = () => {
    navigation.navigate('SignUp');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Sign In</Text>
      <View style={styles.formContainer}>
        <CustomInput
          placeholder="E-mail"
          value={username}
          onChangeText={setUsername}
          keyboardType="email-address"
        />
        <CustomInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>

      <CustomButton
        title="Log In"
        onPress={SignInHandler}
        style={styles.button}
      />
      <View style={styles.textContainer}>
        <Text style={{fontWeight: '500', fontSize: 16}}>
          Don't have an account?{'  '}
        </Text>
        <TouchableOpacity onPress={goToSignUpHandler}>
          <Text
            style={{
              fontWeight: '500',
              fontSize: 16,
              color: constants.PrimaryColor,
            }}>
            Signup
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  formContainer: {
    width: '80%',
  },
  text: {
    color: constants.PrimaryColor,
    fontWeight: 'bold',
    fontSize: 40,
    marginBottom: 60,
  },
  button: {
    width: '60%',
    marginTop: 40,
  },
  textContainer: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default SignInScreen;
