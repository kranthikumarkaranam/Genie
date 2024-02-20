import React, {useEffect, useState} from 'react';
import {
  Image,
  TouchableNativeFeedback,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import StarRatings from './StarRatings';
import {
  calculateOriginalPrice,
  roundToOneDecimalPlace,
} from '../util/UtilityFunctions';
import {productApiT} from '../types/api-Types';
import CustomButton from './CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAppDispatch} from '../store/pre-Typed';
import {store} from '../store/store';
import {addProductToCart_ProductsSlice} from '../store/ProductsSlice';
import {addProductToCart_CategoriesSlice} from '../store/CategoriesSlice';
interface ProductItemT {
  data: productApiT;
  onPress: (productId: number) => void;
  goToCart: (productId: number) => void;
}
const ProductItem = ({data, onPress, goToCart}: ProductItemT) => {
  const dispatch = useAppDispatch();
  const [isAddedToCart, setIsAddedToCart] = useState<boolean>(false);

  const originalPrice = calculateOriginalPrice(
    data.price,
    data.discountPercentage,
  );
  const roundedRating = roundToOneDecimalPlace(data.rating);
  const roundedDiscountPercentage = roundToOneDecimalPlace(
    data.discountPercentage,
  );

  const addToCartHandler = (productId: number) => {
    setIsAddedToCart(true);
    // Add the item to cart in local storage
    // const cartItems = JSON.parse(
    //   (AsyncStorage.getItem('cartItems') as Promise<string | null>).then((value) => value ?? '[]'),
    // ) as Array<number>;
    // if (!cartItems.includes(productId)) {
    //   cartItems.push(productId);
    //   AsyncStorage.setItem('cartItems', JSON.stringify(cartItems));
    // }
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
              title={isAddedToCart ? 'Go to Cart' : 'Add to Cart'}
              onPress={
                isAddedToCart
                  ? () => goToCart(data.id)
                  : () => addToCartHandler(data.id)
              }
              containerStyle={
                isAddedToCart
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
    fontSize: 10,
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
    backgroundColor: '#ffe100',
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
