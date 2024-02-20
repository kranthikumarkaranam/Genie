import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {CurrencyComponent} from '../util/UtilityFunctions';
interface CartFooterT {
  noOfItems: number;
  TotalOfOriginalPrices: number;
  TotalOfProductPrices: number;
}
const CartFooter = ({
  noOfItems,
  TotalOfOriginalPrices,
  TotalOfProductPrices,
}: CartFooterT) => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.heading}>Price Details</Text>
        <View style={[styles.rowContainer, {paddingBottom: 4}]}>
          <Text style={styles.rowText}>
            {noOfItems === 1
              ? `Price (${noOfItems} item)`
              : `Price (${noOfItems} items)`}
          </Text>
          <Text style={styles.rowText}>
            {CurrencyComponent(TotalOfOriginalPrices)}
          </Text>
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.rowText}>Discount</Text>
          <Text style={[styles.rowText, {color: '#3b903f'}]}>
            &#x2212;
            {`${CurrencyComponent(
              TotalOfOriginalPrices - TotalOfProductPrices,
            )}`}
          </Text>
        </View>
        <View style={styles.margin}></View>
        <View style={[styles.rowContainer, {paddingVertical: 12}]}>
          <Text style={[styles.rowText, {fontWeight: '600'}]}>
            Total Amount
          </Text>
          <Text style={[styles.rowText, {fontWeight: '600'}]}>
            {CurrencyComponent(TotalOfProductPrices)}
          </Text>
        </View>
        <View style={styles.margin}></View>

        <Text style={styles.savings}>{`You will save $${
          TotalOfOriginalPrices - TotalOfProductPrices
        } on this order`}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    paddingVertical: 12,
  },
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  rowText: {fontSize: 18, color: '#333'},
  margin: {height: 0.4, backgroundColor: 'grey', elevation: 0.2},
  savings: {
    fontSize: 18,
    color: '#3b903f',
    fontWeight: '600',
    paddingVertical: 12,
  },
});

export default CartFooter;
