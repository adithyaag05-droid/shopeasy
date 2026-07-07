document.addEventListener("DOMContentLoaded", function() {
    updateCartDisplay();
});

// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Toggle cart popup
function toggleCart() {
    const cart = document.getElementById('side-cart');
    if (cart) {
        cart.classList.toggle('cart-open');
    }
}

// Add to cart
function addToCart(productId, name, price, image) {
    let existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: productId,
            name: name,
            price: price,
            image: image,
            quantity: 1
        });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
    showNotification('Product added to cart!');
    toggleCart();
}

// Update cart display
function updateCartDisplay() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const cartCount = document.getElementById('cart-count');
    
    if (!cartItems) return;
    
    cartItems.innerHTML = "";
    let total = 0;
    
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        const li = document.createElement("li");
        li.className = "cart-item";
        li.innerHTML = `
            <div>
                <h5>${item.name}</h5>
                <p>$${item.price.toFixed(2)} x ${item.quantity}</p>
            </div>
            <div>
                <button onclick="changeQuantity(${index}, -1)">-</button>
                <span>${item.quantity}</span>
                <button onclick="changeQuantity(${index}, 1)">+</button>
                <button onclick="removeItem(${index})">×</button>
            </div>
        `;
        cartItems.appendChild(li);
    });
    
    if (cartTotal) {
        cartTotal.textContent = `$${total.toFixed(2)}`;
    }
    
    if (cartCount) {
        cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    }
}

// Change quantity
function changeQuantity(index, change) {
    cart[index].quantity += change;
    if (cart[index].quantity < 1) {
        cart.splice(index, 1);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
}

// Remove item
function removeItem(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
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

// Sample product data (in a real app, this would come from an API)
const products = [
    {
        id: 1,
        name: "Classic Denim Jacket",
        price: 79.99,
        originalPrice: 99.99,
        category: "men",
        image: "https://images.unsplash.com/photo-1617137968427-85924c800a22",
        isNew: true,
        isSale: true,
        colors: ["blue", "black"],
        sizes: ["S", "M", "L", "XL"]
    },
    {
        id: 2,
        name: "Floral Summer Dress",
        price: 49.99,
        category: "women",
        image: "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f",
        isNew: true,
        colors: ["red", "blue", "white"],
        sizes: ["XS", "S", "M", "L"]
    },
    // Add more products here
];

// State management
let currentFilters = {
    category: [],
    priceRange: 200,
    size: [],
    color: [],
    sortBy: 'latest'
};

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    // Initialize cart display
    updateCartDisplay();
    
    // Initialize products
    renderProducts(products);
    
    // Initialize filters
    setupFilters();
});

// Render products
function renderProducts(productsToRender) {
    const productsGrid = document.getElementById('productsGrid');
    productsGrid.innerHTML = '';
    
    productsToRender.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'col-md-4 col-lg-4';
        productCard.innerHTML = `
            <div class="card h-100" data-product-id="${product.id}">
                ${product.isSale ? `
                    <div class="position-absolute top-0 end-0 m-2">
                        <span class="badge bg-danger">Sale</span>
                    </div>
                ` : ''}
                ${product.isNew ? `
                    <div class="position-absolute top-0 start-0 m-2">
                        <span class="badge bg-primary">New</span>
                    </div>
                ` : ''}
                <img src="${product.image}" class="card-img-top" alt="${product.name}">
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            ${product.originalPrice ? `
                                <span class="text-muted text-decoration-line-through">$${product.originalPrice}</span>
                            ` : ''}
                            <span class="ms-2 text-primary fw-bold">$${product.price}</span>
                        </div>
                        <button class="btn btn-outline-primary btn-sm" onclick="addToCart(${product.id}, '${product.name}', ${product.price}, '${product.image}')">
                            <i class="fas fa-shopping-cart"></i> Add
                        </button>
                    </div>
                    <div class="mt-3">
                        <div class="d-flex gap-1">
                            ${product.colors.map(color => `
                                <div class="color-option" style="background-color: ${color};"></div>
                            `).join('')}
                        </div>
                        <div class="d-flex gap-1 mt-2">
                            ${product.sizes.map(size => `
                                <button class="btn btn-outline-secondary btn-sm">${size}</button>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;
        productsGrid.appendChild(productCard);
    });
}

// Setup filters
function setupFilters() {
    // Category filters
    document.querySelectorAll('.form-check-input').forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            const category = checkbox.value;
            if (checkbox.checked) {
                currentFilters.category.push(category);
            } else {
                currentFilters.category = currentFilters.category.filter(c => c !== category);
            }
            applyFilters();
        });
    });
    
    // Price range
    const priceRange = document.getElementById('priceRange');
    const priceValue = document.getElementById('priceValue');
    if (priceRange && priceValue) {
        priceRange.addEventListener('input', (e) => {
            const value = e.target.value;
            priceValue.textContent = `$${value}`;
            currentFilters.priceRange = value;
            applyFilters();
        });
    }
    
    // Size filters
    document.querySelectorAll('.btn-outline-secondary').forEach(btn => {
        btn.addEventListener('click', () => {
            btn.classList.toggle('active');
            const size = btn.textContent;
            if (btn.classList.contains('active')) {
                currentFilters.size.push(size);
            } else {
                currentFilters.size = currentFilters.size.filter(s => s !== size);
            }
            applyFilters();
        });
    });
    
    // Sort options
    const sortSelect = document.querySelector('.form-select');
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            currentFilters.sortBy = e.target.value.toLowerCase();
            applyFilters();
        });
    }
}

// Apply filters
function applyFilters() {
    let filteredProducts = [...products];
    
    // Apply category filter
    if (currentFilters.category.length > 0) {
        filteredProducts = filteredProducts.filter(product => 
            currentFilters.category.includes(product.category)
        );
    }
    
    // Apply price filter
    filteredProducts = filteredProducts.filter(product => 
        product.price <= currentFilters.priceRange
    );
    
    // Apply size filter
    if (currentFilters.size.length > 0) {
        filteredProducts = filteredProducts.filter(product => 
            product.sizes.some(size => currentFilters.size.includes(size))
        );
    }
    
    // Apply sorting
    switch (currentFilters.sortBy) {
        case 'price: low to high':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price: high to low':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case 'popular':
            // In a real app, this would sort by popularity metrics
            break;
        default:
            // Latest - sort by id (assuming higher id = newer product)
            filteredProducts.sort((a, b) => b.id - a.id);
    }
    
    renderProducts(filteredProducts);
}

// View toggle
document.querySelectorAll('.btn-group .btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.btn-group .btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const productsGrid = document.getElementById('productsGrid');
        if (btn.querySelector('.fa-list')) {
            productsGrid.classList.remove('row-cols-md-3');
            productsGrid.classList.add('row-cols-md-1');
        } else {
            productsGrid.classList.remove('row-cols-md-1');
            productsGrid.classList.add('row-cols-md-3');
        }
    });
});

// Product search functionality
function handleSearch(event) {
    event.preventDefault();
    const searchInput = document.querySelector('.search-input');
    const searchTerm = searchInput.value.toLowerCase().trim();
    
    if (!searchTerm) return;

    // Get all product cards
    const products = document.querySelectorAll('.card');
    let matchCount = 0;

    products.forEach(product => {
        const title = product.querySelector('.card-title').textContent.toLowerCase();
        const description = product.querySelector('.card-text')?.textContent.toLowerCase() || '';
        
        if (title.includes(searchTerm) || description.includes(searchTerm)) {
            product.style.display = '';
            matchCount++;
        } else {
            product.style.display = 'none';
        }
    });

    // Update product count
    const productCount = document.getElementById('productCount');
    if (productCount) {
        productCount.textContent = matchCount === 0 
            ? 'No products found' 
            : `Showing ${matchCount} product${matchCount === 1 ? '' : 's'}`;
    }
}

// Initialize search on page load
document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.querySelector('.search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', handleSearch);
    }

    // Add input event listener for real-time search
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            if (e.target.value === '') {
                // Show all products when search is cleared
                const products = document.querySelectorAll('.card');
                products.forEach(product => product.style.display = '');
                
                const productCount = document.getElementById('productCount');
                if (productCount) {
                    productCount.textContent = `Showing all products`;
                }
            }
        });
    }
});
