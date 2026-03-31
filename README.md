# 🎬 CinemaY - Premium Movie & Series Rating Portal

CinemaY is a high-performance, modern web application where users can explore, rate, and review their favorite movies and TV series. Built with a focus on user experience and security, it features seamless streaming integration, a robust review system, and premium subscription models.

---

## 🚀 Live Demo
[Live Link Coming Soon](https://cinemay.vercel.app) | [Frontend Repository](https://github.com/sakibhossain22/Cinemay-Frontend) | [Backend Repository](https://github.com/sakibhossain22/Cinemay-Backend)

---

## ✨ Key Features

### 👤 User Features
- **Smart Exploration:** Browse by genre, release year, director, or streaming platform.
- **Advanced Authentication:** Secure login via Email/Password and **Social Login (Google)** using Better Auth.
- **Rating System:** 1-10 star ratings with detailed written reviews and spoiler toggles.
- **Interactions:** Like/Unlike reviews and engage in threaded comments.
- **Personal Watchlist:** Save titles for later viewing.
- **Purchase & Rent:** Access premium content through one-time rentals or monthly/yearly subscriptions.
- **Streaming:** Direct YouTube integration for trailers and movies.

### 🛠 Admin Features (Dashboard)
- **Media Library:** Full CRUD operations for movies, series, cast, and metadata.
- **Content Moderation:** Approve or unpublish user reviews and remove inappropriate comments.
- **Analytics:** View sales reports, rental stats, and aggregated user ratings.
- **Role Management:** Admin-only access to sensitive platform data.

---

## 🛠️ Tech Stack

| Technology | Description |
|----------|-------|
| 🎯 **Framework** | [Next.js 14/15](https://nextjs.org/) (App Router) |
| 🎨 **Styling** | [Tailwind CSS](https://tailwindcss.com/) |
| 🧩 **UI Components** | [Shadcn/UI](https://ui.shadcn.com/) & Lucide Icons |
| 📦 **State Management** | React Context API / TanStack Query |
| 🔐 **Authentication** | [Better Auth](https://better-auth.com/) |
| 💰 **Payment** | SSLCommerz / Stripe Integration |
| 🚀 **Deployment** | Vercel |

---

## 📦 Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/sakibhossain22/Cinemay-Frontend.git](https://github.com/sakibhossain22/Cinemay-Frontend.git)

NEXT_PUBLIC_FRONTEND_URL=http://localhost:3000

FRONTEND_URL=http://localhost:3000
BACKEND_URL=http://localhost:5000

NEXT_PUBLIC_AUTH_URL=http://localhost:5000/api/auth

BETTER_AUTH_URL=http://localhost:5000 # Base URL of your app

AUTH_URL=http://localhost:5000/api/auth

API_URL=http://localhost:5000/api

NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=****************************************


STRIPE_SECRET_KEY=***************************


STRIPE_WEBHOOK_SECRET=**************************************************

NEXT_PUBLIC_BASE_URL=http://localhost:3000

npm run dev