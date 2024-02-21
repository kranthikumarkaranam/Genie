import {
  Image,
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableNativeFeedback,
} from 'react-native';
import StarRatings from './StarRatings';
import {
  CurrencyComponent,
  calculateOriginalPrice,
  roundToOneDecimalPlace,
} from '../util/UtilityFunctions';
import {productApiT} from '../types/api-Types';
import {useAppDispatch, useAppSelector} from '../store/pre-Typed';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import constants from '../util/constants';
import {useEffect, useState} from 'react';
import {
  addProductToCart_ProductsSlice,
  removeProductFromCart_ProductsSlice,
} from '../store/ProductsSlice';
import {
  addProductToCart_CategoriesSlice,
  removeProductFromCart_CategoriesSlice,
} from '../store/CategoriesSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {asyncCartT} from '../types/store-Types';

interface CartItemT {
  data: productApiT;
  // cartCount: number;
}
const CartItem = ({data}: CartItemT) => {
  const dispatch = useAppDispatch();
  // const [cartCount, setCartCount] = useState<number>(data.cartCount);

  const originalPrice = calculateOriginalPrice(
    data.price,
    data.discountPercentage,
  );

  const plusPressHandler = async (productId: number) => {
    try {
      const jsonValue = await AsyncStorage.getItem('cartItems');
      const storedCartItems: asyncCartT[] | null =
        jsonValue != null ? JSON.parse(jsonValue) : null;
      if (storedCartItems) {
        const existingProduct = storedCartItems.find(
          item => item.productId === productId,
        );
        if (existingProduct) {
          existingProduct.quantity += 1;
        }
      }
      try {
        const jsonValue = JSON.stringify(storedCartItems);
        await AsyncStorage.setItem('cartItems', jsonValue);

        console.log('cartItems in asyncStorage => ', storedCartItems);
      } catch (e) {
        // saving error
        console.error('Error saving cart items:', e);
      }
    } catch (e) {
      // error reading value
      console.error('Error reading cart items:', e);
    }
    dispatch(addProductToCart_ProductsSlice(data.id));
    dispatch(addProductToCart_CategoriesSlice(data.id));
  };
  const minusPressHandler = async (productId: number) => {
    try {
      const jsonValue = await AsyncStorage.getItem('cartItems');
      const storedCartItems: asyncCartT[] | null =
        jsonValue != null ? JSON.parse(jsonValue) : null;
      let cartItems: asyncCartT[] | null = storedCartItems;
      if (storedCartItems) {
        const existingProduct = storedCartItems.find(
          item => item.productId === productId,
        );
        if (existingProduct) {
          if (existingProduct.quantity === 1) {
            const updatedCartItems = storedCartItems.filter(
              item => item.productId !== productId,
            );
            cartItems = updatedCartItems;
          } else {
            existingProduct.quantity -= 1;
          }
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
    dispatch(removeProductFromCart_ProductsSlice(data.id));
    dispatch(removeProductFromCart_CategoriesSlice(data.id));
  };

  return (
    <>
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
          <Text style={styles.title} numberOfLines={2}>
            {data.title}
          </Text>

          <View style={styles.priceContainer}>
            <Text style={styles.price}>
              {/* ${cartCount === 0 ? data.price : data.price * cartCount} */}$
              {data.price * data.cartCount}
            </Text>
            <Text style={[styles.mrp, {textDecorationLine: 'line-through'}]}>
              {/* ${cartCount === 0 ? originalPrice : originalPrice * cartCount} */}
              ${originalPrice * data.cartCount}
            </Text>
          </View>
          <View style={styles.buttonsContainer}>
            <TouchableNativeFeedback onPress={() => minusPressHandler(data.id)}>
              <View style={[styles.icon, {borderRightWidth: 0.8}]}>
                {data.cartCount === 0 || data.cartCount === 1 ? (
                  <Ionicons name="trash-outline" size={20} color="#393939" />
                ) : (
                  <AntDesign name="minus" size={22} color="#393939" />
                )}
              </View>
            </TouchableNativeFeedback>
            <View style={[styles.icon, {backgroundColor: 'white'}]}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: '600',
                  color: constants.PrimaryColor,
                }}>
                {data.cartCount === 0 ? 1 : data.cartCount}
              </Text>
            </View>
            <TouchableNativeFeedback onPress={() => plusPressHandler(data.id)}>
              <View style={[styles.icon, {borderLeftWidth: 0.8}]}>
                <AntDesign name="plus" size={22} color="#393939" />
              </View>
            </TouchableNativeFeedback>
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
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  textContainer: {
    padding: 8,
    marginLeft: 24,
    backgroundColor: 'white',
    minWidth: '66%',
    maxWidth: '70%',
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
