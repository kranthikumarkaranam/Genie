import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {SideDrawer} from './DrawerNavigation';
import {UpdateProfileScreen} from '../screens';
import {RootStackParamList} from './routeTypes';
import {AuthStack} from './StackNavigation';
import {Text} from 'react-native';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigation = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(true);

  return (
    <Stack.Navigator
      initialRouteName="Auth" // Default initial route is `Auth`.
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Auth" component={AuthStack} />
      {/* {isLoggedIn ? (
        <Stack.Screen name="Main" component={SideDrawer} />
      ) : (
        <Stack.Screen name="Auth" component={AuthStack} />
      )} */}
      <Stack.Screen name="Main" component={SideDrawer} />
      <Stack.Screen name="UpdateProfile" component={UpdateProfileScreen} />
    </Stack.Navigator>
  );
};

export default RootNavigation;
