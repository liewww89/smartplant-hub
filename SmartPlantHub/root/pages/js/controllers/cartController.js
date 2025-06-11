// cartController.js

// Retrieve cart from localStorage or empty array if none
function getCart() {
  const cartStr = localStorage.getItem('cart');
  return cartStr ? JSON.parse(cartStr) : [];
}

// Save cart to localStorage
function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Add item to cart (if exists, increment quantity)
function addToCart(product) {
  const cart = getCart();
  const existingIndex = cart.findIndex(item => item.name === product.name);
  if (existingIndex !== -1) {
    cart[existingIndex].quantity += product.quantity;
  } else {
    cart.push(product);
  }
  saveCart(cart);
}

// Remove item by index
function removeFromCart(index) {
  const cart = getCart();
  if (index >= 0 && index < cart.length) {
    cart.splice(index, 1);
    saveCart(cart);
  }
}

// Update quantity of item by index
function updateQuantity(index, quantity) {
  const cart = getCart();
  if (index >= 0 && index < cart.length) {
    cart[index].quantity = quantity;
    saveCart(cart);
  }
}

// Clear whole cart
function clearCart() {
  localStorage.removeItem('cart');
}
