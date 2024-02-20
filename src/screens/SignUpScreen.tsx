import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from '../store/pre-Typed';
import {Alert, Button, ScrollView, StyleSheet, Text, View} from 'react-native';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import Avatar from '../components/Avatar';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import constants from '../util/constants';
import {RootStackParamList} from '../routes/routeTypes';
import {store} from '../store/store';
import {setUser} from '../store/MyUserSlice';
import {validateEmail, validatePassword} from '../util/UtilityFunctions';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {TouchableOpacity} from 'react-native';

type NavigationPropsT = NativeStackScreenProps<RootStackParamList, 'SignUp'>;

const SignUpScreen = ({navigation}: NavigationPropsT) => {
  const dispatch = useAppDispatch();

  const [firstName, setFirstName] = useState('Kranthi');
  const [lastName, setLastName] = useState('Kumar');
  const [username, setUsername] = useState('kranthi.karanam@tcs.com');
  const [password, setPassword] = useState('Kara271&#');
  const [confirmPassword, setConfirmPassword] = useState('Kara271&#');
  const [image, setImage] = useState<string | null>(null);

  const handleImageSelected = (imageUri: string | null) => {
    setImage(imageUri);
  };

  const SignUpHandler = () => {
    if (!firstName || !lastName || !username || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill out all fields');
    } else if (!validateEmail(username)) {
      Alert.alert('Error', 'Please enter a valid username');
    } else if (!validatePassword(password)) {
      Alert.alert(
        'Error',
        'Password must be more than 8 characters, with 1 capital letter, 1 number, and 1 special character.',
      );
    } else if (password !== confirmPassword) {
      Alert.alert('Error', "Password doesn't match");
    } else {
      // Dispatch action to store form data
      dispatch(setUser({firstName, lastName, username, password, image}));

      // Clear form fields
      setFirstName('');
      setLastName('');
      setUsername('');
      setPassword('');
      setConfirmPassword('');
      setImage(null);

      // Navigate to next screen
      navigation.navigate('SignIn');
      console.log(store.getState().MyUser);
    }
  };

  const goToSignInHandler = () => {
    navigation.navigate('SignIn');
  };

  return (
    <GestureHandlerRootView style={{flex: 1, backgroundColor: 'white'}}>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.text}>Create new account</Text>
          <Avatar style={styles.avatar} onImageSelected={handleImageSelected} />
          <View style={styles.formContainer}>
            <CustomInput
              placeholder="First Name"
              value={firstName}
              onChangeText={setFirstName}
            />
            <CustomInput
              placeholder="Last Name"
              value={lastName}
              onChangeText={setLastName}
            />
            <CustomInput
              placeholder="E-mail Address"
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
            <CustomInput
              placeholder="Confirm Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
            />
          </View>

          <CustomButton
            title="Sign Up"
            onPress={SignUpHandler}
            style={styles.button}
          />
          <View style={styles.textContainer}>
            <Text style={{fontWeight: '500', fontSize: 16}}>
              Already have an account?{'  '}
            </Text>
            <TouchableOpacity onPress={goToSignInHandler}>
              <Text
                style={{
                  fontWeight: '500',
                  fontSize: 16,
                  color: constants.PrimaryColor,
                }}>
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  formContainer: {
    width: '80%',
  },
  text: {
    color: constants.PrimaryColor,
    fontWeight: 'bold',
    fontSize: 40,
    marginTop: 40,
    marginBottom: 20,
  },
  button: {
    width: '60%',
    marginTop: 30,
  },
  avatar: {
    marginBottom: 20,
  },
  textContainer: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SignUpScreen;
