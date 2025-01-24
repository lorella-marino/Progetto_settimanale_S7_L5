const API_URL = "https://striveschool-api.herokuapp.com/api/product/";
const TOKEN =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzkzNjRjOGI3NDcwMTAwMTU4YjJiNGIiLCJpYXQiOjE3Mzc3MTI4NDAsImV4cCI6MTczODkyMjQ0MH0.MSb9nmOXg7c6hRLpm2XNqrtTkXollrUAsG1QBOfruzE";

const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

const loadProductDetail = () => {
  if (productId) {
    fetch(`${API_URL}${productId}`, {
      headers: { Authorization: TOKEN },
    })
      .then((response) => response.json())
      .then((product) => {
        const container = document.getElementById("product-detail");
        container.innerHTML = `
          <div class="container">
            <div><img src="${product.imageUrl}" class="img-fluid mb-3 border border-info rounded-3" style="height: 25rem; object-fit: cover;" alt="${product.name}"></div>
            <h2>${product.name}</h2>
            <p>${product.description}</p>
            <p><strong>Marca:</strong> ${product.brand}</p>
            <p><strong>Prezzo:</strong> €${product.price}</p>
          </div>
        `;
      })
      .catch((err) => console.error("Errore nel caricamento dei dettagli:", err));
  }
};

// Modificare un prodotto (reindirizza al backoffice)
document.getElementById("modifica-button").addEventListener("click", () => {
  window.location.href = `backoffice.html?id=${productId}`;
});

// Vai indietro
document.getElementById("back-button").addEventListener("click", () => {
  window.history.back();
});

loadProductDetail();
