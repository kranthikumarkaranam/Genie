import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {SideDrawer} from './DrawerNavigation';
import {UpdateProfileScreen} from '../screens';
import {RootStackParamList} from './routeTypes';
import {AuthStack} from './StackNavigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="Auth"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Auth" component={AuthStack} />
      <Stack.Screen name="Main" component={SideDrawer} />
      <Stack.Screen name="UpdateProfile" component={UpdateProfileScreen} />
    </Stack.Navigator>
  );
};

export default RootNavigation;
