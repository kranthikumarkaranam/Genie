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
  const {productID} = route.params;

  const CategoriesList = useAppSelector(state => state.Categories.entities);
  const category = CategoriesList.find(category =>
    category.products.find(product => product.id === productID),
  );

  const product = category?.products.find(product => product.id === productID);

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
  if (product !== undefined && category !== undefined) {
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

export default ProductDetailScreen;
