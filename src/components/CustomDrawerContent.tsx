import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerContentComponentProps,
  DrawerItem,
} from '@react-navigation/drawer';
import {Image, StyleSheet, Text, View} from 'react-native';
import {useAppDispatch, useAppSelector} from '../store/pre-Typed';
import constants from '../util/constants';
import {TouchableNativeFeedback} from 'react-native';
import {clearAll} from '../store/MyUserSlice';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const CustomDrawerContent = (props: DrawerContentComponentProps) => {
  const {firstName, lastName, image} = useAppSelector(state => state.MyUser);
  const dispatch = useAppDispatch();

  const fullName = `${firstName} ${lastName}`.trim();

  const handleProfilePress = () => {
    // Navigate to UpdateProfileScreen
    props.navigation.navigate('UpdateProfile');
  };
  const LogOutHandler = () => {
    // Remove all store data and navigate to Login Screen on logout
    dispatch(clearAll());
    props.navigation.navigate('Auth', {screen: 'SignIn'});
  };

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{flex: 1}}>
      <TouchableNativeFeedback onPress={handleProfilePress}>
        <View style={styles.container}>
          {image ? (
            <Image
              style={{width: 65, height: 65, borderRadius: 30}}
              source={{
                uri: image,
              }}
            />
          ) : (
            <Image
              style={{width: 65, height: 65, borderRadius: 30}}
              source={constants.AvatarPlaceholder}
            />
          )}
          <View style={styles.textContainer}>
            <Text style={styles.text}>{fullName}</Text>
            <Text style={styles.smallText}>View Profile</Text>
          </View>
        </View>
      </TouchableNativeFeedback>

      <View style={styles.itemsContainer}>
        <DrawerItemList {...props} />
      </View>
      <View style={{height: 0.2, backgroundColor: 'grey'}}></View>
      <DrawerItem
        label="Log Out"
        labelStyle={{marginLeft: -16, fontSize: 18}}
        inactiveTintColor="red"
        onPress={LogOutHandler}
        icon={({color, size, focused}) => (
          <MaterialIcons name="logout" color={color} size={size} />
        )}
      />
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 30,
  },
  textContainer: {
    marginLeft: 8,
  },
  text: {fontWeight: '500', fontSize: 22},
  smallText: {
    fontWeight: '400',
    fontSize: 12,
  },
  itemsContainer: {
    flex: 1,
  },
});

export default CustomDrawerContent;
