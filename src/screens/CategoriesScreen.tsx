import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../routes/routeTypes';
import ScreenHead from '../components/ScreenHead';
import {useAppDispatch, useAppSelector} from '../store/pre-Typed';
import {Category, FetchAllCategories} from '../store/CategoriesSlice';
import {store} from '../store/store';
import {reverseFormatCategory} from '../util/UtilityFunctions';
import {FlatList} from 'react-native';
import LoadingIndicator from '../components/LoadingIndicator';

type NavigationPropsT = NativeStackScreenProps<
  RootStackParamList,
  'Categories'
>;

const CategoriesScreen = ({navigation}: NavigationPropsT) => {
  const dispatch = useAppDispatch();
  const CategoriesList = useAppSelector(state => state.Categories.entities);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch the categories when this screen is first shown
    FetchAllCategoriesHandler().then(() => {
      setIsLoading(false);
    });
  }, []);

  const FetchAllCategoriesHandler = async () => {
    const resultAction = await dispatch(FetchAllCategories());
    if (FetchAllCategories.fulfilled.match(resultAction)) {
      // Alert.alert('Success', 'Data fetched successfully');
      console.log(
        'FETCH RESULT from FetchAllCategoriesHandler  ----  first category name ---->  ',
        resultAction.payload[0],
      );
      console.log(
        'STATE RESULT from FetchAllCategoriesHandler  ---- first category object ---->  ',
        store.getState().Categories.entities[0],
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

  const getImageForCategory = (category: string) => {
    switch (category) {
      case 'Smartphones':
        return require('../assets/Images/ProductCategories/Smartphones.png');
      case 'Laptops':
        return require('../assets/Images/ProductCategories/Laptops.png');
      case 'Fragrances':
        return require('../assets/Images/ProductCategories/Fragrances.png');
      case 'Skincare':
        return require('../assets/Images/ProductCategories/Skincare.png');
      case 'Groceries':
        return require('../assets/Images/ProductCategories/Groceries.png');
      case 'Home Decoration':
        return require('../assets/Images/ProductCategories/Home_Decoration.png');
      case 'Furniture':
        return require('../assets/Images/ProductCategories/Furniture.png');
      case 'Tops':
        return require('../assets/Images/ProductCategories/Tops.png');
      case 'Womens Dresses':
        return require('../assets/Images/ProductCategories/Womens_Dresses.png');
      case 'Womens Shoes':
        return require('../assets/Images/ProductCategories/Womens_Shoes.png');
      case 'Mens Shirts':
        return require('../assets/Images/ProductCategories/Mens_Shirts.png');
      case 'Mens Shoes':
        return require('../assets/Images/ProductCategories/Mens_Shoes.png');
      case 'Mens Watches':
        return require('../assets/Images/ProductCategories/Mens_Watches.png');
      case 'Womens Watches':
        return require('../assets/Images/ProductCategories/Womens_Watches.png');
      case 'Womens Bags':
        return require('../assets/Images/ProductCategories/Womens_Bags.png');
      case 'Womens Jewellery':
        return require('../assets/Images/ProductCategories/Womens_Jewellery.png');
      case 'Sunglasses':
        return require('../assets/Images/ProductCategories/Sunglasses.png');
      case 'Automotive':
        return require('../assets/Images/ProductCategories/Automotive.png');
      case 'Motorcycle':
        return require('../assets/Images/ProductCategories/Motorcycle.png');
      case 'Lighting':
        return require('../assets/Images/ProductCategories/Lighting.png');
      default:
        return require('../assets/Images/ProductCategories/Product_Categories_Placeholder.png');
    }
  };

  const categorySelectHandler = (category: string) => {
    navigation.navigate('ProductsByCategory', {categoryName: category});
  };

  const renderItem = ({item}: {item: Category}) => (
    <TouchableOpacity
      onPress={() => {
        categorySelectHandler(item.name);
      }}>
      <View style={[styles.categoryContainer]}>
        <Image
          source={getImageForCategory(item.name)}
          style={styles.categoryImage}
        />
        <Text style={styles.categoryText}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <>
      <ScreenHead title="All Categories" />
      {isLoading ? (
        <LoadingIndicator size="small" paddingHorizontal={136} />
      ) : (
        <FlatList
          data={CategoriesList}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          numColumns={3}
          contentContainerStyle={styles.flatListContainer}
        />
      )}
    </>
  );
};

const screenWidth = Dimensions.get('window').width;
const itemWidth = (screenWidth - 20) / 4;

const styles = StyleSheet.create({
  flatListContainer: {
    paddingVertical: 20,
    paddingLeft: 38,
    justifyContent: 'space-between',
  },
  categoryContainer: {
    width: itemWidth,
    alignItems: 'center',
    marginBottom: 20,
    marginRight: 20,
  },
  categoryImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  categoryText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default CategoriesScreen;
