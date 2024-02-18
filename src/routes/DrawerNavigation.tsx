import {createDrawerNavigator} from '@react-navigation/drawer';
import CustomDrawerContent from '../components/CustomDrawerContent';
import {MyOrdersScreen} from '../screens';
import {BottomTabs} from './TabNavigation';
import {RootStackParamList} from './routeTypes';

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
        }}
        initialRouteName="MyOrders"
        drawerContent={props => <CustomDrawerContent {...props} />}>
        <Drawer.Screen name="Home" component={BottomTabs} />
        <Drawer.Screen name="MyOrders" component={MyOrdersScreen} />
      </Drawer.Navigator>
    </>
  );
};
