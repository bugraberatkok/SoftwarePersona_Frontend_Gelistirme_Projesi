# Altın Kebap Evi - Restaurant Ordering System

A responsive restaurant ordering application developed with React, Vite, React Router, Tailwind CSS and LocalStorage.

The project contains both a customer-facing restaurant interface and an admin dashboard.

## Features

### Customer Side

- Restaurant landing page
- Menu browsing
- Food images, descriptions and prices
- Category filtering
- Shopping cart
- Quantity management
- Order creation
- Order status page
- Responsive design
- LocalStorage persistence

### Admin Side

- Demo admin login
- Admin dashboard
- Menu management
- Create menu item
- List menu items
- Update menu item
- Delete menu item
- Toggle menu availability
- Order management

## CRUD Operations

The required CRUD operations are implemented in the Admin Menu Management section.

| Operation | Description |
|---|---|
| Create | Add a new menu item |
| Read | List menu items |
| Update | Edit an existing menu item |
| Delete | Remove a menu item |

## Technologies

- React
- Vite
- React Router DOM
- Tailwind CSS
- JavaScript
- LocalStorage
- PostCSS
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
