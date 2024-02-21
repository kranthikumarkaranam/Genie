import React, {useState} from 'react';
import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import {useAppDispatch} from '../store/pre-Typed';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import constants from '../util/constants';
import {RootStackParamList} from '../routes/routeTypes';
import {ValidateUser} from '../store/ApiUserSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {asyncAuthT} from '../types/store-Types';
import {store} from '../store/store';

type NavigationPropsT = NativeStackScreenProps<RootStackParamList, 'SignIn'>;

const SignInScreen = ({navigation}: NavigationPropsT) => {
  const [username, setUsername] = useState('kminchelle');
  const [password, setPassword] = useState('0lelplR');
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const ValidateUserHandler = async (username: string, password: string) => {
    const resultAction = await dispatch(ValidateUser({username, password}));
    if (ValidateUser.fulfilled.match(resultAction)) {
      // Alert.alert('Success', 'Data fetched successfully');
      console.log(
        'FETCH RESULT from ValidateUserHandler  ----  firstName ---->  ',
        resultAction.payload.firstName,
      );
      console.log(
        'STATE RESULT from ValidateUserHandler  ---- firstName ---->  ',
        store.getState().ApiUser.entities.firstName,
      );
    } else {
      if (resultAction.payload) {
        Alert.alert(
          'Failure - payload error',
          `${resultAction.payload.errorMessage}`,
        );
      } else {
        Alert.alert('Failure - action error', `${resultAction.error.message}`);
      }
    }
  };

  const SignInHandler = async () => {
    if (!username || !password) {
      Alert.alert('Error', 'Please fill out all fields');
    } else {
      await ValidateUserHandler(username, password);

      const AuthToken: asyncAuthT = store.getState().ApiUser.entities.token;

      try {
        const jsonValue = JSON.stringify(AuthToken);
        await AsyncStorage.setItem('AuthToken', jsonValue);
        // Clear form fields
        setUsername('');
        setPassword('');

        console.log('AuthToken in asyncStorage => ', AuthToken);
      } catch (e) {
        // saving error
        console.error('Error saving Auth User:', e);
      }

      // Navigate to next screen
      navigation.navigate('Main');
    }
  };

  const goToSignUpHandler = () => {
    navigation.navigate('SignUp');
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Sign In</Text>
      <View style={styles.formContainer}>
        <CustomInput
          placeholder="username"
          value={username}
          onChangeText={setUsername}
          keyboardType="email-address"
        />
        <CustomInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!isPasswordVisible}
          isEye
          whichEye={isPasswordVisible ? 'eye-off' : 'eye'}
          eyePress={togglePasswordVisibility}
        />
      </View>

      <CustomButton
        title="Log In"
        onPress={SignInHandler}
        containerStyle={styles.button}
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
