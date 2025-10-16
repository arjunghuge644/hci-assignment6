// ShopEasy E-commerce Website JavaScript

// Application State
const appState = {
  currentPage: "home",
  cart: [],
  products: [
    {
      id: 1,
      name: "Wireless Bluetooth Headphones",
      price: 99.99,
      category: "Electronics",
      image: "./assets/images/headphones.jpg",
      rating: 4.5,
      description:
        "Premium wireless headphones with noise cancellation and 30-hour battery life.",
      specifications: [
        "Bluetooth 5.0 connectivity",
        "Active noise cancellation",
        "30-hour battery life",
        "Fast charging (15 min = 3 hours)",
      ],
    },
    {
      id: 2,
      name: "Smart Fitness Watch",
      price: 249.99,
      category: "Electronics",
      image: "smartwatch.jpg",
      rating: 4.7,
      description:
        "Advanced fitness tracking with heart rate monitoring and GPS.",
      specifications: [
        "Heart rate monitoring",
        "Built-in GPS",
        "Water resistant",
        "7-day battery life",
      ],
    },
    {
      id: 3,
      name: "Organic Cotton T-Shirt",
      price: 29.99,
      category: "Clothing",
      image: "tshirt.jpg",
      rating: 4.3,
      description: "Comfortable organic cotton t-shirt in various colors.",
      specifications: [
        "100% organic cotton",
        "Machine washable",
        "Available in S, M, L, XL",
        "Multiple colors",
      ],
    },
    {
      id: 4,
      name: "Professional Coffee Maker",
      price: 199.99,
      category: "Home & Kitchen",
      image: "coffee-maker.jpg",
      rating: 4.6,
      description:
        "Programmable coffee maker with thermal carafe and auto-shutdown.",
      specifications: [
        "12-cup capacity",
        "Programmable timer",
        "Thermal carafe",
        "Auto-shutdown feature",
      ],
    },
    {
      id: 5,
      name: "Yoga Exercise Mat",
      price: 39.99,
      category: "Sports",
      image: "yoga-mat.jpg",
      rating: 4.4,
      description:
        "Non-slip exercise mat perfect for yoga, pilates, and home workouts.",
      specifications: [
        "6mm thickness",
        "Non-slip surface",
        "Eco-friendly material",
        "Carrying strap included",
      ],
    },
    {
      id: 6,
      name: "LED Desk Lamp",
      price: 79.99,
      category: "Home & Office",
      image: "desk-lamp.jpg",
      rating: 4.8,
      description:
        "Adjustable LED desk lamp with multiple brightness levels and color temperatures.",
      specifications: [
        "Touch control",
        "USB charging port",
        "Multiple brightness levels",
        "Adjustable arm and head",
      ],
    },
  ],
  categories: [
    {
      name: "Electronics",
      image: "electronics-category.jpg",
      description: "Latest gadgets and electronic devices",
    },
    {
      name: "Clothing",
      image: "clothing-category.jpg",
      description: "Fashion and apparel for all occasions",
    },
    {
      name: "Home & Kitchen",
      image: "home-kitchen-category.jpg",
      description: "Everything for your home and kitchen needs",
    },
    {
      name: "Sports",
      image: "sports-category.jpg",
      description: "Sports equipment and fitness gear",
    },
  ],
  filters: {
    category: "",
    minPrice: 0,
    maxPrice: 500,
    minRating: 0,
    searchQuery: "",
  },
  sortBy: "name",
  currentProduct: null,
  user: null,
};

// Utility Functions
function formatPrice(price) {
  return `$${price.toFixed(2)}`;
}

function generateStars(rating) {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStar;

  let starsHTML = "";

  for (let i = 0; i < fullStars; i++) {
    starsHTML += '<i class="fas fa-star"></i>';
  }

  if (halfStar) {
    starsHTML += '<i class="fas fa-star-half-alt"></i>';
  }

  for (let i = 0; i < emptyStars; i++) {
    starsHTML += '<i class="far fa-star"></i>';
  }

  return starsHTML;
}

function showToast(message) {
  const toastElement = document.getElementById("successToast");
  const toastMessage = document.getElementById("toastMessage");
  toastMessage.textContent = message;

  const toast = new bootstrap.Toast(toastElement);
  toast.show();
}

function showLoading(show = true) {
  const spinner = document.getElementById("loadingSpinner");
  if (show) {
    spinner.classList.remove("d-none");
  } else {
    spinner.classList.add("d-none");
  }
}

// Navigation Functions
function showPage(pageId) {
  // Hide all pages
  document.querySelectorAll(".page-content").forEach((page) => {
    page.classList.add("d-none");
  });

  // Show selected page
  const targetPage = document.getElementById(`${pageId}-page`);
  if (targetPage) {
    targetPage.classList.remove("d-none");
    targetPage.classList.add("fade-in");
  }

  // Update navigation active state
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.classList.remove("active");
  });

  document.querySelectorAll(`[data-page="${pageId}"]`).forEach((link) => {
    if (link.classList.contains("nav-link")) {
      link.classList.add("active");
    }
  });

  appState.currentPage = pageId;

  // Initialize page-specific content
  switch (pageId) {
    case "home":
      initHomePage();
      break;
    case "products":
      initProductsPage();
      break;
    case "cart":
      initCartPage();
      break;
    case "checkout":
      initCheckoutPage();
      break;
  }
}

// Home Page Functions
function initHomePage() {
  loadFeaturedProducts();
  loadCategories();
}

function loadFeaturedProducts() {
  const container = document.getElementById("featuredProducts");
  const featuredProducts = appState.products.slice(0, 6); // Show first 6 products

  container.innerHTML = featuredProducts
    .map(
      (product) => `
        <div class="col-lg-4 col-md-6 mb-4">
            <div class="card product-card h-100">
                <div class="product-image-placeholder">
                    <i class="fas fa-image"></i>
                </div>
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <div class="product-rating mb-2">
                        ${generateStars(product.rating)}
                        <span class="text-muted">(${product.rating})</span>
                    </div>
                    <p class="card-text">${product.description.substring(
                      0,
                      100
                    )}...</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <span class="product-price">${formatPrice(
                          product.price
                        )}</span>
                        <button class="btn btn-primary btn-sm" onclick="addToCart(${
                          product.id
                        })">
                            <i class="fas fa-cart-plus me-1"></i>Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `
    )
    .join("");
}

function loadCategories() {
  const container = document.getElementById("categoriesSection");

  container.innerHTML = appState.categories
    .map(
      (category) => `
        <div class="col-lg-3 col-md-6 mb-4">
            <div class="category-card" onclick="filterByCategory('${category.name}')">
                <div class="category-content">
                    <h5>${category.name}</h5>
                    <p>${category.description}</p>
                </div>
            </div>
        </div>
    `
    )
    .join("");
}

function filterByCategory(category) {
  appState.filters.category = category;
  showPage("products");
}

// Products Page Functions
function initProductsPage() {
  loadCategoryFilters();
  loadProducts();
  setupFilters();
}

function loadCategoryFilters() {
  const container = document.getElementById("categoryFilters");

  container.innerHTML = appState.categories
    .map(
      (category) => `
        <div class="form-check mb-2">
            <input class="form-check-input category-filter" type="checkbox" 
                   value="${category.name}" id="cat-${category.name.replace(
        /\s+/g,
        "-"
      )}">
            <label class="form-check-label" for="cat-${category.name.replace(
              /\s+/g,
              "-"
            )}">
                ${category.name}
            </label>
        </div>
    `
    )
    .join("");
}

function setupFilters() {
  // Price range filter
  const priceRange = document.getElementById("priceRange");
  const maxPriceDisplay = document.getElementById("maxPrice");

  priceRange.addEventListener("input", (e) => {
    maxPriceDisplay.textContent = `$${e.target.value}`;
    appState.filters.maxPrice = parseFloat(e.target.value);
  });

  // Apply filters button
  document
    .getElementById("applyFilters")
    .addEventListener("click", applyFilters);

  // Clear filters button
  document
    .getElementById("clearFilters")
    .addEventListener("click", clearFilters);

  // Sort select
  document.getElementById("sortSelect").addEventListener("change", (e) => {
    appState.sortBy = e.target.value;
    loadProducts();
  });

  // Search input
  document.getElementById("searchInput").addEventListener("input", (e) => {
    appState.filters.searchQuery = e.target.value.toLowerCase();
    loadProducts();
  });
}

function applyFilters() {
  // Get selected categories
  const selectedCategories = Array.from(
    document.querySelectorAll(".category-filter:checked")
  ).map((cb) => cb.value);

  appState.filters.selectedCategories = selectedCategories;

  // Get rating filter
  const ratingFilter = document.getElementById("rating4");
  appState.filters.minRating = ratingFilter.checked ? 4 : 0;

  loadProducts();
}

function clearFilters() {
  appState.filters = {
    category: "",
    minPrice: 0,
    maxPrice: 500,
    minRating: 0,
    searchQuery: "",
    selectedCategories: [],
  };

  // Reset form elements
  document
    .querySelectorAll(".category-filter")
    .forEach((cb) => (cb.checked = false));
  document.getElementById("rating4").checked = false;
  document.getElementById("priceRange").value = 500;
  document.getElementById("maxPrice").textContent = "$500";
  document.getElementById("searchInput").value = "";

  loadProducts();
}

function loadProducts() {
  let filteredProducts = [...appState.products];

  // Apply search filter
  if (appState.filters.searchQuery) {
    filteredProducts = filteredProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(appState.filters.searchQuery) ||
        product.description
          .toLowerCase()
          .includes(appState.filters.searchQuery) ||
        product.category.toLowerCase().includes(appState.filters.searchQuery)
    );
  }

  // Apply category filter
  if (appState.filters.category) {
    filteredProducts = filteredProducts.filter(
      (product) => product.category === appState.filters.category
    );
  }

  // Apply selected categories filter
  if (
    appState.filters.selectedCategories &&
    appState.filters.selectedCategories.length > 0
  ) {
    filteredProducts = filteredProducts.filter((product) =>
      appState.filters.selectedCategories.includes(product.category)
    );
  }

  // Apply price filter
  filteredProducts = filteredProducts.filter(
    (product) =>
      product.price >= appState.filters.minPrice &&
      product.price <= appState.filters.maxPrice
  );

  // Apply rating filter
  if (appState.filters.minRating > 0) {
    filteredProducts = filteredProducts.filter(
      (product) => product.rating >= appState.filters.minRating
    );
  }

  // Apply sorting
  switch (appState.sortBy) {
    case "price-low":
      filteredProducts.sort((a, b) => a.price - b.price);
      break;
    case "price-high":
      filteredProducts.sort((a, b) => b.price - a.price);
      break;
    case "rating":
      filteredProducts.sort((a, b) => b.rating - a.rating);
      break;
    case "name":
    default:
      filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
      break;
  }

  // Update product count
  document.getElementById(
    "productCount"
  ).textContent = `${filteredProducts.length} products found`;

  // Render products
  const container = document.getElementById("productsGrid");
  container.innerHTML = filteredProducts
    .map(
      (product) => `
        <div class="col-lg-4 col-md-6 mb-4">
            <div class="card product-card h-100">
                <div class="product-image-placeholder">
                    <i class="fas fa-image"></i>
                </div>
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <div class="product-rating mb-2">
                        ${generateStars(product.rating)}
                        <span class="text-muted">(${product.rating})</span>
                    </div>
                    <p class="card-text">${product.description.substring(
                      0,
                      100
                    )}...</p>
                    <div class="d-flex justify-content-between align-items-center mb-2">
                        <span class="product-price">${formatPrice(
                          product.price
                        )}</span>
                        <span class="badge bg-secondary">${
                          product.category
                        }</span>
                    </div>
                    <div class="d-grid gap-2">
                        <button class="btn btn-outline-primary btn-sm" onclick="viewProduct(${
                          product.id
                        })">
                            <i class="fas fa-eye me-1"></i>View Details
                        </button>
                        <button class="btn btn-primary btn-sm" onclick="addToCart(${
                          product.id
                        })">
                            <i class="fas fa-cart-plus me-1"></i>Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `
    )
    .join("");
}

// Product Detail Functions
function viewProduct(productId) {
  const product = appState.products.find((p) => p.id === productId);
  if (!product) return;

  appState.currentProduct = product;

  // Update breadcrumb
  document.getElementById("productBreadcrumb").textContent = product.name;

  // Update product image (placeholder)
  const productImage = document.getElementById("productMainImage");
  productImage.style.display = "block";
  productImage.src = product.image;
  productImage.alt = product.name;

  // Update product details
  const detailsContainer = document.getElementById("productDetails");
  detailsContainer.innerHTML = `
        <div class="product-details">
            <h1 class="product-title">${product.name}</h1>
            <div class="product-rating-large mb-3">
                <span class="product-rating">${generateStars(
                  product.rating
                )}</span>
                <span class="text-muted">(${product.rating} out of 5)</span>
            </div>
            <div class="product-price-large mb-3">${formatPrice(
              product.price
            )}</div>
            <div class="product-description mb-4">
                <p>${product.description}</p>
            </div>
            <div class="product-specs mb-4">
                <h6>Specifications:</h6>
                <ul>
                    ${product.specifications
                      .map((spec) => `<li>${spec}</li>`)
                      .join("")}
                </ul>
            </div>
            <div class="d-flex align-items-center gap-3 mb-4">
                <label for="quantity" class="form-label mb-0">Quantity:</label>
                <div class="quantity-controls">
                    <button class="quantity-btn" onclick="changeQuantity(-1)">
                        <i class="fas fa-minus"></i>
                    </button>
                    <input type="number" id="productQuantity" class="quantity-input" value="1" min="1">
                    <button class="quantity-btn" onclick="changeQuantity(1)">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
            </div>
            <div class="d-grid gap-2">
                <button class="btn btn-primary btn-lg" onclick="addToCartFromDetail()">
                    <i class="fas fa-cart-plus me-2"></i>Add to Cart
                </button>
                <button class="btn btn-outline-secondary" onclick="showPage('products')">
                    <i class="fas fa-arrow-left me-2"></i>Back to Products
                </button>
            </div>
        </div>
    `;

  // Load reviews
  loadReviews();

  showPage("product-detail");
}

function changeQuantity(delta) {
  const quantityInput = document.getElementById("productQuantity");
  const currentValue = parseInt(quantityInput.value);
  const newValue = Math.max(1, currentValue + delta);
  quantityInput.value = newValue;
}

function addToCartFromDetail() {
  if (!appState.currentProduct) return;

  const quantity = parseInt(document.getElementById("productQuantity").value);
  addToCart(appState.currentProduct.id, quantity);
}

function loadReviews() {
  // Mock reviews data
  const reviews = [
    {
      author: "John D.",
      rating: 5,
      date: "2023-10-01",
      comment: "Excellent product! Highly recommended.",
    },
    {
      author: "Sarah M.",
      rating: 4,
      date: "2023-09-28",
      comment: "Good quality, fast delivery.",
    },
    {
      author: "Mike R.",
      rating: 5,
      date: "2023-09-25",
      comment: "Perfect! Exactly what I was looking for.",
    },
  ];

  const container = document.getElementById("reviewsSection");
  container.innerHTML = reviews
    .map(
      (review) => `
        <div class="card mb-3">
            <div class="card-body">
                <div class="d-flex justify-content-between align-items-start mb-2">
                    <div>
                        <h6 class="mb-1">${review.author}</h6>
                        <div class="product-rating">
                            ${generateStars(review.rating)}
                        </div>
                    </div>
                    <small class="text-muted">${new Date(
                      review.date
                    ).toLocaleDateString()}</small>
                </div>
                <p class="mb-0">${review.comment}</p>
            </div>
        </div>
    `
    )
    .join("");
}

// Cart Functions
function addToCart(productId, quantity = 1) {
  const product = appState.products.find((p) => p.id === productId);
  if (!product) return;

  const existingItem = appState.cart.find(
    (item) => item.product.id === productId
  );

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    appState.cart.push({
      product: product,
      quantity: quantity,
    });
  }

  updateCartCount();
  showToast(`${product.name} added to cart!`);
}

function removeFromCart(productId) {
  appState.cart = appState.cart.filter((item) => item.product.id !== productId);
  updateCartCount();

  if (appState.currentPage === "cart") {
    initCartPage();
  }

  showToast("Item removed from cart!");
}

function updateCartQuantity(productId, quantity) {
  const item = appState.cart.find((item) => item.product.id === productId);
  if (item) {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      item.quantity = quantity;
      updateCartCount();

      if (appState.currentPage === "cart") {
        updateCartSummary();
      }
    }
  }
}

function updateCartCount() {
  const totalItems = appState.cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );
  document.getElementById("cartCount").textContent = totalItems;
}

function initCartPage() {
  const cartEmpty = document.getElementById("cartEmpty");
  const cartContent = document.getElementById("cartContent");

  if (appState.cart.length === 0) {
    cartEmpty.classList.remove("d-none");
    cartContent.classList.add("d-none");
  } else {
    cartEmpty.classList.add("d-none");
    cartContent.classList.remove("d-none");
    loadCartItems();
    updateCartSummary();
  }
}

function loadCartItems() {
  const container = document.getElementById("cartItems");

  container.innerHTML = appState.cart
    .map(
      (item) => `
        <div class="cart-item">
            <div class="row align-items-center">
                <div class="col-md-2">
                    <div class="cart-item-image product-image-placeholder" style="width: 80px; height: 80px;">
                        <i class="fas fa-image"></i>
                    </div>
                </div>
                <div class="col-md-4">
                    <h6 class="mb-1">${item.product.name}</h6>
                    <small class="text-muted">${item.product.category}</small>
                </div>
                <div class="col-md-2">
                    <div class="product-price">${formatPrice(
                      item.product.price
                    )}</div>
                </div>
                <div class="col-md-2">
                    <div class="quantity-controls">
                        <button class="quantity-btn" onclick="updateCartQuantity(${
                          item.product.id
                        }, ${item.quantity - 1})">
                            <i class="fas fa-minus"></i>
                        </button>
                        <input type="number" class="quantity-input" value="${
                          item.quantity
                        }" 
                               onchange="updateCartQuantity(${
                                 item.product.id
                               }, parseInt(this.value))">
                        <button class="quantity-btn" onclick="updateCartQuantity(${
                          item.product.id
                        }, ${item.quantity + 1})">
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                </div>
                <div class="col-md-2 text-end">
                    <div class="fw-bold mb-2">${formatPrice(
                      item.product.price * item.quantity
                    )}</div>
                    <button class="btn btn-outline-danger btn-sm" onclick="removeFromCart(${
                      item.product.id
                    })">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        </div>
    `
    )
    .join("");
}

function updateCartSummary() {
  const subtotal = appState.cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const tax = subtotal * 0.08; // 8% tax
  const shipping = subtotal > 50 ? 0 : 9.99; // Free shipping over $50
  const total = subtotal + tax + shipping;

  const summaryHTML = `
        <div class="d-flex justify-content-between mb-2">
            <span>Subtotal:</span>
            <span>${formatPrice(subtotal)}</span>
        </div>
        <div class="d-flex justify-content-between mb-2">
            <span>Tax:</span>
            <span>${formatPrice(tax)}</span>
        </div>
        <div class="d-flex justify-content-between mb-2">
            <span>Shipping:</span>
            <span>${shipping === 0 ? "Free" : formatPrice(shipping)}</span>
        </div>
        <hr>
        <div class="d-flex justify-content-between fw-bold">
            <span>Total:</span>
            <span>${formatPrice(total)}</span>
        </div>
    `;

  document.getElementById("cartSummary").innerHTML = summaryHTML;

  // Update checkout summary if on checkout page
  const checkoutSummary = document.getElementById("checkoutSummary");
  if (checkoutSummary) {
    checkoutSummary.innerHTML = summaryHTML;
  }
}

// Checkout Functions
function initCheckoutPage() {
  if (appState.cart.length === 0) {
    showPage("cart");
    return;
  }

  updateCartSummary();
  setupCheckoutForm();
}

function setupCheckoutForm() {
  const form = document.getElementById("checkoutForm");
  const placeOrderBtn = document.getElementById("placeOrder");

  placeOrderBtn.addEventListener("click", (e) => {
    e.preventDefault();

    // Validate form
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    // Process order
    processOrder();
  });

  // Setup payment method toggle
  const paymentRadios = document.querySelectorAll('input[name="payment"]');
  const creditCardForm = document.getElementById("creditCardForm");

  paymentRadios.forEach((radio) => {
    radio.addEventListener("change", (e) => {
      if (e.target.id === "creditCard") {
        creditCardForm.style.display = "block";
      } else {
        creditCardForm.style.display = "none";
      }
    });
  });
}

function processOrder() {
  showLoading(true);

  // Simulate order processing
  setTimeout(() => {
    showLoading(false);

    // Clear cart
    appState.cart = [];
    updateCartCount();

    // Show success message
    showToast(
      "Order placed successfully! You will receive a confirmation email shortly."
    );

    // Redirect to home page
    setTimeout(() => {
      showPage("home");
    }, 2000);
  }, 2000);
}

// Form Functions
function setupFormHandlers() {
  // Login form
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      handleLogin();
    });
  }

  // Register form
  const registerForm = document.getElementById("registerForm");
  if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault();
      handleRegister();
    });
  }

  // Contact form
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      handleContactForm();
    });
  }
}

function handleLogin() {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  showLoading(true);

  // Simulate login process
  setTimeout(() => {
    showLoading(false);
    appState.user = { email: email, name: email.split("@")[0] };
    showToast("Login successful!");
    showPage("home");
  }, 1000);
}

function handleRegister() {
  const name = document.getElementById("registerName").value;
  const email = document.getElementById("registerEmail").value;
  const password = document.getElementById("registerPassword").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  showLoading(true);

  // Simulate registration process
  setTimeout(() => {
    showLoading(false);
    appState.user = { email: email, name: name };
    showToast("Registration successful!");
    showPage("home");
  }, 1000);
}

function handleContactForm() {
  showLoading(true);

  // Simulate form submission
  setTimeout(() => {
    showLoading(false);
    showToast("Message sent successfully! We will get back to you soon.");
    document.getElementById("contactForm").reset();
  }, 1000);
}

// Initialize Application
function initApp() {
  // Setup navigation
  document.querySelectorAll("[data-page]").forEach((element) => {
    element.addEventListener("click", (e) => {
      e.preventDefault();
      const page = e.currentTarget.getAttribute("data-page");
      showPage(page);
    });
  });

  // Setup form handlers
  setupFormHandlers();

  // Initialize home page
  showPage("home");

  // Update cart count
  updateCartCount();

  console.log("ShopEasy application initialized successfully!");
}

// Start the application when DOM is loaded
document.addEventListener("DOMContentLoaded", initApp);
