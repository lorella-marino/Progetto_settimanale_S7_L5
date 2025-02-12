const API_URL = "https://striveschool-api.herokuapp.com/api/product/";
const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzkzNjRjOGI3NDcwMTAwMTU4YjJiNGIiLCJpYXQiOjE3Mzc3MTI4NDAsImV4cCI6MTczODkyMjQ0MH0.MSb9nmOXg7c6hRLpm2XNqrtTkXollrUAsG1QBOfruzE";

// Funzione per ottenere i prodotti (GET)
const getProducts = () => {
  const loadingIndicator = document.getElementById("loading-indicator");

  // Mostra l'indicatore di caricamento
  loadingIndicator.style.display = "inline-block";

  fetch(API_URL, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  })
    .then((response) => response.json())
    .then((products) => {
      const container = document.getElementById("product-container");
      container.innerHTML = ""; // Pulisce il contenitore
      products.forEach((product) => {
        const card = `
          <div class="col">
            <div class="card mb-4 shadow-sm h-100 bg-info" >
              <a href="detail.html?id=${product._id}">
                <img src="${product.imageUrl}" class="card-img-top img-fluid " style="height: 15rem; object-fit: cover;" alt="${product.name}" />
              </a>
              <div class="card-body d-flex flex-column">
                <h5 class="card-title">${product.name}</h5>
                <p class="text-muted">Prezzo: €${product.price}</p>
              <div class="mt-auto">
                  <button class="btn btn-dark text-white me-2 " onclick="editProduct('${product._id}')">Modifica</button>
                  <button class="btn btn-link text-dark p-0" onclick="scopri('${product._id}')">Scopri di più</button>
              </div>
              </div>
            </div>
          </div>`;
        container.innerHTML += card;
      });
    })
    .catch((err) => console.error("Errore nel caricamento prodotti:", err))
    .finally(() => {
      // Nascondi l'indicatore di caricamento
      loadingIndicator.style.display = "none";
    });
};

// Funzione per modificare un prodotto (reindirizza al backoffice)
const editProduct = (productId) => {
  window.location.href = `backoffice.html?id=${productId}`;
};

// Funzione per andare alla pafina detail
const scopri = (productId) => {
  window.location.href = `detail.html?id=${productId}`;
};

// Carica i prodotti all'avvio della pagina
getProducts();
