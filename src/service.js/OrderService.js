// services/orderService.js
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

// Generate UUID function
function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

// Calculate final price with discounts
function calculateFinalPrice(item, promoDiscountPercent = 0) {
  let finalPrice = item.price;
  
  // Apply item discount first
  if (item.discount > 0) {
    finalPrice = finalPrice - (finalPrice * item.discount / 100);
  }
  
  // Apply promo discount
  if (promoDiscountPercent > 0) {
    finalPrice = finalPrice - (finalPrice * promoDiscountPercent / 100);
  }
  
  return parseFloat(finalPrice.toFixed(2));
}

// Create order data for each item
export function createOrderData(cartItems, userId, promoDiscountPercent = 0) {
  const orders = cartItems.map(item => ({
    id: generateUUID(),
    userId: userId,
    gameId: item.id,
    price: calculateFinalPrice(item, promoDiscountPercent),
    purchaseDate: new Date().toISOString()
  }));
  
  return orders;
}

// Submit orders to API with axios
export const submitOrders = async (orders) => {
  try {
    const res = await axios.post(`${BASE_URL}/purchases`, { orders });
    return { success: true, data: res.data };
  } catch (err) {
    console.error("Sifariş göndərilirkən xəta:", err.message);
    return { success: false, error: err.message };
  }
};

// Clear cart after successful order
export function clearCart(userId) {
  try {
    localStorage.removeItem(`cart_${userId}`);
    return true;
  } catch (error) {
    console.error('Failed to clear cart:', error);
    return false;
  }
}

// Complete order process
export async function processOrder(cartItems, userId, promoDiscountPercent = 0) {
  try {
    // Create order data
    const orders = createOrderData(cartItems, userId, promoDiscountPercent);
    
    // Submit to API
    const result = await submitOrders(orders);
    
    if (result.success) {
      // Clear cart on success
      clearCart(userId);
      return { success: true, orders, data: result.data };
    } else {
      return { success: false, error: result.error };
    }
  } catch (error) {
    console.error('Order processing failed:', error);
    return { success: false, error: error.message };
  }
}