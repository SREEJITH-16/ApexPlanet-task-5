const products = [
  { name: "Laptop", category: "tech", rating: 4.5 },
  { name: "Book", category: "books", rating: 4.8 },
  { name: "Headphones", category: "tech", rating: 4.2 },
  { name: "Notebook", category: "books", rating: 4.0 },
  { name: "Smartphone", category: "tech", rating: 4.7 }
];

function displayProducts(list) {
  const container = document.getElementById("productList");
  container.innerHTML = "";
  list.forEach(p => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `<h3>${p.name}</h3><p>Category: ${p.category}<br>Rating: ${p.rating}</p>`;
    container.appendChild(card);
  });
}

function filterProducts() {
  const category = document.getElementById("filterCategory").value;
  const filtered = category === "all" ? products : products.filter(p => p.category === category);
  displayProducts(filtered);
}

function sortProducts() {
  const option = document.getElementById("sortOption").value;
  const sorted = [...products].sort((a, b) => {
    return option === "rating" ? b.rating - a.rating : a.name.localeCompare(b.name);
  });
  displayProducts(sorted);
}

document.addEventListener("DOMContentLoaded", () => displayProducts(products));