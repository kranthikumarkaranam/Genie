import React from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import {Text} from 'react-native';
import {Image, StyleSheet, View} from 'react-native';

type StarRatingsT = {
  rating: number;
  ratersCount: number;
  style?: StyleProp<ViewStyle>;
};
const StarRatings = ({rating, ratersCount, style}: StarRatingsT) => {
  const totalStars = 5; // Total number of stars
  const fullStars = Math.floor(rating); // Number of full stars
  const hasHalfStar = rating - fullStars >= 0.5; // Whether there's a half star
  const emptyStars = totalStars - fullStars - (hasHalfStar ? 1 : 0); // Number of empty stars

  // Function to render stars of a given type (full, half, or empty)
  const renderStars = (type: string, count: number) => {
    const stars = [];
    for (let i = 0; i < count; i++) {
      if (type === 'full') {
        stars.push(
          <Image
            key={`star-${i}`}
            style={styles.star}
            source={require(`../assets/Images/stars/full-star.png`)}
          />,
        );
      } else if (type === 'half') {
        stars.push(
          <Image
            key={`star-${i}`}
            style={styles.star}
            source={require(`../assets/Images/stars/half-star.png`)}
          />,
        );
      } else if (type === 'empty') {
        stars.push(
          <Image
            key={`star-${i}`}
            style={styles.star}
            source={require(`../assets/Images/stars/empty-star.png`)}
          />,
        );
      }
    }
    return stars;
  };

  return (
    <View style={[styles.ratingContainer, style]}>
      <Text style={styles.ratingNumber}>{rating}</Text>
      <View style={{flexDirection: 'row'}}>
        {renderStars('full', fullStars)}
        {hasHalfStar && renderStars('half', 1)}
        {renderStars('empty', emptyStars)}
      </View>
      <Text style={styles.ratersCount}>({ratersCount})</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  ratingContainer: {
    height: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 3,
  },
  star: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
  },
  ratingNumber: {
    color: '#014D4E',
    marginTop: 2,
    marginRight: 10,
    fontSize: 14,
  },
  ratersCount: {
    color: '#898e8e',
    marginTop: 4,
    marginLeft: 4,
    fontSize: 12,
  },
});
export default StarRatings;
