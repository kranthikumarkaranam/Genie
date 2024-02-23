import React, {useEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import CartItem from '../components/CartItem';
import ScreenHead from '../components/ScreenHead';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {useAppDispatch, useAppSelector} from '../store/pre-Typed';
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
import {asyncCartT} from '../types/store-Types';
import {Button} from 'react-native';
import {
  FetchCartItemsFromAsyncStorage,
  clearCartData,
} from '../store/ProductsSlice';
import {store} from '../store/store';
import LoadingIndicator from '../components/LoadingIndicator';

type NavigationPropsT = BottomTabScreenProps<RootStackParamList, 'CartTab'>;

const CartScreen = ({navigation}: NavigationPropsT) => {
  const products = useAppSelector(state => state.Products.entities);
  const dispatch = useAppDispatch();

  const [cartItems, setCartItems] = useState<productApiT[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAsyncStorageCartItems();
    setIsLoading(false);
  }, [products]);

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

  const clearCartHandler = async () => {
    try {
      await AsyncStorage.removeItem('cartItems'); // remove the key-value pair completely
      dispatch(clearCartData());
      setCartItems([]);
      console.log('AsyncStorage cleared successfully');
    } catch (e) {
      console.error('Error clearing AsyncStorage:', e);
    }
  };

  const clearCart = () => {
    Alert.alert(
      'Clear Cart?',
      'Are you sure you want to remove all items in the cart?',
      [
        {
          text: 'No',
          onPress: () => {},
          style: 'cancel',
        },
        {text: 'Yes', onPress: clearCartHandler},
      ],
      {cancelable: true},
    );
  };

  return (
    <>
      {cartItems.length > 0 ? (
        <ScreenHead title="My Cart" isButton onPress={clearCart} />
      ) : (
        <ScreenHead title="My Cart" />
      )}

      <GestureHandlerRootView style={{flex: 1, backgroundColor: 'white'}}>
        {isLoading ? (
          <LoadingIndicator size="small" paddingHorizontal={136} />
        ) : (
          <>
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
                onOkPress={clearCartHandler}
              />
            ) : null}
          </>
        )}
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
  emptyText: {fontSize: 26, fontWeight: '600', color: '#333'},
});
export default CartScreen;
