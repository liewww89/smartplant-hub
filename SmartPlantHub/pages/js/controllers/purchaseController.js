// pages/js/controllers/purchaseController.js

export function renderUserPurchases(loggedInUser) {
  const allPurchases = JSON.parse(localStorage.getItem('purchases')) || [];

  // Filter purchases made by the currently logged-in user
  const userPurchases = allPurchases.filter(
    purchase => purchase.userEmail === loggedInUser.email
  );

  // DOM references
  const tbody = document.querySelector('#purchases-table tbody');
  const noPurchasesMsg = document.getElementById('no-purchases');

  // Clear previous table rows
  tbody.innerHTML = '';

  // Show message if no purchases
  if (userPurchases.length === 0) {
    noPurchasesMsg.style.display = 'block';
    return;
  } else {
    noPurchasesMsg.style.display = 'none';
  }

  // Format price as currency
  const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  });

  // Render each purchase
  userPurchases.forEach(purchase => {
    if (!purchase.items || !Array.isArray(purchase.items)) return;

    const totalQuantity = purchase.items.reduce((sum, item) => sum + (item.quantity || 0), 0);
    const totalPrice = purchase.items.reduce(
      (sum, item) => sum + ((item.price || 0) * (item.quantity || 0)), 0
    );

    const productList = purchase.items.map(item => {
      const name = item.name || 'Unknown';
      const qty = item.quantity || 0;
      return `${name} (${qty})`;
    }).join(', ');

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${purchase.orderId || 'N/A'}</td>
      <td>${productList}</td>
      <td>${totalQuantity}</td>
      <td>${currencyFormatter.format(totalPrice)}</td>
      <td>${new Date(purchase.purchaseDate).toLocaleString()}</td>
    `;
    tbody.appendChild(tr);
  });
}
