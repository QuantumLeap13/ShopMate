import { useEffect, useState, useLayoutEffect } from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Pressable,
  Text,
  TextInput,
} from 'react-native';
import ProductCard from '../components/ProductCard';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../context/CartContext';
import { useNavigation } from 'expo-router';

export default function HomeScreen() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const navigation = useNavigation();
  const { cartItems } = useCart();

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
      })
      .catch((err) => console.log('Error fetching:', err))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const filtered = products.filter((item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchQuery, products]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'ShopMate 🛍️',
      headerStyle: {
        backgroundColor: '#3498db',
      },
      headerTitleStyle: {
        color: '#fff',
        fontWeight: 'bold',
      },
      headerRight: () => (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Pressable
            onPress={() => router.push('/wishlist')}
            style={styles.iconButton}
          >
            <Ionicons name="heart-outline" size={24} color="#fff" />
          </Pressable>
          <Pressable
            onPress={() => router.push('/cart')}
            style={styles.cartIconContainer}
          >
            <Ionicons name="cart-outline" size={24} color="#fff" />
            {cartItems.length > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.badgeText}>{cartItems.length}</Text>
              </View>
            )}
          </Pressable>
        </View>
      ),
    });
  }, [navigation, cartItems]);

  const renderItem = ({ item }) => (
    <ProductCard
      product={item}
      onPress={() => router.push(`/product/${item.id}`)}
      wishlist={wishlist}
      toggleWishlist={() => {
        setWishlist((prev) =>
          prev.includes(item.id)
            ? prev.filter((id) => id !== item.id)
            : [...prev, item.id]
        );
      }}
    />
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2c3e50" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search products..."
        placeholderTextColor="#666"
        style={styles.searchInput}
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <FlatList
        data={filteredProducts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No products found.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  list: {
    paddingHorizontal: 8,
    paddingTop: 10,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartIconContainer: {
    marginRight: 12,
  },
  iconButton: {
    marginRight: 18,
  },
  cartBadge: {
    position: 'absolute',
    top: -4,
    right: -6,
    backgroundColor: 'red',
    borderRadius: 8,
    paddingHorizontal: 4,
    minWidth: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  searchInput: {
    backgroundColor: '#fff',
    margin: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    fontSize: 16,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  emptyText: {
    textAlign: 'center',
    padding: 20,
    color: '#999',
    fontSize: 16,
  },
});
