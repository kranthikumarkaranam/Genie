import React, {useEffect, useState} from 'react';
import {
  Image,
  TouchableNativeFeedback,
  StyleSheet,
  Text,
  View,
  Alert,
} from 'react-native';
import StarRatings from './StarRatings';
import {
  calculateOriginalPrice,
  roundToOneDecimalPlace,
} from '../util/UtilityFunctions';
import {productApiT} from '../types/api-Types';
import CustomButton from './CustomButton';
import {useAppDispatch, useAppSelector} from '../store/pre-Typed';
import {store} from '../store/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {addProductToCart_ProductsSlice} from '../store/ProductsSlice';
import {addProductToCart_CategoriesSlice} from '../store/CategoriesSlice';
import {asyncCartT} from '../types/store-Types';
interface ProductItemT {
  data: productApiT;
  onPress: (productId: number) => void;
  goToCart: (productId: number) => void;
}

const ProductItem = ({data, onPress, goToCart}: ProductItemT) => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(state => state.Products.entities);
  const product = products.find(el => el.id === data.id);

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
    isInCart: false,
    cartCount: 0,
  };
  // Check if category & product are undefined
  if (product !== undefined) {
    productDetails = product;
  } else {
    // Handle the case when they are undefined
    Alert.alert('Error', `The product details were not found.`);
  }

  const [isInCart, setIsInCart] = useState<boolean>(productDetails.isInCart);
  useEffect(() => {
    // Update the isInCart state whenever the product.isInCart property changes
    setIsInCart(productDetails.isInCart);
  }, [productDetails.isInCart]);

  const originalPrice = calculateOriginalPrice(
    data.price,
    data.discountPercentage,
  );
  const roundedRating = roundToOneDecimalPlace(data.rating);
  const roundedDiscountPercentage = roundToOneDecimalPlace(
    data.discountPercentage,
  );

  const addToCartHandler = async (productId: number) => {
    try {
      const jsonValue = await AsyncStorage.getItem('cartItems');
      const storedCartItems: asyncCartT[] | null =
        jsonValue != null ? JSON.parse(jsonValue) : null;
      let cartItems: asyncCartT[] = [];
      if (storedCartItems === null) {
        cartItems = [];
        cartItems.push({productId: productId, quantity: 1});
      } else {
        cartItems = storedCartItems;
        const existingProduct = cartItems.find(
          item => item.productId === productId,
        );
        if (existingProduct) {
          existingProduct.quantity += 1;
        } else {
          cartItems.push({productId: productId, quantity: 1});
        }
      }
      try {
        const jsonValue = JSON.stringify(cartItems);
        await AsyncStorage.setItem('cartItems', jsonValue);

        console.log('cartItems in asyncStorage => ', cartItems);
      } catch (e) {
        // saving error
        console.error('Error saving cart items:', e);
      }
    } catch (e) {
      // error reading value
      console.error('Error reading cart items:', e);
    }
    dispatch(addProductToCart_ProductsSlice(productId));
    dispatch(addProductToCart_CategoriesSlice(productId));
  };

  return (
    <TouchableNativeFeedback onPress={() => onPress(data.id)}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{
              uri: data.thumbnail,
            }}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.category}>{data.category}</Text>
          <Text style={styles.title} numberOfLines={1}>
            {data.title}
          </Text>
          <StarRatings rating={roundedRating} ratersCount={data.stock} />
          <View style={styles.priceContainer}>
            <Text style={styles.price}>${data.price}</Text>
            <Text style={styles.mrp}>Price: </Text>
            <Text style={[styles.mrp, {textDecorationLine: 'line-through'}]}>
              ${originalPrice}
            </Text>
          </View>
          <Text
            style={
              styles.discount
            }>{`(${roundedDiscountPercentage}% off)`}</Text>
          <Text style={styles.description} numberOfLines={1}>
            {data.description}
          </Text>
          <View
            style={{
              width: '100%',
              marginTop: 18,
              height: 40,
            }}>
            <CustomButton
              title={isInCart ? 'Go to Cart' : 'Add to Cart'}
              onPress={
                isInCart
                  ? () => goToCart(data.id)
                  : () => addToCartHandler(data.id)
              }
              containerStyle={
                isInCart
                  ? styles.goCartButtonContainer
                  : styles.addCartButtonContainer
              }
              textStyle={styles.cartButtonText}
            />
          </View>
        </View>
      </View>
    </TouchableNativeFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    maxHeight: 220,
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginBottom: 10,
    elevation: 3, // for Android
  },
  imageContainer: {
    borderRadius: 8,
    flex: 1,
    backgroundColor: '#ececec',
    minWidth: '45%',
    justifyContent: 'center',
  },
  image: {
    width: '90%',
    height: '100%',
    resizeMode: 'contain',
    marginHorizontal: 10,
  },
  textContainer: {
    padding: 8,
    maxWidth: '55%',
    flexGrow: 1,
    justifyContent: 'flex-start',
  },
  category: {
    fontSize: 11,
    color: '#585f66',
    fontWeight: '500',
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '500',
    color: '#010f1a',
    textTransform: 'capitalize',
  },

  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 3,
  },
  price: {
    fontSize: 22,
    fontWeight: '600',
    color: '#010B13',
    marginRight: 7,
  },
  mrp: {
    fontSize: 12,
    color: '#898e8e',
    marginTop: 6,
  },
  discount: {
    fontSize: 12,
    marginTop: 12,
    color: '#cc0c39',
    marginLeft: 1,
  },
  description: {
    fontSize: 12,
    marginLeft: 2,
    color: '#898e8e',
    textTransform: 'capitalize',
  },
  addCartButtonContainer: {
    backgroundColor: '#ffd814',
    paddingVertical: 8,
    paddingHorizontal: 0,
    borderRadius: 8,
    elevation: 4,
  },
  cartButtonText: {
    color: '#010f1a',
    fontSize: 14,
    fontWeight: '400',
  },
  goCartButtonContainer: {
    backgroundColor: '#ececec',
    borderWidth: 0.3,
    borderColor: '#898e8e',
    paddingVertical: 8,
    paddingHorizontal: 0,
    borderRadius: 8,
    elevation: 4,
  },
});

export default ProductItem;
