# Altın Kebap Evi — Restaurant Ordering System

A responsive restaurant ordering application developed with **React, Vite, React Router, Tailwind CSS, and LocalStorage**.

The project includes both a customer-facing restaurant interface and an admin dashboard. Customers can browse the menu, add products to a cart, place orders, and track order status. Administrators can manage menu items with CRUD operations and manage incoming orders.

## Features

### Customer Side

- Restaurant landing page
- Featured menu items
- Full menu browsing
- Food images, descriptions, prices, categories, preparation time, calories, and availability
- Category filtering
- Search functionality
- Add products to cart
- Increase/decrease item quantity
- Remove items from cart
- Persistent cart using LocalStorage
- Place an order
- Order status page
- Responsive design for desktop, tablet, and mobile

### Admin Side

- Demo admin login
- Protected admin routes
- Admin dashboard
- Menu management
- Create menu item
- Read/list menu items
- Update menu item
- Delete menu item
- Toggle product availability
- Order management
- Update order status
- LocalStorage-based persistence

## CRUD Operations

The required CRUD operations are implemented in the **Admin Menu Management** section.

| Operation | Description |
| --- | --- |
| Create | Add a new menu item |
| Read | List and display menu items |
| Update | Edit an existing menu item |
| Delete | Remove a menu item |

Menu CRUD logic is separated into a service layer and persisted in LocalStorage.

## Technologies

- React 19
- Vite
- React Router DOM
- Tailwind CSS
- JavaScript
- LocalStorage
- PostCSS
- Autoprefixer
- Oxlint

## Project Structure

```text
src/
├── assets/
├── components/
│   ├── admin/
│   ├── common/
│   └── customer/
├── data/
├── hooks/
├── layouts/
├── pages/
│   ├── admin/
│   └── customer/
├── services/
├── utils/
├── App.jsx
├── index.css
└── main.jsx
```

The project separates pages, reusable components, layouts, hooks, services, seed data, and utility functions to keep the application organized and maintainable.

## Routes

### Customer Routes

| Route | Description |
| --- | --- |
| `/` | Restaurant home page |
| `/menu` | Full menu |
| `/cart` | Shopping cart |
| `/order/:id` | Order status page |

### Admin Routes

| Route | Description |
| --- | --- |
| `/admin/login` | Demo administrator login |
| `/admin` | Admin dashboard |
| `/admin/menu` | Menu CRUD management |
| `/admin/orders` | Order management |

## Demo Admin Login

This project uses simulated frontend authentication for demonstration purposes.

```text
Username: admin
Password: admin123
```

> This is not production authentication. The credentials and session are intentionally frontend-only because this is a frontend course project without a backend.

## Data Persistence

The application uses the browser's **LocalStorage** for:

- Menu items
- Cart data
- Orders
- Demo admin session

On the first visit, sample restaurant menu data is initialized automatically. Changes made from the admin panel remain available after refreshing the page in the same browser.

## Installation

Clone the repository:

```bash
git clone https://github.com/bugraberatkok/SoftwarePersona_Frontend_Gelistirme_Projesi.git
cd SoftwarePersona_Frontend_Gelistirme_Projesi
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Vite will display the local development address in the terminal, typically:

```text
http://localhost:5173
```

## Production Build

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

The build output is generated in the `dist/` directory.

## Deployment

This project can be deployed using **Vercel**, **Netlify**, or another static frontend hosting service.

### Vercel

Recommended settings:

```text
Framework Preset: Vite
Build Command: npm run build
Output Directory: dist
```

### Netlify

Recommended settings:

```text
Build Command: npm run build
Publish Directory: dist
```

Because the application uses React Router, the hosting platform should be configured to support SPA routing so direct navigation to routes such as `/menu` or `/admin` does not return a 404 page.

## Screenshots

At least one project screenshot is included in the course submission materials.

## Notes

- The project does not require a backend or external database.
- Menu, order, cart, and admin session data are stored in LocalStorage.
- Food images are loaded from external image sources used in the demo data.
- The restaurant and admin authentication are fictional/demo implementations created for the course project.

## Repository

GitHub: https://github.com/bugraberatkok/SoftwarePersona_Frontend_Gelistirme_Projesi

## Live Demo

Vercel: **To be added after deployment**

## Author

**Buğra Berat Kök**
