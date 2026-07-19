# Hunar — India's Handmade Heritage Marketplace

Hunar (हुनर, "skill/craft") is a full-stack marketplace where Indian artisans, painters,
potters and craftspeople showcase and sell handmade products directly to buyers — no
middlemen, no generic ecommerce template.

This repo contains a complete, working MVP: a TypeScript/Express/MongoDB API and a
React/Vite/Tailwind frontend, styled around an earthy, handcrafted visual identity
(Warli borders, mandala dividers, terracotta and antique-gold tones) instead of a
generic blue-gradient storefront.

---

## 1. Project Overview

- **Buyers** can browse products by category, search, filter by price, view detailed
  product pages with a "Meet the Artisan" section, add to cart, check out (Cash on
  Delivery), and view their order history.
- **Sellers (artisans)** register with a craft profile (city, craft, story, years of
  experience), then list, edit, and delete products from a seller dashboard, upload
  product photos, and manage incoming orders' status.
- Every page and button is wired to a real API endpoint — there are no placeholder
  pages or dead buttons.

## 2. Features

**Buyer**
- Register / Login (JWT-based auth)
- Browse & search products, filter by category/price, sort by newest/popular/price
- Product detail page with images, reviews, related products, and artisan bio
- Add to cart, update quantities, remove items
- Checkout with shipping address (Cash on Delivery)
- Order history and order detail pages
- Profile editing

**Seller**
- Register as an artisan with a craft profile
- Seller dashboard: revenue, product count, order count
- Add / edit / delete products with multi-image upload (Cloudinary)
- View and update order status (placed → processing → shipped → delivered)

**General**
- Role-based access control (buyer vs seller) on both frontend routes and backend endpoints
- Full-text product search, category filters, price filters
- Responsive design (mobile, tablet, laptop, desktop)
- Framer Motion page transitions and hover animations (kept subtle)

## 3. Tech Stack

| Layer      | Technology |
|------------|------------|
| Frontend   | React (Vite), TypeScript, Tailwind CSS, React Router, Axios, Context API, React Hook Form, Zod, Framer Motion, Lucide Icons |
| Backend    | Node.js, Express.js, TypeScript |
| Database   | MongoDB Atlas, Mongoose |
| Auth       | JWT, bcrypt |
| Image Upload | Cloudinary |
| Deployment | Frontend → Vercel, Backend → Render, DB → MongoDB Atlas |

## 4. Folder Structure

```
hunar/
├── backend/
│   ├── src/
│   │   ├── config/          # db.ts, cloudinary.ts
│   │   ├── models/          # User, Product, Category, Cart, Order (Mongoose schemas)
│   │   ├── middleware/      # auth, upload, validate, errorHandler
│   │   ├── controllers/     # request handlers per resource
│   │   ├── routes/          # Express routers per resource
│   │   ├── utils/           # generateToken, ApiError, asyncHandler
│   │   ├── seed/            # seed.ts — demo data generator
│   │   ├── types/           # shared TS types (AuthRequest, JwtPayload)
│   │   └── server.ts        # app entry point
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/      # Navbar, Footer
│   │   │   ├── home/        # Hero, CategoryGrid, FeaturedProducts, etc.
│   │   │   ├── product/     # ProductCard, ArtisanCard, ReviewCard, ProductForm, ImageUploader
│   │   │   ├── decorative/  # Warli/Mandala dividers, hero illustration (the "Indian craft" visual identity)
│   │   │   └── ui/          # Button, Card, Badge, Rating, Spinner
│   │   ├── context/         # AuthContext, CartContext
│   │   ├── pages/           # one file per route
│   │   ├── routes/          # ProtectedRoute
│   │   ├── lib/axios.ts     # shared API client
│   │   └── types/           # shared TS types
│   ├── package.json
│   ├── tailwind.config.js
│   └── .env.example
│
└── README.md
```

## 5. Installation

Requires **Node.js 18+** and **npm**.

```bash
git clone <your-repo-url> hunar
cd hunar

# Backend
cd backend
npm install
cp .env.example .env      # then fill in your real values (see section 7 & 8)

# Frontend (in a separate terminal)
cd ../frontend
npm install
cp .env.example .env      # defaults to http://localhost:5000/api, adjust if needed
```

## 6. Environment Variables

**backend/.env**
```
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/hunar?retryWrites=true&w=majority
JWT_SECRET=replace_this_with_a_long_random_string
JWT_EXPIRES_IN=7d
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CLIENT_URL=http://localhost:5173
```

**frontend/.env**
```
VITE_API_URL=http://localhost:5000/api
```

## 7. MongoDB Atlas Setup

1. Create a free account at [mongodb.com/atlas](https://www.mongodb.com/atlas).
2. Create a new (free tier) Cluster.
3. Under **Database Access**, create a database user with a username/password.
4. Under **Network Access**, add your current IP (or `0.0.0.0/0` for development).
5. Click **Connect → Drivers**, copy the connection string, and paste it into
   `backend/.env` as `MONGO_URI`, replacing `<username>`, `<password>`, and adding
   `/hunar` before the query string as the database name.

## 8. Cloudinary Setup

1. Create a free account at [cloudinary.com](https://cloudinary.com).
2. From your Dashboard, copy the **Cloud Name**, **API Key**, and **API Secret**.
3. Paste them into `backend/.env`.

Product images are uploaded from the seller dashboard's "Add Product" form,
streamed directly to Cloudinary (no local disk writes), and the returned secure
URLs are stored on the product document.

## 9. Seeding Demo Data

Once `MONGO_URI` is set, seed the database with 15 categories, 10 artisan
profiles, and 40 handmade products:

```bash
cd backend
npm run seed
```

This will **wipe** existing Users/Products/Categories/Carts/Orders and reseed them.
Demo logins (password for all is `password123`):
- Buyer: `buyer@hunar.demo`
- Any artisan email printed in the console output after seeding (e.g. `meera.devi@hunar.demo`)

Note: seeded product/artisan images are generated placeholder images (via
placehold.co) in the site's color palette, since no real product photography
is included in this demo dataset. Swap them for real photos via the seller
dashboard's image uploader once Cloudinary is configured.

## 10. Running the App

**Backend** (from `/backend`):
```bash
npm run dev       # starts on http://localhost:5000
```

**Frontend** (from `/frontend`, in a separate terminal):
```bash
npm run dev       # starts on http://localhost:5173
```

Visit `http://localhost:5173` in your browser.

## 11. Deployment

**Backend → Render**
1. Push this repo to GitHub.
2. Create a new **Web Service** on [Render](https://render.com), pointing at the `backend` folder.
3. Build command: `npm install && npm run build`
4. Start command: `npm start`
5. Add all `backend/.env` variables as Render environment variables (set `CLIENT_URL` to your deployed Vercel URL).

**Frontend → Vercel**
1. Import the repo into [Vercel](https://vercel.com), set the root directory to `frontend`.
2. Framework preset: Vite.
3. Add `VITE_API_URL` as an environment variable, pointing to your deployed Render backend
   (e.g. `https://your-app.onrender.com/api`).

**Database → MongoDB Atlas** — already covered in section 7; no further deployment steps needed.

## 12. API Overview

All endpoints are prefixed with `/api`.

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/auth/register` | — | Register buyer or seller |
| POST | `/auth/login` | — | Login |
| GET  | `/auth/me` | Bearer | Current user |
| GET  | `/products` | — | List products (search, category, price, sort, pagination) |
| GET  | `/products/featured` | — | Featured products |
| GET  | `/products/:id` | — | Product detail + related products |
| POST | `/products` | Seller | Create product |
| PUT  | `/products/:id` | Seller (owner) | Update product |
| DELETE | `/products/:id` | Seller (owner) | Delete product |
| GET  | `/products/seller/mine` | Seller | Seller's own products |
| POST | `/products/:id/reviews` | Buyer/Seller | Add a review |
| GET  | `/categories` | — | List categories |
| GET  | `/users/artisans` | — | List all artisans |
| GET  | `/users/artisans/:id` | — | Artisan profile + their products |
| PUT  | `/users/profile` | Bearer | Update own profile |
| GET/POST/PUT/DELETE | `/cart` | Bearer | Manage cart |
| POST | `/orders` | Bearer | Checkout (creates order from cart) |
| GET  | `/orders/mine` | Buyer | Buyer's order history |
| GET  | `/orders/seller` | Seller | Orders containing seller's products |
| PUT  | `/orders/:id/status` | Seller | Update order status |
| POST | `/upload` | Seller | Upload images to Cloudinary |

## 13. Known Limitations (honest notes)

- Payment is Cash-on-Delivery only; no real payment gateway is integrated (Razorpay/Stripe
  would be the natural next step).
- The contact form on `/contact` is UI-only in this MVP (not wired to an email service).
- Seed data uses generated placeholder images, not real artisan photography.
- No automated test suite is included; this is an MVP focused on a clean, working feature set.

---

Built as a clean, interview-ready full-stack codebase — reusable components, typed
end-to-end, no duplicate logic, and every button wired to a real endpoint.
