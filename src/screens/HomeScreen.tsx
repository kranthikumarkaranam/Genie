import React, {useEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import SearchBar from '../components/SearchBar';
import ProductList from '../components/ProductList';

import {RootStackParamList} from '../routes/routeTypes';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {FetchAllProducts} from '../store/ProductsSlice';
import {store} from '../store/store';
import {useAppDispatch, useAppSelector} from '../store/pre-Typed';
import {productApiT, productsApiT} from '../types/api-Types';

type NavigationPropsT = NativeStackScreenProps<RootStackParamList, 'MyHome'>;

const HomeScreen = ({navigation}: NavigationPropsT) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchData, setSearchData] = useState<productApiT[]>([]);
  const [showSearchResults, setShowSearchResults] = useState<boolean>(false);
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

  const searchHandler = async () => {
    console.log('search icon pressed', searchTerm);
    const response = await fetch(
      `https://dummyjson.com/products/search?q=${searchTerm}`,
    );
    const data = (await response.json()) as productsApiT;
    setSearchData(data.products);
    setShowSearchResults(true);
  };

  const itemPressHandler = (id: number) => {
    navigation.navigate('HomeProductDetail', {
      productID: id,
    });
  };
  const backPressHandler = () => {
    setShowSearchResults(false);
    setSearchTerm('');
    setSearchData([]);
  };

  return (
    <>
      <View style={styles.container}>
        {!showSearchResults && (
          <>
            <SearchBar
              value={searchTerm}
              onChangeText={searchTerm => setSearchTerm(searchTerm)}
              onPress={searchHandler}
            />
            <ProductList data={ProductItems} itemPress={itemPressHandler} />
          </>
        )}
        {showSearchResults && (
          <View style={styles.searchContainer}>
            <TouchableNativeFeedback onPress={backPressHandler}>
              <Text style={styles.back}>BACK</Text>
            </TouchableNativeFeedback>

            <SearchBar
              value={searchTerm}
              onChangeText={searchTerm => setSearchTerm(searchTerm)}
              onPress={searchHandler}
              style={{width: '90%'}}
            />
          </View>
        )}
        {showSearchResults && searchData.length === 0 && (
          <Text style={styles.notFound}>No results found.</Text>
        )}
        {showSearchResults && searchData.length > 0 && (
          <ProductList data={searchData} itemPress={itemPressHandler} />
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 250,
  },
  back: {
    color: '#3c3c3c',
    marginRight: 3,
  },
  notFound: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    color: '#666',
    marginTop: 30,
  },
});

export default HomeScreen;
