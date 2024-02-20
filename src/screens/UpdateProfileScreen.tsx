import React, {useState} from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Alert, StyleSheet, Text, View} from 'react-native';
import Avatar from '../components/Avatar';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import {ScrollView} from 'react-native-gesture-handler';
import {useAppDispatch, useAppSelector} from '../store/pre-Typed';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import constants from '../util/constants';
import {RootStackParamList} from '../routes/routeTypes';
import {setUser} from '../store/MyUserSlice';
import {validateEmail, validatePassword} from '../util/UtilityFunctions';
import {store} from '../store/store';

type NavigationPropsT = NativeStackScreenProps<
  RootStackParamList,
  'UpdateProfile'
>;

const UpdateProfileScreen = ({route, navigation}: NavigationPropsT) => {
  const dispatch = useAppDispatch();
  const {
    firstName: storedFirstName,
    lastName: storedLastname,
    username: storedUsename,
    password: storedPassword,
    image: storedImage,
  } = useAppSelector(state => state.MyUser);

  const [firstName, setFirstName] = useState(storedFirstName);
  const [lastName, setLastName] = useState(storedLastname);
  const [username, setUsername] = useState(storedUsename);
  const [password, setPassword] = useState(storedPassword);
  const [image, setImage] = useState<string | null>(storedImage);

  const handleImageSelected = (imageUri: string | null) => {
    setImage(imageUri);
  };

  const UpdateHandler = () => {
    if (!firstName || !lastName || !username || !password) {
      Alert.alert('Error', 'Please fill out all fields');
    } else if (!validateEmail(username)) {
      Alert.alert('Error', 'Please enter a valid username');
    } else if (!validatePassword(password)) {
      Alert.alert(
        'Error',
        'Password must be more than 8 characters, with 1 capital letter, 1 number, and 1 special character.',
      );
    } else {
      // Dispatch action to store form data
      dispatch(setUser({firstName, lastName, username, password, image}));
      console.log('after update state', store.getState().MyUser.image);

      // Clear form fields
      setFirstName('');
      setLastName('');
      setUsername('');
      setPassword('');
      setImage(null);

      navigation.goBack();
    }
  };

  return (
    <GestureHandlerRootView style={{flex: 1, backgroundColor: 'white'}}>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.text}>Update Profile</Text>
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
          </View>

          <CustomButton
            title="Update"
            onPress={UpdateHandler}
            containerStyle={styles.button}
          />
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
    marginBottom: 40,
  },
  button: {
    width: '60%',
    marginTop: 30,
  },
  avatar: {
    marginBottom: 40,
  },
});

export default UpdateProfileScreen;
