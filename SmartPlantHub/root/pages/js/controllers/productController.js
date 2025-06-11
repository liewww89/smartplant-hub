
const products = [
  { id: 1, name: "Smart Planter", price: 50, care: "Easy" },
  { id: 2, name: "Sensor Kit", price: 35, care: "Moderate" },
  { id: 3, name: "LED Grow Light", price: 25, care: "Easy" }
];

function renderProducts() {
  const list = document.getElementById("product-list");
  list.innerHTML = "";
  products.forEach(p => {
    const item = document.createElement("div");
    item.className = "product";
    item.innerHTML = `<h3>${p.name}</h3><p>$${p.price}</p><p>Care: ${p.care}</p>`;
    list.appendChild(item);
  });
}

function filterProducts() {
  const level = document.getElementById("care").value;
  const list = document.getElementById("product-list");
  list.innerHTML = "";
  products.filter(p => !level || p.care === level).forEach(p => {
    const item = document.createElement("div");
    item.className = "product";
    item.innerHTML = `<h3>${p.name}</h3><p>$${p.price}</p><p>Care: ${p.care}</p>`;
    list.appendChild(item);
  });
}

renderProducts();