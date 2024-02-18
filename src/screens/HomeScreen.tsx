import React, {useEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import SearchBar from '../components/SearchBar';
import ProductList from '../components/ProductList';

import {RootStackParamList} from '../routes/routeTypes';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {FetchAllProducts} from '../store/ProductsSlice';
import {store} from '../store/store';
import {useAppDispatch, useAppSelector} from '../store/pre-Typed';

type NavigationPropsT = NativeStackScreenProps<RootStackParamList, 'MyHome'>;

const HomeScreen = ({navigation}: NavigationPropsT) => {
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useAppDispatch();
  const products = useAppSelector(state => state.Products.entities.byId);
  const ProductItems = Object.values(products);
  useEffect(() => {
    FetchAllProductsHandler();
  }, []);

  const FetchAllProductsHandler = async () => {
    const resultAction = await dispatch(FetchAllProducts(0));
    if (FetchAllProducts.fulfilled.match(resultAction)) {
      // Alert.alert('Success', 'Data fetched successfully');
      console.log(
        'FETCH RESULT  from FetchAllProductsHandler   ----  first product title ---->  ',
        resultAction.payload.products[0].title,
      );
      console.log(
        'STATE RESULT from FetchAllProductsHandler   ----  first product title ---->  ',
        store.getState().Products.entities.byId[1].title,
      );
    } else {
      if (resultAction.payload) {
        Alert.alert(
          'Failure - payload error',
          `${resultAction.payload.errorMessage}`,
        );
      } else {
        Alert.alert('Failure - action error', `${resultAction.error.message}`);
      }
    }
  };

  const searchHandler = () => {
    console.log('search icon pressed', searchTerm);
  };

  const itemPressHandler = (id: number) => {
    navigation.navigate('HomeProductDetail', {
      productID: id,
    });
  };

  return (
    <View style={styles.container}>
      <SearchBar
        value={searchTerm}
        onChangeText={searchTerm => setSearchTerm(searchTerm)}
        onPress={searchHandler}
      />

      <ProductList data={ProductItems} itemPress={itemPressHandler} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  image: {
    width: '100%',
    height: 250,
  },
});

export default HomeScreen;
