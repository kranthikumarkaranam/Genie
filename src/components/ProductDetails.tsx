import React, {useEffect, useState} from 'react';
import {Alert, Image, ScrollView, StyleSheet, View} from 'react-native';
import {Text} from 'react-native';

import StarRatings from './StarRatings';
import {
  calculateOriginalPrice,
  roundToOneDecimalPlace,
} from '../util/UtilityFunctions';
import {useAppDispatch, useAppSelector} from '../store/pre-Typed';
import {productApiT} from '../types/api-Types';
import ImageCarousel from './ImageCarousel';
import CustomButton from './CustomButton';
import {addProductToCart_ProductsSlice} from '../store/ProductsSlice';
import {addProductToCart_CategoriesSlice} from '../store/CategoriesSlice';

type ProductDetailsT = {
  data: productApiT;
  goToCart: (productId: number) => void;
  buyNow: (productId: number) => void;
};
const ProductDetails = ({data, goToCart, buyNow}: ProductDetailsT) => {
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

  const dispatch = useAppDispatch();

  const originalPrice = calculateOriginalPrice(
    data.price,
    data.discountPercentage,
  );
  const roundedRating = roundToOneDecimalPlace(data.rating);
  const roundedDiscountPercentage = roundToOneDecimalPlace(
    data.discountPercentage,
  );

  const addToCartHandler = (productId: number) => {
    // setIsAddedToCart(true);
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

  const buyNowHandler = (productId: number) => {
    dispatch(addProductToCart_ProductsSlice(productId));
    dispatch(addProductToCart_CategoriesSlice(productId));
    buyNow(productId);
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.category}>{data.category}</Text>
        <StarRatings
          rating={roundedRating}
          ratersCount={data.stock}
          style={styles.rating}
        />
      </View>
      <Text numberOfLines={2} style={styles.title}>
        {data.title}
      </Text>

      <View style={styles.imageContainer}>
        <ImageCarousel images={data.images} />
      </View>

      <Text style={styles.deal}>Deal of the day</Text>
      <View style={styles.priceContainer}>
        <Text style={styles.discount}>
          &#x2212;{`${roundedDiscountPercentage}%`}
        </Text>
        <Text style={styles.price}>${data.price}</Text>
      </View>
      <View style={{flexDirection: 'row'}}>
        <Text style={styles.mrp}>Price: </Text>
        <Text style={[styles.mrp, {textDecorationLine: 'line-through'}]}>
          ${originalPrice}
        </Text>
      </View>

      <Text style={styles.brand}>{`Brand: ${data.brand}`}</Text>

      <Text style={styles.description}>{data.description}</Text>
      <View
        style={{
          width: '100%',
          marginTop: 50,
          marginBottom: 50,
          flex: 1,
          paddingHorizontal: 60,
        }}>
        <CustomButton
          title={isInCart ? 'Go to Cart' : 'Add to Cart'}
          onPress={
            isInCart ? () => goToCart(data.id) : () => addToCartHandler(data.id)
          }
          containerStyle={
            isInCart
              ? styles.goCartButtonContainer
              : styles.addCartButtonContainer
          }
          textStyle={styles.cartButtonText}
        />
        <CustomButton
          title="Buy Now"
          onPress={() => buyNowHandler(data.id)}
          containerStyle={styles.buyNowButtonContainer}
          textStyle={[styles.cartButtonText, {color: 'white'}]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 20,
    justifyContent: 'flex-start',
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  category: {
    fontSize: 16,
    color: '#014D4E',
    fontWeight: '500',
  },
  title: {
    fontSize: 30,
    marginLeft: -2,
    fontWeight: '700',
    color: '#010f1a',
    textTransform: 'capitalize',
    overflow: 'hidden',
  },
  brand: {
    fontSize: 18,
    color: '#014D4E',
    fontWeight: '600',
    marginTop: 8,
    marginLeft: 2,
  },
  rating: {
    marginTop: 0,
  },
  imageContainer: {
    width: '100%',
    height: 200,
    marginTop: 20,
    marginBottom: 80,
  },
  deal: {
    paddingTop: 4,
    alignItems: 'center',
    width: 120,
    height: 30,
    backgroundColor: '#cc0c39',
    borderRadius: 4,
    color: 'white',
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 10,
  },
  price: {
    fontSize: 30,
    fontWeight: '600',
    color: '#010B13',
    marginLeft: 8,
  },
  mrp: {
    fontSize: 16,
    color: '#898e8e',
    marginTop: 5,
    marginLeft: 2,
  },
  discount: {
    fontSize: 30,
    color: '#cc0c39',
    marginLeft: 1,
  },
  description: {
    fontSize: 18,
    marginLeft: 2,
    color: '#0f1111',
    fontWeight: '400',
    marginTop: 8,
    textTransform: 'capitalize',
  },
  addCartButtonContainer: {
    backgroundColor: '#ffd814',
    paddingVertical: 12,
    paddingHorizontal: 0,
    borderRadius: 30,
    elevation: 5,
  },
  cartButtonText: {
    color: '#010f1a',
    fontSize: 20,
    fontWeight: '500',
  },
  goCartButtonContainer: {
    backgroundColor: '#ececec',
    borderWidth: 0.5,
    borderColor: '#898e8e',
    paddingVertical: 12,
    paddingHorizontal: 0,
    borderRadius: 30,
    elevation: 5,
  },
  buyNowButtonContainer: {
    backgroundColor: '#ffa41c',
    marginTop: 14,
    paddingVertical: 12,
    paddingHorizontal: 0,
    borderRadius: 30,
    elevation: 5,
  },
});

export default ProductDetails;
