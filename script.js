const mainImage = document.getElementById("mainImage");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");

const quantityInput = document.getElementById("quantity");
const increaseQuantity = document.getElementById("increaseQuantity");
const decreaseQuantity = document.getElementById("decreaseQuantity");
const quantity = document.getElementById("quantity");
const addToCart = document.getElementById("addToCart");
const cartBarge = document.getElementById("cartBarge");
const cartButton = document.getElementById("cartButton");
const cartDropDown = document.getElementById("cartDropdown");
const productCompany = document.getElementById("productCompany");
const productTitle = document.querySelector(".product-title");
const productPrice = document.querySelector(".product-price");
const originalPrice = document.getElementById("originalPrice");
const cartContent = document.getElementById("cart-content");
const cartTotal = document.getElementById("cartTotal");
const emptyCart = document.getElementById("emptyCart");
const totalAmount = document.getElementById("totalAmount");
const productThumbnails = document.getElementById("productThumbnails");
const description = document.getElementById("productDescription");
const navbarMenuToggle = document.getElementById("navbarMenuToggle");
const primaryNavigation = document.getElementById("primaryNavigation");
let cart = [];
let detailProduct = null;

const setNavigationOpen = (isOpen) => {
  primaryNavigation.classList.toggle("is-open", isOpen);
  navbarMenuToggle.setAttribute("aria-expanded", isOpen);
  navbarMenuToggle.setAttribute(
    "aria-label",
    isOpen ? "Close navigation menu" : "Open navigation menu",
  );
  const menuIcon = navbarMenuToggle.querySelector("i");
  menuIcon.classList.toggle("fa-bars", !isOpen);
  menuIcon.classList.toggle("fa-xmark", isOpen);
};

navbarMenuToggle.addEventListener("click", () => {
  const isOpen = navbarMenuToggle.getAttribute("aria-expanded") === "true";
  setNavigationOpen(!isOpen);
});

primaryNavigation.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => setNavigationOpen(false));
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") setNavigationOpen(false);
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 991.98) setNavigationOpen(false);
});

// FECTHING DATA FORM JSON
async function getProducts() {
  const response = await fetch("./product.json");
  const data = await response.json();
  const product = data[0];
  detailProduct = product;

  productTitle.textContent = product.name;
  productPrice.textContent = `$${product.price.toFixed(2)}`;
  productCompany.textContent = product.company;
  originalPrice.textContent = `$${product.originalPrice.toFixed(2)}`;
  description.textContent = product.description;
  mainImage.src = product.images[0].main;
  const imagess = product.images;
  imagess.forEach((image) => {
    const thumbButton = document.createElement("button");
    thumbButton.classList.add("thumbnail");
    const thumbnailImage = document.createElement("img");
    thumbButton.appendChild(thumbnailImage);
    thumbnailImage.src = image.thumbnail;
    productThumbnails.appendChild(thumbButton);

    // THUMBNAIL BUTTON
    thumbButton.addEventListener("click", () => {
      mainImage.src = image.main;
      const thumbactives = document.querySelectorAll(".thumbnail");

      thumbactives.forEach((thumbactive) => {
        thumbactive.classList.remove("active");
      });
      thumbButton.classList.add("active");
    });
  });
}
getProducts();

// General add to cart button
const generalAddToCart = (product, quantityToAdd = 1) => {
  if (!product || quantityToAdd <= 0) return;

  const existingItem = cart.find((item) => {
    return item.product.id === product.id && item.product.name === product.name;
  });
  if (existingItem) {
    existingItem.quantity += quantityToAdd;
  } else {
    cart.push({
      product: product,
      quantity: quantityToAdd,
    });
  }
  updateCart();
};

// CART UPDATE
const updateCart = () => {
  let cartHTML = "";
  cart.forEach((item) => {
    cartHTML += `
      <div class="cart-item">
        <img
          src="${item.product.images[0].main}"
          alt="${item.product.name}"
        >
        <div class="cart-item-details">
          <p>${item.product.name}</p>
          <span>
            $${item.product.price.toFixed(2)} × ${item.quantity}
          </span>
          <strong>
            $${(item.product.price * item.quantity).toFixed(2)}
          </strong>
        </div>
      </div>
    `;
  });
  cartContent.innerHTML = cartHTML;
  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );
  cartBarge.textContent = itemCount;
  totalAmount.textContent = `$${subtotal.toFixed(2)}`;
  updateCartUI();
  cartDropDown.style.display = "block";
};

const loadFeatureProducts = async () => {
  const featuredProducts = document.getElementById("featuredProducts");
  const response = await fetch("./product.json");
  const products = await response.json();
  const featuredItems = products.filter(
    (product) => product.featured === "true",
  );
  featuredItems.forEach((product, index) => {
    if (index % 4 === 0) {
      const slide = document.createElement("div");
      slide.className = `carousel-item${index === 0 ? " active" : ""}`;
      const productRow = document.createElement("div");
      productRow.className = "featured-product-row";
      slide.appendChild(productRow);
      featuredProducts.appendChild(slide);
    }

    const rows = featuredProducts.querySelectorAll(".featured-product-row");
    const latestRow = rows[rows.length - 1];
    const productCard = document.createElement("article");
    productCard.className = "featured-product-card";
    productCard.innerHTML = `
      <div class="featured-product-image">
        <img 
          src="${product.images[0].main}" 
          alt="${product.name}"
        >
        <button class="featured-product-btn" type="button">
          Add to cart 
          <i class="fas fa-shopping-cart" aria-hidden="true"></i>
        </button>
      </div>
      <div class="featured-product-info">
        <h3 class="featured-product-name">
          ${product.name}
        </h3>
        <span class="featured-product-price">
          $${product.price.toFixed(2)}
        </span>
      </div>
    `;
    productCard
      .querySelector(".featured-product-btn")
      .addEventListener("click", () => {
        generalAddToCart(product);
      });

    latestRow.appendChild(productCard);
  });
};
loadFeatureProducts();

// WOMEN PRODUCT
const loadWomenProducts = async () => {
  const womenProducts = document.getElementById("womenProducts");
  const response = await fetch("./product.json");
  const products = await response.json();

  const womenItems = products.filter((product) => {
    return product.category === "women";
  });

  womenItems.forEach((product, index) => {
    if (index % 4 === 0) {
      const slide = document.createElement("div");
      slide.className = `${index === 0 ? " active" : ""}`;

      const productRow = document.createElement("div");
      productRow.className = "women-product-row";
      slide.appendChild(productRow);
      womenProducts.appendChild(slide);
    }

    const rows = womenProducts.querySelectorAll(".women-product-row");
    const latestRow = rows[rows.length - 1];
    const productCard = document.createElement("article");
    productCard.className = "women-product-card";
    productCard.innerHTML = `
      <div class="women-product-image">
      
        <img src="${product.images[0].main}" alt="${product.name}">
        
        <button class="women-product-btn" type="button">
          Add to cart <i class="fas fa-shopping-cart" aria-hidden="true"></i>
        </button>
      </div>
      <div class="women-product-info">
      <span class="rating">${product.rating}</span>
        <h3 class="women-product-name">${product.name}</h3>
        <span class="women-product-price">$${product.price.toFixed(2)}</span>
      </div>
    `;

    productCard
      .querySelector(".women-product-btn")
      .addEventListener("click", () => {
        generalAddToCart(product);
      });

    latestRow.appendChild(productCard);
  });
};
loadWomenProducts();

// OPEN LIGHTBOX
function openLightbox() {
  lightboxImage.src = mainImage.src;
  lightbox.classList.add("active");
}
function closeLightbox() {
  lightbox.classList.remove("active");
}

// counter function or quantity control
let count = 0;
increaseQuantity.addEventListener("click", function () {
  count++;
  quantity.textContent = count;
});
decreaseQuantity.addEventListener("click", function () {
  if (count > 0) {
    count--;
    quantity.textContent = count;
  }
});

addToCart.addEventListener("click", function () {
  generalAddToCart(detailProduct, count);
});

cartButton.addEventListener("click", function () {
  if (cartDropDown.style.display === "block") {
    cartDropDown.style.display = "none";
  } else {
    cartDropDown.style.display = "block";
  }
});
function updateCartUI() {
  if (cart.length === 0) {
    emptyCart.style.display = "block";
    cartContent.style.display = "none";
    cartTotal.style.display = "none";
  } else {
    emptyCart.style.display = "none";
    cartContent.style.display = "block";
    cartTotal.style.display = "block";
  }
}

// Notification message function
// function showToast(message) {
//   const notification = document.createElement("div");
//   notification.className = "cart-notification";
//   notification.textContent = message;

//   //add to page
//   document.body.appendChild(notification);

//   // remove the notification after 4 seconds
//   setTimeout(() => {
//     notification.remove();
//   }, 4000);
// }

// // RUN INITIALIZATION WHEN PAGE LOADS
// window.addEventListener("DOMContentLoaded", initializeCart);
