import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../context/CartContext'; // ✅ Access wishlist methods

const ProductCard = ({ product, onPress }) => {
  const { addToCart, toggleWishlist, wishlistItems } = useCart();

  const isWishlisted = wishlistItems.some(item => item.id === product.id);

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image
        source={{ uri: product.image }}
        style={styles.image}
        resizeMode="contain"
      />

      {/* ❤️ Wishlist Icon */}
      <TouchableOpacity
        style={styles.heartIcon}
        onPress={() => toggleWishlist(product)}
      >
        <Ionicons
          name={isWishlisted ? 'heart' : 'heart-outline'}
          size={20}
          color={isWishlisted ? 'red' : 'gray'}
        />
      </TouchableOpacity>

      <Text numberOfLines={1} style={styles.title}>{product.title}</Text>
      <Text style={styles.price}>₹ {product.price}</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => addToCart(product)}
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
