import React, {useEffect} from 'react';
import {Alert, Button, Image, Text, View} from 'react-native';
import {ActivityIndicator, MD2Colors} from 'react-native-paper';
import {useAppDispatch, useAppSelector} from '../store/pre-Typed';
import {FetchAllProducts} from '../store/ProductsSlice';
import {store} from '../store/store';
import {
  FetchAllCategories,
  FetchAllProductsByCategory,
} from '../store/CategoriesSlice';

const CartScreen = () => {
  const dispatch = useAppDispatch();

  const FetchAllProductsHandler = async () => {
    console.log('button pressed');
    const resultAction = await dispatch(FetchAllProducts(0)); //  use limit=0 to get all items.
    if (FetchAllProducts.fulfilled.match(resultAction)) {
      // show toast of `success`
      // Alert.alert('Success', 'Data fetched successfully');
      console.log(
        'FETCH RESULT  from FetchAllProductsHandler   ----  first product title ---->  ',
        resultAction.payload.products[0].title,
      );
      // console.log('FETCH RESULT FAIL ---- ', resultAction.payload.message);
      console.log(
        'STATE RESULT from FetchAllProductsHandler   ----  first product title ---->  ',
        store.getState().Products.entities.byId[1].title,
      );
    } else {
      if (resultAction.payload) {
        // Here we cen get the error message from the rejected promise payload,
        // bcz of using rejectWithValue in error handling of payloadCreator
        //
        //  show toast of  `failure` with error message from `resultAction.payload.errorMessage`
        Alert.alert(
          'Failure - payload error',
          `${resultAction.payload.errorMessage}`,
        );
      } else {
        //  show toast of  `failure` with error message from `resultAction.error.message`
        Alert.alert('Failure - action error', `${resultAction.error.message}`);
      }
    }
  };
  const FetchAllCategoriesHandler = async () => {
    console.log('button pressed');
    const resultAction = await dispatch(FetchAllCategories());
    if (FetchAllCategories.fulfilled.match(resultAction)) {
      // show toast of `success`
      // Alert.alert('Success', 'Data fetched successfully');
      console.log(
        'FETCH RESULT from FetchAllCategoriesHandler  ----  first category name ---->  ',
        resultAction.payload[0],
      );
      // console.log('FETCH RESULT FAIL ---- ', resultAction.payload.message);
      console.log(
        'STATE RESULT from FetchAllCategoriesHandler  ---- first category object ---->  ',
        store.getState().Categories.entities[0],
      );
    } else {
      if (resultAction.payload) {
        // Here we cen get the error message from the rejected promise payload,
        // bcz of using rejectWithValue in error handling of payloadCreator
        //
        //  show toast of  `failure` with error message from `resultAction.payload.errorMessage`
        Alert.alert(
          'Failure - payload error',
          `${resultAction.payload.errorMessage}`,
        );
      } else {
        //  show toast of  `failure` with error message from `resultAction.error.message`
        Alert.alert('Failure - action error', `${resultAction.error.message}`);
      }
    }
  };
  const FetchAllProductsByCategoryHandler = async () => {
    console.log('button pressed');
    const resultAction = await dispatch(
      FetchAllProductsByCategory('smartphones'),
    );
    if (FetchAllProductsByCategory.fulfilled.match(resultAction)) {
      // show toast of `success`
      // Alert.alert('Success', 'Data fetched successfully');
      console.log(
        'FETCH RESULT from  FetchAllProductsByCategoryHandler ----  first product title ---->  ',
        resultAction.payload.products[0].title,
      );
      // console.log('FETCH RESULT FAIL ---- ', resultAction.payload.message);
      console.log(
        'STATE RESULT from  FetchAllProductsByCategoryHandler   ---- first product title ---->  ',
        store.getState().Categories.entities[0].products[0].title,
      );
    } else {
      if (resultAction.payload) {
        // Here we cen get the error message from the rejected promise payload,
        // bcz of using rejectWithValue in error handling of payloadCreator
        //
        //  show toast of  `failure` with error message from `resultAction.payload.errorMessage`
        Alert.alert(
          'Failure - payload error',
          `${resultAction.payload.errorMessage}`,
        );
      } else {
        //  show toast of  `failure` with error message from `resultAction.error.message`
        Alert.alert('Failure - action error', `${resultAction.error.message}`);
      }
    }
  };
  return (
    <>
      <Text>MyCartScreen</Text>
      <View style={{justifyContent: 'space-between', height: '20%'}}>
        <Button title="FetchAllProducts" onPress={FetchAllProductsHandler} />
        <Button
          title="FetchAllCategories"
          onPress={FetchAllCategoriesHandler}
        />
        <Button
          title="FetchAllProductsByCategory"
          onPress={FetchAllProductsByCategoryHandler}
        />
      </View>
    </>
  );
};

export default CartScreen;
