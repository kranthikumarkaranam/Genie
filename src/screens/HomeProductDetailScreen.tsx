import React, {useEffect} from 'react';
import {Alert, Text} from 'react-native';
import ScreenHead from '../components/ScreenHead';
import {ScrollView} from 'react-native';
import ProductDetails from '../components/ProductDetails';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../routes/routeTypes';
import {useAppSelector} from '../store/pre-Typed';
import {productApiT} from '../types/api-Types';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

type NavigationPropsT = NativeStackScreenProps<
  RootStackParamList,
  'HomeProductDetail'
>;

const HomeProductDetailScreen = ({route, navigation}: NavigationPropsT) => {
  const {productID} = route.params;

  const products = useAppSelector(state => state.Products.entities);
  const product = products.find(p => p.id === productID);

  let productDetails: productApiT = {
    id: 0,
    title: '',
    description: '',
    price: 0,
    discountPercentage: 0,
    rating: 0,
    stock: 0,
    brand: '',
    category: '',
    thumbnail: '',
    images: [],
    isInCart: false,
    cartCount: 0,
  };
  // Check if category & product are undefined
  if (product !== undefined) {
    productDetails = product;
  } else {
    // Handle the case when they are undefined
    Alert.alert('Error', `The product details were not found.`);
  }

  const backPressHandler = () => {
    navigation.goBack();
  };

  const goToCartHandler = (productId: number) => {
    navigation.navigate('CartTab');
    // dispatch(removeProductFromCart_ProductsSlice(productId));
    // dispatch(removeProductFromCart_CategoriesSlice(productId));
  };

  const buyNowHandler = (productId: number) => {
    navigation.navigate('CartTab');
    // dispatch(removeProductFromCart_ProductsSlice(productId));
    // dispatch(removeProductFromCart_CategoriesSlice(productId));
  };

  return (
    <>
      <ScreenHead isBack={true} backPress={backPressHandler} isLastScreen />
      <GestureHandlerRootView style={{flex: 1, backgroundColor: 'white'}}>
        <ScrollView>
          <ProductDetails
            data={productDetails}
            goToCart={goToCartHandler}
            buyNow={buyNowHandler}
          />
        </ScrollView>
      </GestureHandlerRootView>
    </>
  );
};

export default HomeProductDetailScreen;
