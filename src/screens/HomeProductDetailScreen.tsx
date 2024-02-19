import React, {useEffect} from 'react';
import {Alert, Text} from 'react-native';
import ScreenHead from '../components/ScreenHead';
import {ScrollView} from 'react-native';
import ProductDetails from '../components/ProductDetails';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../routes/routeTypes';
import {useAppSelector} from '../store/pre-Typed';
import {productApiT} from '../types/api-Types';

type NavigationPropsT = NativeStackScreenProps<
  RootStackParamList,
  'HomeProductDetail'
>;

const HomeProductDetailScreen = ({route, navigation}: NavigationPropsT) => {
  const {productID} = route.params;

  const products = useAppSelector(state => state.Products.entities.byId);
  const ProductItems = Object.values(products);
  const product = ProductItems.find(p => p.id === productID);

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
  return (
    <>
      <ScreenHead isBack={true} backPress={backPressHandler} isLastScreen />
      <ScrollView>
        <ProductDetails data={productDetails} />
      </ScrollView>
    </>
  );
};

export default HomeProductDetailScreen;
