import React, { useLayoutEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  Pressable,
} from 'react-native';
import { useRouter, useNavigation } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../../context/CartContext';

export default function WishlistScreen() {
  const { wishlistItems = [], toggleWishlist, addToCart } = useCart();
  const router = useRouter();
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: '❤️ Wishlist',
    });
  }, [navigation]);

  const validWishlistItems = wishlistItems.filter(item => item && item.id); // Filter null/undefined items

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
        </View>
      </Pressable>

      <View style={styles.actions}>
        <Pressable onPress={() => addToCart(item)} style={styles.cartBtn}>
          <Ionicons name="cart-outline" size={20} color="white" />
        </Pressable>
        <Pressable onPress={() => toggleWishlist(item)}>
          <Ionicons name="heart-dislike" size={22} color="red" />
        </Pressable>
      </View>
    </View>
  );

  if (validWishlistItems.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={{ fontSize: 16, color: '#333' }}>
          Your wishlist is empty ❤️
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={validWishlistItems}
      keyExtractor={(item, index) =>
        item?.id ? item.id.toString() : index.toString()
      }
      renderItem={renderItem}
      contentContainerStyle={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: '#f0f0f0',
  },
  item: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    elevation: 3,
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
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  price: {
    fontSize: 13,
    color: 'green',
    marginTop: 4,
  },
  actions: {
    gap: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cartBtn: {
    backgroundColor: '#2c3e50',
    padding: 6,
    borderRadius: 6,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
}); 