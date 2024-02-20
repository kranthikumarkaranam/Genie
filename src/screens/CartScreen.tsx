import React from 'react';
import {Text} from 'react-native';
import CartItem from '../components/CartItem';
import ScreenHead from '../components/ScreenHead';

const CartScreen = () => {
  return (
    <>
      <ScreenHead title="My Cart" />
      <CartItem />
      <CartItem />
      <CartItem />
    </>
  );
};

export default CartScreen;
