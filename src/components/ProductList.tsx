import React, {useState} from 'react';
import {FlatList, Text} from 'react-native';
import {productApiT} from '../types/api-Types';
import ProductItem from './ProductItem';
import {RootStackParamList} from '../routes/routeTypes';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

interface ProductListT {
  data: productApiT[];
  itemPress: (id: number) => void;
  goToCart: (id: number) => void;
}
const ProductList = ({data, itemPress, goToCart}: ProductListT) => {
  const renderItem = ({item}: {item: productApiT}) => (
    <ProductItem data={item} onPress={itemPress} goToCart={goToCart} />
  );

  return (
    <>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    </>
  );
};

export default ProductList;
