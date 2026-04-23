let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(name, price) {
  cart.push({ name: name, price: Number(price) });
  saveCart();
  alert(name + " sepete eklendi.");
}

function renderCart() {
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");

  if (!cartItems || !cartTotal) {
    return;
  }

  if (cart.length === 0) {
    cartItems.innerHTML = "<p>Sepetinizde ürün bulunmamaktadır.</p>";
    cartTotal.textContent = "Toplam: ₺0";
    return;
  }

  let total = 0;
  let html = "<ul>";

  cart.forEach(function(item) {
    html += "<li>" + item.name + " - ₺" + item.price + "</li>";
    total += item.price;
  });

  html += "</ul>";
  cartItems.innerHTML = html;
  cartTotal.textContent = "Toplam: ₺" + total;
}

document.addEventListener("DOMContentLoaded", function() {
  const addButtons = document.querySelectorAll(".add-cart");

  addButtons.forEach(function(button) {
    button.addEventListener("click", function() {
      const name = this.getAttribute("data-name");
      const price = this.getAttribute("data-price");
      addToCart(name, price);
    });
  });

  const clearCartButton = document.getElementById("clear-cart");

  if (clearCartButton) {
    clearCartButton.addEventListener("click", function() {
      cart = [];
      saveCart();
      renderCart();
    });
  }

  renderCart();
});