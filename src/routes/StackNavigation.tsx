import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import {
  CategoriesScreen,
  HomeProductDetailScreen,
  HomeScreen,
  ProductDetailScreen,
  ProductsByCategoryScreen,
  SignInScreen,
  SignUpScreen,
  StartUpScreen,
} from '../screens';
import {RootStackParamList} from './routeTypes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {asyncAuthT} from '../types/store-Types';
import {useEffect, useState} from 'react';
import {Text} from 'react-native';
import LoadingIndicator from '../components/LoadingIndicator';

const Stack = createNativeStackNavigator<RootStackParamList>();

type NavigationPropsT = NativeStackScreenProps<RootStackParamList, 'Auth'>;

export const AuthStack = ({navigation}: NavigationPropsT) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initialRouteHandler = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('AuthToken');
        const storedAuthToken: asyncAuthT | null =
          jsonValue != null ? JSON.parse(jsonValue) : null;

        if (storedAuthToken !== null) {
          navigation.replace('Main'); //  navigate to `Main` if there is a `AuthToken` in AsyncStorage.
          console.log('storedAuthToken  =>  ', storedAuthToken);
        }
        setIsLoading(false);
      } catch (e) {
        console.error('Error reading Auth Token:', e);
      }
    };

    initialRouteHandler(); // Call the initialRouteHandler function to check for the `AuthToken` when the component mounts
  }, []);

  if (isLoading) {
    return <LoadingIndicator />; // Render a loading indicator while checking for the `AuthToken`
  }

  return (
    <Stack.Navigator
      initialRouteName="SignUp"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="StartUp" component={StartUpScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="SignIn" component={SignInScreen} />
    </Stack.Navigator>
  );
};

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
