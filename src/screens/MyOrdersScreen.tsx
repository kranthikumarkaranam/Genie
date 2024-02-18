import React from 'react';
import {Button, Text, TouchableWithoutFeedback, View} from 'react-native';
import type {DrawerScreenProps} from '@react-navigation/drawer';
import {RootStackParamList} from '../routes/routeTypes';
import constants from '../util/constants';
import Header from '../components/Header';

type NavigationPropsT = DrawerScreenProps<RootStackParamList, 'MyOrders'>;

const MyOrdersScreen = ({navigation}: NavigationPropsT) => {
  const drawerMenuHandler = () => {
    navigation.toggleDrawer();
  };
  return (
    <>
      <Header menuPress={drawerMenuHandler} />
      <Text>MyOrdersScreen</Text>
    </>
  );
};

export default MyOrdersScreen;
