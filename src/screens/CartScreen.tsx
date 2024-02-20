import React, {useEffect} from 'react';
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

type NavigationPropsT = BottomTabScreenProps<RootStackParamList, 'CartTab'>;

const CartScreen = ({navigation}: NavigationPropsT) => {
  const products = useAppSelector(state => state.Products.entities);
  const filteredCartProducts = products.filter(
    (product: productApiT) => product.isInCart === true,
  );

  const renderItem = ({item}: {item: productApiT}) => <CartItem data={item} />;

  const shopNowHandler = () => {
    console.log('shop now clicked');
    navigation.navigate('CategoriesTab');
  };

  const TotalOfOriginalPrices = filteredCartProducts.reduce(
    (total, product) => {
      const originalPrice = calculateOriginalPrice(
        product.price,
        product.discountPercentage,
      );
      return total + originalPrice * product.cartCount;
    },
    0,
  );

  const TotalOfProductPrices = filteredCartProducts.reduce((total, product) => {
    return total + product.price * product.cartCount;
  }, 0);

  return (
    <>
      <ScreenHead title="My Cart" />
      <GestureHandlerRootView style={{flex: 1, backgroundColor: 'white'}}>
        <FlatList
          renderItem={renderItem}
          data={filteredCartProducts}
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
            return filteredCartProducts.length > 0 ? (
              <CartFooter
                noOfItems={filteredCartProducts.length}
                TotalOfOriginalPrices={TotalOfOriginalPrices}
                TotalOfProductPrices={TotalOfProductPrices}
              />
            ) : null;
          }}
        />
        {filteredCartProducts.length > 0 ? (
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
