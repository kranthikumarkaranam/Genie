import React from 'react';
import {FlatList, Text} from 'react-native';
import {productApiT} from '../types/api-Types';
import ProductItem from './ProductItem';

interface ProductListT {
  data: productApiT[];
  itemPress: (id: number) => void;
}
const ProductList = ({data, itemPress}: ProductListT) => {
  const renderItem = ({item}: {item: productApiT}) => (
    <ProductItem data={item} onPress={itemPress} />
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
