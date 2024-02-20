import React from 'react';
import ProductDetails from '../components/ProductDetails';
import {RootStackParamList} from '../routes/routeTypes';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import ScreenHead from '../components/ScreenHead';
import {Alert, ScrollView} from 'react-native';
import {productApiT} from '../types/api-Types';
import {useAppSelector} from '../store/pre-Typed';

type NavigationPropsT = NativeStackScreenProps<
  RootStackParamList,
  'ProductDetail'
>;

const ProductDetailScreen = ({route, navigation}: NavigationPropsT) => {
  const {productID, isComingFromHome} = route.params;

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
    // if (isComingFromHome) {
    //   navigation.navigate('HomeTab');
    //   return;
    // }
    navigation.goBack();
  };

  return (
    <>
      <ScreenHead isBack={true} backPress={backPressHandler} isLastScreen />
      <ScrollView>
        <ProductDetails data={productDetails} />
      </ScrollView>
    </>
  );
};

export default ProductDetailScreen;
