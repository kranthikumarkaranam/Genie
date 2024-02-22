import React from 'react';
import type {DrawerScreenProps} from '@react-navigation/drawer';
import {RootStackParamList} from '../routes/routeTypes';
import Header from '../components/Header';
import OrderItem from '../components/OrderItem';
import {FlatList, View} from 'react-native';
import {MyOrdersData} from '../util/data';
import {asyncOrdersT} from '../types/store-Types';

type NavigationPropsT = DrawerScreenProps<RootStackParamList, 'MyOrders'>;

const MyOrdersScreen = ({navigation}: NavigationPropsT) => {
  const drawerMenuHandler = () => {
    navigation.toggleDrawer();
  };

  const renderItem = ({item}: {item: asyncOrdersT}) => (
    <OrderItem data={item} />
  );

  return (
    <>
      <Header menuPress={drawerMenuHandler} />
      <View
        style={{
          flex: 1,
          paddingVertical: 16,
          backgroundColor: '#ececec',
        }}>
        <FlatList data={MyOrdersData} renderItem={renderItem} />
      </View>
    </>
  );
};

export default MyOrdersScreen;
