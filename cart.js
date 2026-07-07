// Create cart popup HTML
const cartPopupHTML = `
    <div id="cartPopup" class="cart-popup">
        <div class="cart-header">
            <h2>Shopping Cart</h2>
        </div>
        <div id="cartItems" class="cart-items">
            <!-- Cart items will be added here -->
        </div>
        <div class="cart-footer">
            <div class="cart-total">
                <span>Total:</span>
                <span id="cartTotal">$0.00</span>
            </div>
            <button onclick="checkout()" class="checkout-btn">Checkout</button>
            <button onclick="toggleCart()" class="close-btn">Close</button>
        </div>
    </div>
`;

// Add cart popup to body
document.body.insertAdjacentHTML('beforeend', cartPopupHTML);

// Initialize cart
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Update cart badge
function updateCartBadge() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
    }
}

// Toggle cart visibility
function toggleCart() {
    const cartPopup = document.getElementById('cartPopup');
    const cartOverlay = document.querySelector('.cart-overlay');
    
    if (cartPopup.classList.contains('active')) {
        cartPopup.classList.remove('active');
        cartOverlay.classList.remove('active');
    } else {
        updateCartDisplay();
        cartPopup.classList.add('active');
        cartOverlay.classList.add('active');
    }
}

// Update cart display
function updateCartDisplay() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <p>Your cart is empty</p>
            </div>
        `;
        cartTotal.textContent = '$0.00';
        return;
    }

    let total = 0;
    cartItems.innerHTML = cart.map((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        return `
            <div class="cart-item">
                <div class="cart-item-details">
                    <div class="cart-item-name">${item.name} - $${item.price.toFixed(2)}</div>
                    <div class="cart-item-quantity">
                        <button onclick="updateQuantity(${index}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="updateQuantity(${index}, 1)">+</button>
                    </div>
                </div>
                <button class="remove-btn" onclick="removeItem(${index})">Remove</button>
            </div>
        `;
    }).join('');
    
    cartTotal.textContent = `$${total.toFixed(2)}`;
}

// Add item to cart
function addToCart(product) {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartBadge();
    updateCartDisplay();
    toggleCart();
}

// Update item quantity
function updateQuantity(index, change) {
    cart[index].quantity += change;
    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartBadge();
    updateCartDisplay();
}

// Remove item from cart
function removeItem(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartBadge();
    updateCartDisplay();
}

// Checkout function
function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    window.location.href = 'checkout.html';
}

// Close cart when clicking outside
document.addEventListener('click', function(event) {
    const cartPopup = document.getElementById('cartPopup');
    const cartOverlay = document.querySelector('.cart-overlay');
    const cartButton = document.querySelector('.cart-button');
    
    if (cartPopup && cartButton && !cartPopup.contains(event.target) && !cartButton.contains(event.target)) {
        cartPopup.classList.remove('active');
        cartOverlay.classList.remove('active');
    }
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    updateCartBadge();
    updateCartDisplay();
}); 