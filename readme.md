# 📦 Products RESTful API

This is a full-featured RESTful API built with **Express.js** that manages a collection of products. It supports CRUD operations, filtering, searching, sorting, pagination, statistics, and API key-based authentication. This project is part of the MERN stack learning series.

---

## 🚀 Features

- ✅ **CRUD**: Create, Read, Update, Delete products
- 🔐 **API Key Authentication**
- 🔎 **Search**: Filter by name, category, and price range
- 📊 **Statistics**: Average, min, max, and count of products
- 🧮 **Sorting & Pagination**
- ⚠️ **Global Error Handling**
- ❌ **404 Route Handling**

---

## 🛠️ Technologies

- Node.js
- Express.js
- MongoDB (Mongoose)
- Postman (for testing)
- dotenv
- morgan (for logging)

---

## 📁 Project Structure

project/
│
├── models/
│ └── Product.js # Mongoose schema for Product
│
├── controllers/
│ └── productController.js # Business logic for product routes
│
├── routes/
│ └── productRoutes.js # API route definitions
│
├── middleware/
│ ├── auth.js # API key authentication middleware
│ ├── errorHandler.js # Global error handling
│ └── notFound.js # 404 middleware
│
├── app.js # Express app setup
├── server.js # Entry point (optional if using app.js)
├── .env # Environment variables
├── package.json
└── README.md


---

## ⚙️ Setup Instructions

1. **Clone the repo**
   ```bash
   git clone https://github.com/yourusername/products-api.git
   cd products-api

2. **Install dependencies**
npm install

3. **Set up environment variables**
Create a .env file in the root directory:
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/productsDB
API_KEY=supersecretkey123
PORT=3000

4. **Run the server**
npm run dev

## 🧪 Testing the API (via Postman)

Use the API Key in the header:
x-api-key: supersecretkey123
🟢 Base Route
GET /api/products

## 🔍 Filtering, Sorting, Pagination

GET /api/products?name=laptop&minPrice=1000&sort=price,-name&page=1&limit=5

## 📊 Stats
GET /api/products/stats

## 📄 Single Product
GET /api/products/:id

## ➕ Create Product
POST /api/products
Content-Type: application/json

## ✏️ Update Product
PUT /api/products/:id

## ❌ Delete Product
DELETE /api/products/:id


## Security
Only requests with the correct x-api-key are allowed.
Returns 401 Unauthorized for missing/invalid keys.

## Error Handling 
All errors return structured JSON responses with success: false.

Invalid routes return 404 with helpful messages.

Global error middleware handles unexpected issues gracefully.

## Author
Built by Andiswa Cyria Molangathi as part of the MERN Stack assignment. 

---


