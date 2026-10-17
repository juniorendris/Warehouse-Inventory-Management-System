# Warehouse Inventory Management System

A full-stack Warehouse Inventory Management System built with **Node.js**, **Express.js**, **MySQL**, **HTML**, **CSS**, and **JavaScript**.

This application allows users to manage warehouse products through a simple web interface and perform CRUD operations using a MySQL database.

---
## Live Demo

https://your-live-site-link.com
## Features

### Product Management

* Add new products
* View all products
* Update product stock quantity
* Delete products
* Search products by category

### Inventory Monitoring

* Low stock alerts
* Expiration alerts (products expiring within 3 months)

### User Interface

* Responsive design
* Dark mode support
* Dashboard view
* Product table display

---

## Technologies Used

### Backend

* Node.js
* Express.js
* MySQL2

### Frontend

* HTML5
* CSS3
* Vanilla JavaScript

### Database

* MySQL

---

## Project Structure

```text
Warehouse-Inventory-Management-System/
│
├── database/
│   ├── createTable.js
│   └── pool.js
│
├── project/
│   ├── index.html
│   └── style.css
│
├── project_js/
│   └── index.js
│
├── server.js
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

## Database Setup

This project uses MySQL.

### Step 1: Create a Database

Open phpMyAdmin or MySQL and create a database:

```sql
CREATE DATABASE warehouse_inventory;
```

### Step 2: Configure Database Connection

Open `pool.js` and update:

```javascript
const pool = mysql.createPool({
  host: "localhost",
  user: "your_username",
  password: "your_password",
  database: "warehouse_inventory"
});
```

Use your own MySQL username and password.

### Step 3: Create Table

Start the server.

The application automatically calls:

```javascript
createTable();
```
## API Endpoints

### Insert Product

```http
POST /insert-product
```

### View Products

```http
GET /products
```

### Update Product Quantity

```http
PATCH /update-product/:sku
```

### Delete Product

```http
DELETE /delete-product/:delsku
```

### Search Product By Category

```http
GET /search-product/:category
```

### Low Stock Alert

```http
GET /low-stock
```

### Expiring Products Alert

```http
GET /expiring-soon
```

---

## Notes

* This project is intended for local development.
* MySQL server must be running before starting the application.
* WAMP, XAMPP, or a standalone MySQL installation can be used.
* Ensure the database credentials in `pool.js or clreate js` match your local setup.

---

DEV
Junior Endris
