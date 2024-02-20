import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import constants from '../util/constants';
import {CartScreen} from '../screens';
import {HomeStack, ProductStack} from './StackNavigation';
import {RootStackParamList} from './routeTypes';
import type {DrawerScreenProps} from '@react-navigation/drawer';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Header from '../components/Header';
import {useAppSelector} from '../store/pre-Typed';
import {productApiT} from '../types/api-Types';

const Tab = createBottomTabNavigator<RootStackParamList>();

type NavigationPropsT = DrawerScreenProps<RootStackParamList, 'Home'>;

export const BottomTabs = ({navigation}: NavigationPropsT) => {
  const products = useAppSelector(state => state.Products.entities);
  const filteredCartProducts = products.filter(
    (product: productApiT) => product.isInCart === true,
  );

  const badgeCount = filteredCartProducts.length;

  const drawerMenuHandler = () => {
    navigation.toggleDrawer();
  };
  return (
    <>
      <Header menuPress={drawerMenuHandler} />
      <Tab.Navigator
        initialRouteName="HomeTab"
        screenOptions={{
          tabBarActiveTintColor: constants.PrimaryColor,
          headerShown: false,
          tabBarLabelStyle: {fontSize: 15},
        }}>
        <Tab.Screen
          name="HomeTab"
          component={HomeStack}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({color, size, focused}) => (
              <Ionicons
                name={focused ? 'home' : 'home'}
                color={color}
                size={28}
              />
            ),
          }}
        />
        <Tab.Screen
          name="CategoriesTab"
          component={ProductStack}
          options={{
            tabBarLabel: 'Categories',
            tabBarIcon: ({color, size, focused}) => (
              <AntDesign
                name={focused ? 'appstore1' : 'appstore1'}
                color={color}
                size={24}
              />
            ),
          }}
        />
        <Tab.Screen
          name="CartTab"
          component={CartScreen}
          options={{
            tabBarLabel: 'Cart',
            tabBarBadge: badgeCount,
            tabBarIcon: ({color, size, focused}) => (
              <MaterialIcons
                name={focused ? 'shopping-cart' : 'shopping-cart'}
                color={color}
                size={28}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
};
