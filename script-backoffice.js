const API_URL = "https://striveschool-api.herokuapp.com/api/product/";
const TOKEN =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzkzNjRjOGI3NDcwMTAwMTU4YjJiNGIiLCJpYXQiOjE3Mzc3MTI4NDAsImV4cCI6MTczODkyMjQ0MH0.MSb9nmOXg7c6hRLpm2XNqrtTkXollrUAsG1QBOfruzE";

let editingProductId = null;

// Funzione per recuperare i prodotti
const getProducts = () => {
  fetch(API_URL, {
    headers: { Authorization: TOKEN },
  })
    .then((response) => response.json())
    .then((products) => {
      const container = document.getElementById("product-container");
      container.innerHTML = ""; // Pulisce il contenitore
      products.forEach((product) => {
        const card = `
              <div class="col-md-4">
  <div class="card mb-4 shadow-sm">
    <img src="${product.imageUrl}" class="card-img-top img-fluid border border-secondary-subtle" style="height: 15rem; object-fit: cover;" alt="${product.name}" />
    <div class="card-body">
      <h5 class="card-title">${product.name}</h5>
      <p class="card-text">${product.description}</p>
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item">${product.brand}</li>
      <li class="list-group-item">€${product.price}</li>
    </ul>
    <div class="card-body">
      <button class="btn btn-info text-white" onclick="editProduct('${product._id}')">Modifica</button>
      <button class="btn btn-outline-danger" onclick="deleteProduct('${product._id}')">Elimina</button>
    </div>
  </div>
</div>`;

        container.innerHTML += card;
      });
    })
    .catch((err) => console.error("Errore nel caricamento prodotti:", err));
};

// Funzione per creare un prodotto
const createProduct = (productData) => {
  fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: TOKEN,
    },
    body: JSON.stringify(productData),
  })
    .then((response) => response.json())
    .then(() => {
      alert("Prodotto creato con successo!");
      getProducts();
    })
    .catch((error) => console.error("Errore nella creazione:", error));
};

// Funzione per modificare un prodotto
const editProduct = (productId) => {
  fetch(`${API_URL}${productId}`, {
    headers: { Authorization: TOKEN },
  })
    .then((response) => response.json())
    .then((product) => {
      // Form con i dati del prodotto
      document.getElementById("product-name").value = product.name;
      document.getElementById("product-description").value = product.description;
      document.getElementById("product-brand").value = product.brand;
      document.getElementById("product-image").value = product.imageUrl;
      document.getElementById("product-price").value = product.price;

      // Salva l'ID del prodotto in modifica
      editingProductId = productId;

      // Sposta la vista in alto nella pagina
      window.scrollTo({ top: 0, behavior: "smooth" });
    })
    .catch((err) => console.error("Errore nel recupero del prodotto:", err));
};

// Funzione per eliminare un prodotto
const deleteProduct = (productId) => {
  fetch(`${API_URL}${productId}`, {
    method: "DELETE",
    headers: { Authorization: TOKEN },
  })
    .then(() => {
      alert("Prodotto eliminato!");
      getProducts();
    })
    .catch((err) => console.error("Errore nell'eliminazione:", err));
};

// Gestione del form
const form = document.getElementById("product-form");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = document.getElementById("product-name").value;
  const description = document.getElementById("product-description").value;
  const brand = document.getElementById("product-brand").value;
  const imageUrl = document.getElementById("product-image").value;
  const price = document.getElementById("product-price").value;

  if (!name || !description || !brand || !imageUrl || !price) {
    alert("Tutti i campi sono obbligatori!");
    return;
  }

  const productData = {
    name,
    description,
    brand,
    imageUrl,
    price: parseFloat(price),
  };

  if (editingProductId) {
    // Modifica prodotto esistente
    fetch(`${API_URL}${editingProductId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: TOKEN,
      },
      body: JSON.stringify(productData),
    })
      .then(() => {
        alert("Prodotto aggiornato con successo!");
        form.reset();
        editingProductId = null; // Resetta l'ID del prodotto
        getProducts();
      })
      .catch((error) => console.error("Errore nell'aggiornamento:", error));
  } else {
    // Crea un nuovo prodotto
    createProduct(productData);
    form.reset(); // Resetta il form dopo aver aggiunto il prodotto
  }
});

// Bottone reset
document.getElementById("reset-button").addEventListener("click", () => {
  form.reset();
  editingProductId = null; // Resetta l'ID del prodotto
});

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const productId = params.get("id");

  if (productId) {
    // Se un ID è presente, richiama editProduct
    editProduct(productId);
  }
});

// Recupera prodotti inizialmente
getProducts();
