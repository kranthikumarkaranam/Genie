import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import constants from '../util/constants';
import {CartScreen} from '../screens';
import {HomeStack, ProductStack} from './StackNavigation';
import {RootStackParamList} from './routeTypes';
import type {DrawerScreenProps} from '@react-navigation/drawer';
import {IconButton, MD3Colors} from 'react-native-paper';
import Header from '../components/Header';

const Tab = createBottomTabNavigator<RootStackParamList>();

type NavigationPropsT = DrawerScreenProps<RootStackParamList, 'Home'>;

export const BottomTabs = ({navigation}: NavigationPropsT) => {
  const drawerMenuHandler = () => {
    navigation.toggleDrawer();
  };
  return (
    <>
      {/* <IconButton
        icon="camera"
        iconColor={MD3Colors.error50}
        size={20}
        onPress={drawerMenuHandler}
        style={{backgroundColor: constants.PrimaryColor, width: '100%'}}
      /> */}
      <Header menuPress={drawerMenuHandler} />
      <Tab.Navigator
        initialRouteName="HomeTab"
        screenOptions={{
          tabBarActiveTintColor: constants.PrimaryColor,
          headerShown: false,
        }}>
        <Tab.Screen
          name="HomeTab"
          component={HomeStack}
          options={{
            tabBarLabel: 'Home',
            tabBarLabelStyle: {fontSize: 14},
            // tabBarIcon: ({color, size}) => (
            //   <MaterialCommunityIcons
            //     name="home-outline"
            //     color={color}
            //     size={size}
            //   />
            // ),
          }}
        />
        <Tab.Screen
          name="CategoriesTab"
          component={ProductStack}
          options={{
            tabBarLabel: 'Categories',
            tabBarLabelStyle: {fontSize: 14},
            // tabBarIcon: ({color, size}) => (
            //   <MaterialCommunityIcons
            //     name="shape-outline"
            //     color={color}
            //     size={size}
            //   />
            // ),
          }}
        />
        <Tab.Screen
          name="CartTab"
          component={CartScreen}
          options={{
            tabBarLabel: 'Cart',
            tabBarLabelStyle: {fontSize: 14},
            // tabBarBadge: 3,
            // tabBarIcon: ({color, size}) => (
            //   // <MaterialCommunityIcons
            //   //   name="cart-outline"
            //   //   color={color}
            //   //   size={size}
            //   // />
            //   <IconButton
            //     icon="cart-variants"
            //     iconColor={color}
            //     size={size}
            //     onPress={() => console.log('Pressed')}
            //   />
            // ),
          }}
        />
      </Tab.Navigator>
    </>
  );
};
