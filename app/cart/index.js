import React, { useLayoutEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  Pressable,
  TextInput,
} from 'react-native';
import { useCart } from '../../context/CartContext';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRouter } from 'expo-router';

export default function CartScreen() {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    totalPrice,
  } = useCart();

  const navigation = useNavigation();
  const router = useRouter();

  useLayoutEffect(() => {
    navigation.setOptions({ title: '🛒 Your Cart' });
  }, [navigation]);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Pressable
        style={{ flexDirection: 'row', flex: 1 }}
        onPress={() => router.push(`/product/${item.id}`)}
      >
        <Image source={{ uri: item.image }} style={styles.image} />
        <View style={styles.details}>
          <Text numberOfLines={2} style={styles.title}>
            {item.title}
          </Text>
          <Text style={styles.price}>₹ {item.price}</Text>

          <View style={styles.quantityRow}>
            <Pressable
              onPress={() => updateQuantity(item.id, item.quantity - 1)}
              style={styles.qtyButton}
            >
              <Text style={styles.qtyButtonText}>-</Text>
            </Pressable>
            <Text style={styles.qtyText}>{item.quantity}</Text>
            <Pressable
              onPress={() => updateQuantity(item.id, item.quantity + 1)}
              style={styles.qtyButton}
            >
              <Text style={styles.qtyButtonText}>+</Text>
            </Pressable>
          </View>
        </View>
      </Pressable>

      <Pressable onPress={() => removeFromCart(item.id)} style={styles.deleteIcon}>
        <Ionicons name="trash" size={22} color="red" />
      </Pressable>
    </View>
  );

  if (cartItems.length === 0) {
    return (
      <View style={styles.center}>
        <Text>Your cart is empty 🛒</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={cartItems}
        keyExtractor={(item, index) => item.id + '_' + index}
        renderItem={renderItem}
        contentContainerStyle={styles.container}
      />

      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total: ₹ {totalPrice}</Text>
        <Pressable
          style={styles.checkoutBtn}
          onPress={() => router.push('/checkout')}
        >
          <Text style={styles.checkoutText}>Checkout</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: '#f0f4f8',
    flexGrow: 1,
  },
  item: {
    flexDirection: 'row',
    marginBottom: 14,
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 14,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    alignItems: 'center',
  },
  image: {
    width: 60,
    height: 60,
    marginRight: 12,
    borderRadius: 8,
    resizeMode: 'contain',
  },
  details: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 4,
    color: '#333',
  },
  price: {
    fontSize: 14,
    color: 'green',
    fontWeight: 'bold',
  },
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    gap: 10,
  },
  qtyButton: {
    backgroundColor: '#ddd',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  qtyButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  qtyText: {
    fontSize: 14,
    fontWeight: 'bold',
    minWidth: 20,
    textAlign: 'center',
  },
  deleteIcon: {
    marginLeft: 10,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  totalContainer: {
    backgroundColor: '#fff',
    padding: 16,
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'right',
    color: '#000',
  },
  checkoutBtn: {
    backgroundColor: '#2c3e50',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  checkoutText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
