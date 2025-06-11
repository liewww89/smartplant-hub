// cartController.js

/**
 * Retrieve cart items from localStorage.
 * @returns {Array} Array of cart items or empty array if none.
 */
function getCart() {
  try {
    const cart = JSON.parse(localStorage.getItem('cart'));
    return Array.isArray(cart) ? cart : [];
  } catch (e) {
    return [];
  }
}

/**
 * Save the cart array to localStorage.
 * @param {Array} cart - Array of cart items to save.
 */
function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

/**
 * Add an item to the cart. If it already exists, update its quantity.
 * @param {Object} item - Object containing name, price, and quantity.
 */
function addToCart(item) {
  if (
    !item ||
    typeof item.name !== 'string' ||
    typeof item.price !== 'number' ||
    typeof item.quantity !== 'number' ||
    item.quantity < 1
  ) {
    console.error('Invalid item object:', item);
    return;
  }

  const cart = getCart();
  const existingIndex = cart.findIndex(i => i.name === item.name);

  if (existingIndex !== -1) {
    cart[existingIndex].quantity += item.quantity;
  } else {
    cart.push(item);
  }

  saveCart(cart);
}

/**
 * Remove item from cart by index.
 * @param {number} index
 */
function removeCartItem(index) {
  const cart = getCart();
  if (index >= 0 && index < cart.length) {
    cart.splice(index, 1);
    saveCart(cart);
  }
}

/**
 * Update cart item quantity by index.
 * @param {number} index
 * @param {number} quantity
 */
function updateCartItemQuantity(index, quantity) {
  if (typeof quantity !== 'number' || quantity < 1 || isNaN(quantity)) {
    console.warn('Quantity must be a positive number');
    return;
  }

  const cart = getCart();
  if (index >= 0 && index < cart.length) {
    cart[index].quantity = quantity;
    saveCart(cart);
  }
}

/**
 * Clear all items from the cart.
 */
function clearCart() {
  localStorage.removeItem('cart');
}

/**
 * Calculate total cost of all cart items.
 * @returns {number} Total cost
 */
function calculateCartTotal() {
  const cart = getCart();
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}

/**
 * Get total number of items in cart.
 * @returns {number} Total quantity of items
 */
function getCartItemCount() {
  const cart = getCart();
  return cart.reduce((count, item) => count + item.quantity, 0);
}

export {
  getCart,
  saveCart,
  addToCart,
  removeCartItem,
  updateCartItemQuantity,
  clearCart,
  calculateCartTotal,
  getCartItemCount
};
