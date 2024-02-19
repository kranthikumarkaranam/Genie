import React from 'react';
import {Alert, Image, ScrollView, StyleSheet, View} from 'react-native';
import {Text} from 'react-native';

import StarRatings from './StarRatings';
import {
  calculateOriginalPrice,
  roundToOneDecimalPlace,
} from '../util/UtilityFunctions';
import {useAppSelector} from '../store/pre-Typed';
import {productApiT} from '../types/api-Types';
import ImageCarousel from './ImageCarousel';

type ProductDetailsT = {
  data: productApiT;
};
const ProductDetails = ({data}: ProductDetailsT) => {
  const originalPrice = calculateOriginalPrice(
    data.price,
    data.discountPercentage,
  );
  const roundedRating = roundToOneDecimalPlace(data.rating);
  const roundedDiscountPercentage = roundToOneDecimalPlace(
    data.discountPercentage,
  );
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
        <Text style={styles.discount}>{`-${roundedDiscountPercentage}%`}</Text>
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
      <Text style={styles.description}>{data.description}</Text>
      <Text style={styles.description}>{data.description}</Text>
      <Text style={styles.description}>{data.description}</Text>
      <Text style={styles.description}>{data.description}</Text>
      <Text style={styles.description}>{data.description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
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
});

export default ProductDetails;
