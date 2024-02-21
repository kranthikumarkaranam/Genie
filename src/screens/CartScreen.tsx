import React, {useEffect, useState} from 'react';
import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import CartItem from '../components/CartItem';
import ScreenHead from '../components/ScreenHead';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {useAppSelector} from '../store/pre-Typed';
import {productApiT} from '../types/api-Types';
import CartFooter from '../components/CartFooter';
import PlaceOrder from '../components/PlaceOrder';
import CustomButton from '../components/CustomButton';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../routes/routeTypes';
import {
  calculateOriginalPrice,
  calculateTotalPrice,
  roundToOneDecimalPlace,
} from '../util/UtilityFunctions';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {asyncT} from '../types/store-Types';
import {Button} from 'react-native';

type NavigationPropsT = BottomTabScreenProps<RootStackParamList, 'CartTab'>;

const CartScreen = ({navigation}: NavigationPropsT) => {
  const products = useAppSelector(state => state.Products.entities);

  const [cartItems, setCartItems] = useState<productApiT[]>([]);

  useEffect(() => {
    const fetchAsyncStorageCartItems = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('cartItems');
        const storedCartItems: {productId: number; quantity: number}[] | null =
          jsonValue != null ? JSON.parse(jsonValue) : null;

        if (storedCartItems) {
          const filteredProducts = products.filter(product =>
            storedCartItems.some(item => item.productId === product.id),
          );
          setCartItems(filteredProducts);
        }
      } catch (e) {
        console.error('Error reading cart items:', e);
      }
    };

    fetchAsyncStorageCartItems();
  }, [products]);

  useEffect(() => {
    console.log(
      'cartItems local state => ',
      cartItems,
      // cartItems.map(i => i.title),
    );
  }, [cartItems]);

  const renderItem = ({item}: {item: productApiT}) => <CartItem data={item} />;

  const shopNowHandler = () => {
    navigation.navigate('CategoriesTab');
  };

  const TotalOfOriginalPrices = cartItems.reduce((total, product) => {
    const originalPrice = calculateOriginalPrice(
      product.price,
      product.discountPercentage,
    );
    return total + originalPrice * product.cartCount;
  }, 0);

  const TotalOfProductPrices = cartItems.reduce((total, product) => {
    return total + product.price * product.cartCount;
  }, 0);

  const clearAsyncStorage = async () => {
    try {
      await AsyncStorage.clear();
      console.log('AsyncStorage cleared successfully');
    } catch (e) {
      console.error('Error clearing AsyncStorage:', e);
    }
  };

  return (
    <>
      <ScreenHead title="My Cart" />
      <Button title="clearAsyncStorage" onPress={clearAsyncStorage}></Button>
      <GestureHandlerRootView style={{flex: 1, backgroundColor: 'white'}}>
        <FlatList
          renderItem={renderItem}
          data={cartItems}
          keyExtractor={item => item.id.toString()}
          ListEmptyComponent={() => {
            return (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>Your cart is empty!</Text>
                <CustomButton
                  title="Shop now"
                  onPress={shopNowHandler}
                  containerStyle={{
                    marginTop: 32,
                    borderRadius: 8,
                    width: '40%',
                  }}
                  textStyle={{
                    fontWeight: '700',
                  }}
                />
              </View>
            );
          }}
          ListFooterComponent={() => {
            return cartItems.length > 0 ? (
              <CartFooter
                noOfItems={cartItems.length}
                TotalOfOriginalPrices={TotalOfOriginalPrices}
                TotalOfProductPrices={TotalOfProductPrices}
              />
            ) : null;
          }}
        />
        {cartItems.length > 0 ? (
          <PlaceOrder
            TotalOfOriginalPrices={TotalOfOriginalPrices}
            TotalOfProductPrices={TotalOfProductPrices}
          />
        ) : null}
      </GestureHandlerRootView>
    </>
  );
};
const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: '50%',
  },
  emptyText: {fontSize: 26, fontWeight: 'bold', color: '#333'},
});
export default CartScreen;
