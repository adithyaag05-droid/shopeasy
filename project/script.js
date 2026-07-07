document.getElementById("navbar-toggle").addEventListener("click", function() {
    const menu = document.querySelector(".navbar-menu");
    menu.classList.toggle("active");
  });
  
// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let cartCount = document.querySelector('.badge');

// Update cart count
function updateCartCount() {
    cartCount.textContent = cart.length;
}

// Add to cart
function addToCart(productId, name, price, image) {
    cart.push({
        id: productId,
        name: name,
        price: price,
        image: image,
        quantity: 1
    });
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    
    // Show notification
    showNotification('Product added to cart!');
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Initialize cart count
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    
    // Add animation to elements with fade-in class
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(element => {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
    });
    
    // Add smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    
    // Add to cart button functionality
    const addToCartButtons = document.querySelectorAll('.btn-outline-primary');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.card');
            const productId = card.dataset.productId;
            const name = card.querySelector('.card-title').textContent;
            const price = parseFloat(card.querySelector('.text-primary').textContent.replace('$', ''));
            const image = card.querySelector('.card-img-top').src;
            
            addToCart(productId, name, price, image);
        });
    });
});

// Search functionality
const searchForm = document.querySelector('form');
if (searchForm) {
    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const searchTerm = this.querySelector('input').value.toLowerCase();
        window.location.href = `products.html?search=${encodeURIComponent(searchTerm)}`;
    });
}

// Newsletter subscription
const newsletterForm = document.querySelector('form:last-of-type');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        // Here you would typically send this to your backend
        showNotification('Thanks for subscribing!');
        this.reset();
    });
}

// Add CSS for notifications
const style = document.createElement('style');
style.textContent = `
    .notification {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: var(--primary-color);
        color: white;
        padding: 15px 25px;
        border-radius: 5px;
        animation: slideIn 0.5s ease-out;
        z-index: 1000;
    }
    
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);
  