# 🛍️ Global Shop - E-Commerce Frontend

A modern, full-featured e-commerce platform built with Next.js 16, TypeScript, and Tailwind CSS. This project provides a seamless shopping experience with multi-language support, advanced cart management, and responsive design.

## 🌐 Live Demo

- **Frontend**: [https://full-ecomerce-gamma.vercel.app](https://full-ecomerce-gamma.vercel.app)
- **Backend API**: [https://backend-for-global-shop-production-a385.up.railway.app](https://backend-for-global-shop-production-a385.up.railway.app)

## ✨ Features

### 🛒 Shopping Experience
- **Product Catalog**: Browse products by categories, brands, and filters
- **Advanced Search**: Real-time product search with filters
- **Product Details**: Detailed product pages with images, descriptions, and reviews
- **Shopping Cart**: Add, update, and remove items with real-time price calculations
- **Wishlist**: Save favorite products for later
- **Product Reviews**: Rate and review products
- **Promo Codes**: Apply discount codes at checkout

### 👤 User Management
- **Authentication**: Secure login and registration system
- **User Profile**: Manage personal information and preferences
- **Order History**: Track current and past orders
- **Address Management**: Save multiple shipping addresses

### 🎨 UI/UX Features
- **Responsive Design**: Optimized for mobile, tablet, and desktop
- **Dark/Light Mode**: Theme switching with persistent preferences
- **Multi-language Support**: Arabic and English (i18n)
- **Smooth Animations**: Framer Motion animations
- **Loading States**: Skeleton loaders for better UX
- **Toast Notifications**: Real-time feedback for user actions

### 🔐 Admin Panel
- **Dashboard**: Overview of sales, orders, and analytics
- **Product Management**: CRUD operations for products
- **Category Management**: Organize products into categories
- **Brand Management**: Manage product brands
- **Order Management**: Process and track orders
- **User Management**: Manage customer accounts
- **Promo Code Management**: Create and manage discount codes
- **Customer Testimonials**: Manage customer reviews and feedback

### ⚡ Performance & SEO
- **Server-Side Rendering (SSR)**: Fast initial page loads
- **Static Site Generation (SSG)**: Pre-rendered pages for better performance
- **Image Optimization**: Next.js Image component with AVIF/WebP support
- **Code Splitting**: Automatic code splitting for faster loads
- **SEO Optimized**: Meta tags, sitemap, robots.txt
- **Google Analytics**: Integrated analytics tracking
- **Lighthouse Score**: Optimized for performance, accessibility, and SEO

## 🛠️ Tech Stack

### Core
- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **UI Components**: Custom components with Headless UI patterns

### State Management
- **Redux Toolkit**: Global state management
- **Zustand**: Lightweight state management
- **React Context**: Theme, language, and auth contexts

### Forms & Validation
- **React Hook Form**: Form handling
- **Zod**: Schema validation
- **zxcvbn**: Password strength validation

### UI Libraries
- **Framer Motion**: Animations and transitions
- **React Icons**: Icon library
- **Lucide React**: Modern icon set
- **Heroicons**: Beautiful hand-crafted SVG icons
- **Swiper**: Touch slider component
- **React Hot Toast**: Toast notifications
- **React Loading Skeleton**: Loading placeholders

### Internationalization
- **i18next**: Internationalization framework
- **react-i18next**: React bindings for i18next
- **i18next-browser-languagedetector**: Language detection

### HTTP Client
- **Axios**: Promise-based HTTP client

### Development Tools
- **ESLint**: Code linting
- **PostCSS**: CSS processing
- **cssnano**: CSS minification

## 📋 Prerequisites

- **Node.js**: 18.x or higher
- **npm**: 9.x or higher
- **Git**: For version control

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd Frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables

Create a `.env.local` file in the root directory:


### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for Production

```bash
npm run build
npm start
```

## 📜 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server on port 3000 |
| `npm run build` | Build production-ready application |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint for code quality |
| `npm run analyze` | Analyze bundle size |
| `npm run lighthouse` | Run Lighthouse audit on local |
| `npm run lighthouse:prod` | Run Lighthouse audit on production |
| `npm run seo:check` | Check SEO headers |
| `npm run sitemap:validate` | Validate sitemap.xml |
| `npm run robots:validate` | Validate robots.txt |
| `npm run clean` | Remove .next directory |
| `npm run rebuild` | Clean and rebuild project |



## 🌍 Internationalization

The application supports multiple languages:

- **Arabic (ar)**: Default language
- **English (en)**: Secondary language

Language files are located in `i18n/` directory. The language preference is stored in localStorage and persists across sessions.

## 🎨 Theming

The application supports dark and light themes:

- Theme preference is stored in localStorage
- Automatic theme detection based on system preferences
- Smooth transitions between themes
- Tailwind CSS dark mode classes

## 🔒 Authentication

- JWT-based authentication
- Secure token storage
- Protected routes and pages
- Role-based access control (User/Admin)
- Session persistence

## 📞 Support

For support, email mohammedsamiermouawad@gmail.com 

## 🔗 Links

- **Live Site**: [https://full-ecomerce-gamma.vercel.app](https://full-ecomerce-gamma.vercel.app)
- **API Documentation**: [Backend API](https://backend-for-global-shop-production-a385.up.railway.app)

---

Made with ❤️ by Global Shop Team
