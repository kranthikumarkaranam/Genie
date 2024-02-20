import {Image, StyleSheet, Text, View, Alert} from 'react-native';
import StarRatings from './StarRatings';
import {
  calculateOriginalPrice,
  roundToOneDecimalPlace,
} from '../util/UtilityFunctions';
import {productApiT} from '../types/api-Types';
import {useAppDispatch, useAppSelector} from '../store/pre-Typed';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import constants from '../util/constants';

const CartItem = () => {
  const products = useAppSelector(state => state.Products.entities);

  const product = products.find(p => p.id === 1);

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

  const originalPrice = calculateOriginalPrice(
    productDetails.price,
    productDetails.discountPercentage,
  );
  const roundedRating = roundToOneDecimalPlace(productDetails.rating);
  const roundedDiscountPercentage = roundToOneDecimalPlace(
    productDetails.discountPercentage,
  );

  return (
    <>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{
              uri: productDetails.thumbnail,
            }}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title} numberOfLines={2}>
            {productDetails.title}
          </Text>

          <View style={styles.priceContainer}>
            <Text style={styles.price}>${productDetails.price}</Text>
            <Text style={styles.mrp}></Text>
            <Text style={[styles.mrp, {textDecorationLine: 'line-through'}]}>
              ${originalPrice}
            </Text>
          </View>
          <View style={styles.buttonsContainer}>
            <View style={[styles.icon, {borderRightWidth: 0.8}]}>
              <AntDesign name="minus" size={22} color="#393939" />
              {/* <Ionicons name="trash-outline" size={20} color="#393939" /> */}
            </View>
            <View style={[styles.icon, {backgroundColor: 'white'}]}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: '600',
                  color: constants.PrimaryColor,
                }}>
                3
              </Text>
            </View>
            <View style={[styles.icon, {borderLeftWidth: 0.8}]}>
              <AntDesign name="plus" size={22} color="#393939" />
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    maxHeight: 120,
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 0.3,
    borderColor: '#ececec',
    padding: 12,
    paddingLeft: 20,
    alignItems: 'center',
    marginBottom: 10,
    elevation: 1, // for Android
  },
  imageContainer: {
    borderRadius: 8,
    flex: 1,
    backgroundColor: '#ececec',
    minWidth: '25%',
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
    marginLeft: 24,
    backgroundColor: 'white',
    maxWidth: '55%',
    flexGrow: 1,
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 18,
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
    fontSize: 20,
    fontWeight: '600',
    color: '#010B13',
    marginRight: 7,
  },
  mrp: {
    fontSize: 13,
    color: '#898e8e',
    marginTop: 6,
  },
  buttonsContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 3,
    borderColor: '#908e8e',
    borderWidth: 0.4,
    width: '60%',
    height: 'auto',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: 18,
    marginBottom: 6,
    elevation: 4,
  },
  icon: {
    width: '33%',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ececec',
    borderColor: '#908e8e',
  },
});

export default CartItem;
