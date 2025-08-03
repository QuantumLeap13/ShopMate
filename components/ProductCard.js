import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product, onPress, isWishlisted, onToggleWishlist }) => {
  const { addToCart } = useCart();

  if (!product || !product.id) {
    console.warn('Invalid product passed to ProductCard:', product);
    return null;
  }

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      {/* Product Image */}
      <Image
        source={{ uri: product.image || 'https://via.placeholder.com/100' }}
        style={styles.image}
        resizeMode="contain"
      />

      {/* ❤️ Wishlist Icon */}
      <TouchableOpacity
        style={styles.heartIcon}
        onPress={(e) => {
          e.stopPropagation();
          if (product && product.id) {
            onToggleWishlist();
          }
        }}
      >
        <Ionicons
          name={isWishlisted ? 'heart' : 'heart-outline'}
          size={20}
          color={isWishlisted ? 'red' : 'gray'}
        />
      </TouchableOpacity>

      {/* Product Title & Price */}
      <Text numberOfLines={1} style={styles.title}>
        {product.title || 'Unnamed'}
      </Text>
      <Text style={styles.price}>₹ {product.price ?? '0.00'}</Text>

      {/* Add to Cart Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={(e) => {
          e.stopPropagation();
          addToCart(product);
        }}
      >
        <Text style={styles.buttonText}>Add to Cart</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    margin: 8,
    width: '46%',
    elevation: 3,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 100,
    marginBottom: 8,
  },
  heartIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 10,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 8,
    color: '#333',
  },
  price: {
    marginTop: 4,
    fontSize: 13,
    color: 'green',
  },
  button: {
    marginTop: 8,
    backgroundColor: '#2c3e50',
    paddingVertical: 6,
    borderRadius: 6,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 13,
  },
});
