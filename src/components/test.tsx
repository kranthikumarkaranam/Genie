import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';

interface ProductItemT {
  product: any;
  onAddToCart: (product: any) => void;
  onRemoveFromCart: (product: any) => void;
  inCart: boolean;
}

const ProductItem: React.FC<ProductItemT> = ({
  product,
  onAddToCart,
  onRemoveFromCart,
  inCart,
}) => {
  const handleAddToCart = () => {
    onAddToCart(product);
  };

  const handleRemoveFromCart = () => {
    onRemoveFromCart(product);
  };

  const getDiscountedPrice = () => {
    const discount = product.price * (product.discountPercentage / 100);
    return product.price - discount;
  };

  const getDiscountPercentageBadge = () => {
    if (product.discountPercentage > 0) {
      return (
        <View style={styles.discountBadge}>
          <Text style={styles.discountText}>
            {product.discountPercentage}% off
          </Text>
        </View>
      );
    }
    return null;
  };

  return (
    <View style={styles.container}>
      {/* <Text style={styles.price}>
            ${product.price}
            {product.discountPercentage > 0 && (
              <Text style={styles.discountedPrice}>
                ${getDiscountedPrice().toFixed(2)}
              </Text>
            )}
          </Text> */}
      <View style={styles.buttonContainer}>
        {inCart ? (
          <TouchableOpacity
            style={styles.removeButton}
            onPress={handleRemoveFromCart}>
            <Text style={styles.removeButtonText}>Remove from cart</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.addButton} onPress={handleAddToCart}>
            <Text style={styles.addButtonText}>Add to cart</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },
  addButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  removeButton: {
    backgroundColor: '#F44336',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    marginLeft: 16,
  },
  removeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProductItem;
