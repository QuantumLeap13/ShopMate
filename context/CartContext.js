// context/CartContext.js
import React, { createContext, useContext, useState, useMemo } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex(item => item.id === product.id);
      if (existingIndex !== -1) {
        const updated = [...prevItems];
        updated[existingIndex].quantity += 1;
        return updated;
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter(item => item.id !== productId)
    );
  };

  const updateQuantity = (productId, newQuantity) => {
    setCartItems((prevItems) =>
      prevItems
        .map(item =>
          item.id === productId
            ? { ...item, quantity: newQuantity }
            : item
        )
        .filter(item => item.quantity > 0)
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const toggleWishlist = (input) => {
    let product;

    // Support both product object or ID
    if (typeof input === 'object' && input !== null && input.id) {
      product = input;
    } else if (typeof input === 'number' || typeof input === 'string') {
      product = [...cartItems, ...wishlistItems].find(item => item.id === input);
      if (!product) {
        console.warn('Product ID not found in cart/wishlist:', input);
        return;
      }
    } else {
      console.warn('Invalid input passed to toggleWishlist:', input);
      return;
    }

    setWishlistItems((prevItems) => {
      const exists = prevItems.some(item => item.id === product.id);
      return exists
        ? prevItems.filter(item => item.id !== product.id)
        : [...prevItems, product];
    });
  };

  const totalPrice = useMemo(() => {
    return cartItems
      .reduce((sum, item) => sum + item.price * item.quantity, 0)
      .toFixed(2);
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalPrice,
        wishlistItems,
        toggleWishlist,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
