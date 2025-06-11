export function handleRealPurchase(user) {
  if (!user || !user.email) {
    console.error('User data is missing or invalid.');
    alert('User information is missing. Please log in again.');
    return;
  }

  // Retrieve cart items
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];

  if (cartItems.length === 0) {
    alert('Your cart is empty. Add items before making a purchase.');
    return;
  }

  // Retrieve existing purchases
  const existingPurchases = JSON.parse(localStorage.getItem('purchases')) || [];

  // Create new purchase object
  const newPurchase = {
    orderId: 'ORD' + Math.floor(Math.random() * 1000000), // e.g., ORD832041
    userEmail: user.email,
    purchaseDate: new Date().toISOString(),
    items: cartItems.map(item => ({
      name: item.name,
      price: item.price,
      quantity: item.quantity
    }))
  };

  // Add to purchase list and save to localStorage
  existingPurchases.push(newPurchase);
  localStorage.setItem('purchases', JSON.stringify(existingPurchases));

  // Clear cart
  localStorage.removeItem('cart');

  alert('Your purchase was successful!');
}
