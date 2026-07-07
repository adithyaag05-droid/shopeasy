# 🛍️ ShopEasy — Modern Fashion Store

<div align="center">

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)
![Vercel](https://img.shields.io/badge/Deployed-Vercel-000000?style=for-the-badge&logo=vercel)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**A fully responsive modern e-commerce fashion store built with vanilla HTML, CSS, and JavaScript.**  
Browse products, filter by category, manage your cart, and checkout — all client-side.

[🌐 Live Demo](https://shopeasy-sable.vercel.app) · [🐛 Report Bug](https://github.com/adithyaag05-droid/shopeasy/issues) · [✨ Request Feature](https://github.com/adithyaag05-droid/shopeasy/issues)

</div>

---

## 📸 Preview

| Home Page | Products | Cart |
|---|---|---|
| Hero section with categories | Filter + sort grid | Slide-out cart popup |

---

## ✨ Features

### 🏠 Home Page
- Hero section with gradient overlay and CTA buttons
- Featured categories — Men, Women, Accessories
- Trending products section
- Features bar — Free Shipping, Easy Returns, Secure Payment, 24/7 Support
- Newsletter subscription form
- Full footer with quick links and contact info

### 🛍️ Products Page
- Dynamic product grid rendered from JavaScript data
- Filter by category (Men, Women, Accessories)
- Price range slider filter
- Sort by — Latest, Price Low to High, Price High to Low, Popular
- Grid/List view toggle
- Real-time search — filters products as you type
- Sale and New badges on product cards
- Color swatches and size selectors per product
- Pagination

### 🛒 Cart System
- Slide-out cart popup on all pages
- Add to cart with quantity management
- Increase/decrease quantity buttons
- Remove items
- Real-time total calculation
- Cart badge showing item count
- Persistent cart via localStorage — survives page refresh
- Checkout redirect

### 💳 Checkout Page
- Shipping information form — Name, Email, Address, City, State, ZIP
- Payment information form — Card Number, Expiry, CVV
- Order summary with subtotal, shipping, tax, and total
- Responsive form layout

### 🔐 Auth Pages
- Login page with email/password form
- Remember me option
- Forgot password link
- Google and Facebook social login buttons
- Sign up page with full name, email, password
- Link between login and signup pages

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| HTML5 | Page structure and semantics |
| CSS3 + CSS Variables | Styling and theming |
| Vanilla JavaScript ES6+ | Cart logic, filtering, search, rendering |
| Bootstrap 5.3 | Responsive grid and UI components |
| Font Awesome 6 | Icons throughout the app |
| Google Fonts (Inter) | Typography |
| localStorage | Cart persistence across pages |

---

## 🚀 Getting Started

### Run Locally

No installation needed — just open in a browser.

```bash
# Clone the repo
git clone https://github.com/adithyaag05-droid/shopeasy.git
cd shopeasy
```

Then open `index.html` in your browser — or use Live Server in VS Code for best experience.

### VS Code Live Server
1. Open folder in VS Code
2. Install **Live Server** extension by Ritwick Dey
3. Right-click `index.html` → **Open with Live Server**

---

## 📁 Project Structure

```
shopeasy/
├── index.html          # Home page — hero, categories, trending products
├── products.html       # Products grid with filters and search
├── product-details.html# Individual product detail page
├── cart.html           # Full cart page
├── checkout.html       # Checkout form with order summary
├── login_new.html      # Login page
├── signup.html         # Sign up page
├── style.css           # Global styles and CSS variables
├── products.css        # Products page specific styles
├── cart.css            # Cart popup styles
├── cart-styles.css     # Additional cart styles
├── cart-functions.js   # Reusable cart functions
├── checkout.css        # Checkout page styles
├── login.css           # Login page styles
├── signup.css          # Sign up page styles
├── script.js           # Global scripts — notifications, search, animations
├── products.js         # Product data, rendering, filtering, sorting
└── cart.js             # Cart popup logic and management
```

---

## 🛒 Cart System Architecture

```
User clicks "Add to Cart"
  → addToCart() called with product id, name, price, image
  → Item added/quantity incremented in cart array
  → cart saved to localStorage
  → Cart badge count updated
  → Cart popup slides open
  → Total recalculated

Page refresh / new page
  → cart loaded from localStorage
  → Cart badge and display updated automatically
```

---

## 📄 Pages

| Page | File | Description |
|------|------|-------------|
| Home | `index.html` | Landing page with hero and featured products |
| Products | `products.html` | Full product grid with filters |
| Product Detail | `product-details.html` | Single product view |
| Cart | `cart.html` | Full cart page |
| Checkout | `checkout.html` | Shipping and payment form |
| Login | `login_new.html` | User login |
| Sign Up | `signup.html` | New user registration |

---

## 🎨 Design System

```css
--primary-color: #2563eb    /* Blue — buttons, links, highlights */
--secondary-color: #1e40af  /* Dark blue — hover states */
--accent-color: #f59e0b     /* Amber — CTA buttons, badges */
--text-color: #1f2937       /* Dark gray — body text */
--light-bg: #f3f4f6         /* Light gray — section backgrounds */
--white: #ffffff            /* White — cards, navbar text */
```

---

## 🌐 Deployment

Deployed on **Vercel** — zero config static site hosting.

Live at: **https://shopeasy-sable.vercel.app**

```bash
# Deploy via Vercel CLI
vercel --prod
```

---

## 🔮 Future Improvements

- [ ] Backend integration with Node.js + MongoDB
- [ ] Real user authentication with JWT
- [ ] Payment gateway integration (Razorpay)
- [ ] Product search with backend API
- [ ] Wishlist functionality
- [ ] Order history and tracking
- [ ] Admin dashboard for product management
- [ ] Product reviews and ratings

---

## 👨‍💻 Author

**Adithya AG**  
BCA Data Science · CMR University Bangalore

[![GitHub](https://img.shields.io/badge/GitHub-adithyaag05--droid-181717?style=flat&logo=github)](https://github.com/adithyaag05-droid)
[![Email](https://img.shields.io/badge/Email-adithyaag05%40gmail.com-D14836?style=flat&logo=gmail)](mailto:adithyaag05@gmail.com)
[![Live Demo](https://img.shields.io/badge/Live-shopeasy--sable.vercel.app-000000?style=flat&logo=vercel)](https://shopeasy-sable.vercel.app)

---

## 📝 License

MIT License — feel free to use this project for learning or building upon it.
