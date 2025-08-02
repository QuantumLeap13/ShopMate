import React, { useEffect, useState, useLayoutEffect } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useCart } from '../../context/CartContext';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart, cartItems } = useCart();
  const router = useRouter();
  const navigation = useNavigation();

  // Reviews
  const [reviews, setReviews] = useState([
    { id: 1, name: 'Rahul', text: 'Great product! Highly recommend 👍' },
    { id: 2, name: 'Ayesha', text: 'Good value for money. Delivered on time.' },
  ]);
  const [newReview, setNewReview] = useState('');

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((err) => console.log('Fetch error:', err))
      .finally(() => setLoading(false));
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'ShopMate 🛍️',
      headerStyle: { backgroundColor: '#f3f4f6' },
      headerRight: () => (
        <Pressable
          onPress={() => router.push('/cart')}
          style={{ marginRight: 12 }}
        >
          <View style={{ position: 'relative' }}>
            <Ionicons name="cart-outline" size={24} color="#000" />
            {cartItems.length > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.badgeText}>{cartItems.length}</Text>
              </View>
            )}
          </View>
        </Pressable>
      ),
    });
  }, [cartItems]);

  const handleAddToCart = () => {
    addToCart(product);
  };

  const handleBuyNow = () => {
    addToCart(product);
    router.push('/checkout');
  };

  const handleReviewSubmit = () => {
    if (newReview.trim() === '') return;
    const newEntry = {
      id: reviews.length + 1,
      name: 'You',
      text: newReview,
    };
    setReviews([...reviews, newEntry]);
    setNewReview('');
  };

  if (loading || !product) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2c3e50" />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Image source={{ uri: product.image }} style={styles.image} />
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.price}>₹ {product.price}</Text>
        <Text style={styles.desc}>{product.description}</Text>

        <View style={styles.buttonRow}>
          <Pressable style={styles.cartBtn} onPress={handleAddToCart}>
            <Text style={styles.btnText}>Add to Cart</Text>
          </Pressable>
          <Pressable style={styles.buyBtn} onPress={handleBuyNow}>
            <Text style={styles.btnText}>Buy Now</Text>
          </Pressable>
        </View>

        {/* Reviews Section */}
        <View style={styles.reviewSection}>
          <Text style={styles.sectionTitle}>📢 Reviews</Text>
          {reviews.map((r) => (
            <View key={r.id} style={styles.reviewItem}>
              <Text style={styles.reviewName}>{r.name}:</Text>
              <Text style={styles.reviewText}>{r.text}</Text>
            </View>
          ))}
        </View>

        {/* Add Review */}
        <View style={styles.reviewInputContainer}>
          <TextInput
            value={newReview}
            onChangeText={setNewReview}
            placeholder="Write a review..."
            style={styles.reviewInput}
          />
          <Pressable onPress={handleReviewSubmit} style={styles.submitBtn}>
            <Text style={{ color: '#fff' }}>Submit</Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 250,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
  },
  price: {
    fontSize: 16,
    color: 'green',
    marginBottom: 12,
  },
  desc: {
    fontSize: 14,
    color: '#333',
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 16,
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  cartBtn: {
    flex: 1,
    backgroundColor: '#2980b9',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  buyBtn: {
    flex: 1,
    backgroundColor: '#27ae60',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  cartBadge: {
    position: 'absolute',
    top: -5,
    right: -6,
    backgroundColor: 'red',
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 1,
    minWidth: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  reviewSection: {
    marginTop: 20,
    borderTopWidth: 1,
    borderColor: '#eee',
    paddingTop: 12,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  reviewItem: {
    marginBottom: 10,
  },
  reviewName: {
    fontWeight: '600',
    color: '#222',
  },
  reviewText: {
    color: '#555',
    fontSize: 14,
  },
  reviewInputContainer: {
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  reviewInput: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 10,
    fontSize: 14,
  },
  submitBtn: {
    backgroundColor: '#2c3e50',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
});
