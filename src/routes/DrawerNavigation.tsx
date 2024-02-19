import {createDrawerNavigator} from '@react-navigation/drawer';
import CustomDrawerContent from '../components/CustomDrawerContent';
import {MyOrdersScreen} from '../screens';
import {BottomTabs} from './TabNavigation';
import {RootStackParamList} from './routeTypes';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Drawer = createDrawerNavigator<RootStackParamList>();

export const SideDrawer = () => {
  return (
    <>
      <Drawer.Navigator
        screenOptions={{
          drawerStyle: {
            width: 240,
          },
          drawerActiveBackgroundColor: '#e3effc',
          drawerInactiveBackgroundColor: '#ededed',
          drawerItemStyle: {
            borderWidth: 0.3,
            borderColor: '#E0E0E0',
            borderRadius: 10,
            elevation: 4,
          },
          headerShown: false,
          drawerLabelStyle: {marginLeft: -16, fontSize: 16},
        }}
        initialRouteName="Home"
        drawerContent={props => <CustomDrawerContent {...props} />}>
        <Drawer.Screen
          name="Home"
          component={BottomTabs}
          options={{
            drawerIcon: ({focused, color, size}) => (
              <Ionicons
                name={focused ? 'home-outline' : 'home-outline'}
                color={color}
                size={size}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="MyOrders"
          component={MyOrdersScreen}
          options={{
            drawerIcon: ({focused, color, size}) => (
              <SimpleLineIcons
                name={focused ? 'social-dropbox' : 'social-dropbox'}
                color={color}
                size={size}
              />
            ),
          }}
        />
      </Drawer.Navigator>
    </>
  );
};
