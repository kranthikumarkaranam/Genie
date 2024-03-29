import React, {useEffect, useState} from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import SearchBar from '../components/SearchBar';
import ProductList from '../components/ProductList';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import {RootStackParamList} from '../routes/routeTypes';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  FetchAllProducts,
  FetchCartItemsFromAsyncStorage,
  removeProductFromCart_ProductsSlice,
} from '../store/ProductsSlice';
import {store} from '../store/store';
import {useAppDispatch, useAppSelector} from '../store/pre-Typed';
import {productApiT, productsApiT} from '../types/api-Types';
import ImageCarousel from '../components/ImageCarousel';
import constants, {BannerImages} from '../util/constants';
import LoadingIndicator from '../components/LoadingIndicator';

type NavigationPropsT = NativeStackScreenProps<RootStackParamList, 'MyHome'>;

const HomeScreen = ({navigation}: NavigationPropsT) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchData, setSearchData] = useState<productApiT[]>([]);
  const [showSearchResults, setShowSearchResults] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useAppDispatch();
  const products = useAppSelector(state => state.Products.entities);
  useEffect(() => {
    FetchAllProductsHandler().then(() => {
      FetchCartItemsFromAsyncStorageHandler().then(() => {
        setIsLoading(false);
      });
    });
  }, []);

  const FetchCartItemsFromAsyncStorageHandler = async () => {
    const resultAction = await dispatch(FetchCartItemsFromAsyncStorage());
    if (FetchCartItemsFromAsyncStorage.fulfilled.match(resultAction)) {
      // Alert.alert('Success', 'Data fetched successfully');
      console.log(
        'FETCH RESULT  from FetchCartItemsFromAsyncStorageHandler  --->  ',
        resultAction.payload,
      );
      console.log(
        'STATE RESULT from FetchCartItemsFromAsyncStorageHandler ---->  1, 2 elements cartCount --->  ',
        store.getState().Products.entities[0].cartCount,
        store.getState().Products.entities[1].cartCount,
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
        store.getState().Products.entities[1].title,
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
    if (!searchTerm || searchTerm === '') return;
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

  const goToCartHandler = (productId: number) => {
    navigation.navigate('CartTab', {productID: productId});
  };

  return (
    <>
      <ImageCarousel images={BannerImages} />
      <View style={styles.container}>
        {!showSearchResults && (
          <>
            <SearchBar
              value={searchTerm}
              onChangeText={searchTerm => setSearchTerm(searchTerm)}
              onPress={searchHandler}
            />
            {isLoading ? (
              <LoadingIndicator size="small" paddingHorizontal={126} />
            ) : (
              <ProductList
                data={products}
                itemPress={itemPressHandler}
                goToCart={goToCartHandler}
              />
            )}
          </>
        )}
        {showSearchResults && (
          <View style={styles.searchContainer}>
            <TouchableNativeFeedback onPress={backPressHandler}>
              <View style={styles.back}>
                <MaterialIcon
                  name="arrow-back"
                  size={32}
                  color={constants.PrimaryColor}
                />
              </View>
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
          <>
            {isLoading ? (
              <LoadingIndicator size="small" paddingHorizontal={126} />
            ) : (
              <ProductList
                data={searchData}
                itemPress={itemPressHandler}
                goToCart={goToCartHandler}
              />
            )}
          </>
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
    marginRight: 7,
    marginBottom: 10,
  },
  notFound: {
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
    color: '#666',
    marginTop: 50,
  },
});

export default HomeScreen;
