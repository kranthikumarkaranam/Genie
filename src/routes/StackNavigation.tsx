import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  CategoriesScreen,
  HomeScreen,
  ProductDetailScreen,
  ProductsByCategoryScreen,
  SignInScreen,
  SignUpScreen,
} from '../screens';
import {RootStackParamList} from './routeTypes';
import HomeProductDetailScreen from '../screens/HomeProductDetailScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AuthStack = () => (
  <Stack.Navigator
    initialRouteName="SignUp"
    screenOptions={{headerShown: false}}>
    <Stack.Screen name="SignUp" component={SignUpScreen} />
    <Stack.Screen name="SignIn" component={SignInScreen} />
  </Stack.Navigator>
);

export const HomeStack = () => (
  <Stack.Navigator
    initialRouteName="MyHome"
    screenOptions={{headerShown: false}}>
    <Stack.Screen name="MyHome" component={HomeScreen} />
    <Stack.Screen
      name="HomeProductDetail"
      component={HomeProductDetailScreen}
    />
  </Stack.Navigator>
);

export const ProductStack = () => (
  <Stack.Navigator
    initialRouteName="Categories"
    screenOptions={{headerShown: false}}>
    <Stack.Screen name="Categories" component={CategoriesScreen} />
    <Stack.Screen
      name="ProductsByCategory"
      component={ProductsByCategoryScreen}
    />
    <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
  </Stack.Navigator>
);
