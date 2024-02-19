import React from 'react';
import {FlatList, Text, TouchableWithoutFeedback, View} from 'react-native';
import type {DrawerScreenProps} from '@react-navigation/drawer';
import {RootStackParamList} from '../routes/routeTypes';
import Header from '../components/Header';
import {MyOrders} from '../util/data';
import CustomCarousel from '../components/CustomCarousel';

type NavigationPropsT = DrawerScreenProps<RootStackParamList, 'MyOrders'>;

const MyOrdersScreen = ({navigation}: NavigationPropsT) => {
  const drawerMenuHandler = () => {
    navigation.toggleDrawer();
  };

  const onPressHandler = () => {
    // navigation.navigate('OrderDetailsScreen', { orderId: item.id })
  };
  return (
    <>
      <Header menuPress={drawerMenuHandler} />
      {/* <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontSize: 20, marginBottom: 20}}>My Orders</Text>
        {MyOrders.length > 0 ? (
          <FlatList
            data={MyOrders}
            renderItem={({item}) => (
              <TouchableWithoutFeedback
                onPress={onPressHandler}
                style={{
                  padding: 10,
                  borderBottomWidth: 1,
                  borderBottomColor: '#ccc',
                }}>
                <>
                  <Text>Order ID: {item.id}</Text>
                  <Text>Ordered On: {item.total}</Text>
                  <Text>Status: {item.status}</Text>
                  <Text>Total: ${item.total}</Text>
                </>
              </TouchableWithoutFeedback>
            )}
            keyExtractor={item => item.id.toString()}
          />
        ) : (
          <Text>No orders found</Text>
        )}
      </View> */}
    </>
  );
};

export default MyOrdersScreen;
