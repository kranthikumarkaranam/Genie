import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {asyncOrdersT} from '../types/store-Types';

interface OrderItemT {
  data: asyncOrdersT;
}

const OrderItem = ({data}: OrderItemT) => {
  const formatDate = (date: Date) => {
    const formattedDate = new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(date);
    return formattedDate;
  };

  return (
    <View style={styles.container}>
      <View style={[styles.rowContainer, {paddingBottom: 4, paddingTop: 0}]}>
        <Text style={styles.heading}>{formatDate(data.orderedOn)}</Text>
        <Text style={[styles.heading, {color: data.status.color}]}>
          {data.status.text}
        </Text>
      </View>
      <View style={styles.margin}></View>

      <View style={[styles.rowContainer, {paddingBottom: 8}]}>
        <View style={styles.itemsContainer}>
          <Text style={[styles.rowText, {fontSize: 16}]}>Order ID: </Text>
          <Text style={[styles.rowText, {fontWeight: '500'}]}>
            #{data.orderId}
          </Text>
        </View>
        <View style={styles.itemsContainer}>
          <Text style={[styles.rowText, {fontSize: 16}]}>Sold to: </Text>
          <Text style={[styles.rowText, {fontWeight: '500'}]}>
            {data.orderedBy}
          </Text>
        </View>
      </View>
      <View style={styles.rowContainer}>
        <View style={styles.itemsContainer}>
          <Text style={[styles.rowText, {fontSize: 16}]}>Total Price: </Text>
          <Text style={[styles.rowText, {fontWeight: '500'}]}>
            {data.orderTotal}
          </Text>
        </View>
        <View style={styles.itemsContainer}>
          <Text style={[styles.rowText, {fontSize: 16}]}>No. of Items: </Text>
          <Text style={[styles.rowText, {fontWeight: '500'}]}>
            {data.orderedProducts.length}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginHorizontal: 10,
    backgroundColor: '#f2f2f2',
    marginBottom: 12,
    elevation: 7,
    borderRadius: 10,
  },
  heading: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    paddingVertical: 12,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  itemsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowText: {fontSize: 18, color: '#333'},
  margin: {height: 0.4, backgroundColor: 'grey', elevation: 0.2},
});

export default OrderItem;
