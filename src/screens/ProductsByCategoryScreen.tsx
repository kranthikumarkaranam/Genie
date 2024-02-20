import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import {Alert, StyleSheet, Text, View} from 'react-native';
import {RootStackParamList} from '../routes/routeTypes';
import ProductItem from '../components/ProductItem';
import ScreenHead from '../components/ScreenHead';
import {store} from '../store/store';
import {useAppDispatch, useAppSelector} from '../store/pre-Typed';
import {
  FetchAllProductsByCategory,
  removeProductFromCart_CategoriesSlice,
} from '../store/CategoriesSlice';
import {productApiT} from '../types/api-Types';
import {reverseFormatCategory} from '../util/UtilityFunctions';
import ProductList from '../components/ProductList';
import {removeProductFromCart_ProductsSlice} from '../store/ProductsSlice';

type NavigationPropsT = NativeStackScreenProps<
  RootStackParamList,
  'ProductsByCategory'
>;

const ProductsByCategoryScreen = ({route, navigation}: NavigationPropsT) => {
  const {categoryName} = route.params;
  const reverseFormattedCategoryName = reverseFormatCategory(categoryName);
  const dispatch = useAppDispatch();
  const CategoriesList = useAppSelector(state => state.Categories.entities); // Triggers a fetch if the category is

  const Category = CategoriesList.find(
    category => category.name === categoryName,
  );

  let ProductsList: productApiT[] = [];
  // Check if Category is undefined
  if (Category !== undefined) {
    ProductsList = Category.products;
  } else {
    // Handle the case when Category is undefined
    Alert.alert('Error', `The ${categoryName}'s products were not found.`);
    navigation.replace('Categories');
  }
  useEffect(() => {
    // Fetch the products when this screen is first shown
    FetchAllProductsByCategoryHandler(reverseFormattedCategoryName);
  }, [reverseFormattedCategoryName]);

  const FetchAllProductsByCategoryHandler = async (categoryName: string) => {
    const resultAction = await dispatch(
      FetchAllProductsByCategory(categoryName),
    );
    if (FetchAllProductsByCategory.fulfilled.match(resultAction)) {
      // dispatch(setProducts(resultAction.payload));
      // Alert.alert('Success', 'Data fetched successfully');
      console.log(
        'FETCH RESULT from  FetchAllProductsByCategoryHandler ----  first product title ---->  ',
        resultAction.payload.products[0].title,
      );
      console.log(
        'STATE RESULT from  FetchAllProductsByCategoryHandler   ---- first product title ---->  ',
        store.getState().Categories.entities[0].products[0].title,
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

  const backPressHandler = () => {
    navigation.goBack();
  };

  const itemPressHandler = (id: number) => {
    navigation.navigate('ProductDetail', {
      productID: id,
    });
  };
  const goToCartHandler = (productId: number) => {
    navigation.navigate('CartTab', {productID: productId});
    // dispatch(removeProductFromCart_ProductsSlice(productId));
    // dispatch(removeProductFromCart_CategoriesSlice(productId));
  };

  return (
    <>
      <ScreenHead
        title={categoryName}
        isBack={true}
        backPress={backPressHandler}
      />
      <ProductList
        data={ProductsList}
        itemPress={itemPressHandler}
        goToCart={goToCartHandler}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
  },
});

export default ProductsByCategoryScreen;
