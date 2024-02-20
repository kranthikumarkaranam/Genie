import React from 'react';
import {Alert, StyleSheet, Text, View} from 'react-native';
import CustomButton from './CustomButton';
interface PlaceOrderT {
  TotalOfOriginalPrices: number;
  TotalOfProductPrices: number;
}
const PlaceOrder = ({
  TotalOfOriginalPrices,
  TotalOfProductPrices,
}: PlaceOrderT) => {
  const handlePress = () => {
    console.log('Placing Order');
    Alert.alert(
      'Place Order',
      `You're about to place an order!
Are you sure?`,
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ],
      {cancelable: true},
    );
  };
  return (
    <View style={styles.container}>
      <View>
        <Text style={{fontSize: 14, textDecorationLine: 'line-through'}}>
          ${TotalOfOriginalPrices - TotalOfProductPrices}
        </Text>
        <Text style={{fontSize: 26, fontWeight: 'bold', color: '#333'}}>
          ${TotalOfProductPrices}
        </Text>
      </View>
      <CustomButton
        title="Place Order"
        onPress={handlePress}
        containerStyle={styles.placeOrderContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingVertical: 10,
    paddingHorizontal: 10,
    elevation: 0.6,
    borderWidth: 0.6,
    borderColor: 'grey',
  },
  placeOrderContainer: {
    // backgroundColor: '#ffa41c',
    backgroundColor: '#fb641b',
    borderRadius: 8,
    elevation: 5,
    width: '45%',
  },
});

export default PlaceOrder;
