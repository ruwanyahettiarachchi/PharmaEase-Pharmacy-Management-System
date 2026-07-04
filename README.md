# PharmaEase — Pharmacy Management System

PharmaEase is a full-stack **MERN** (MongoDB, Express, React, Node.js) web application for managing the day-to-day operations of a pharmacy — medicines, suppliers, and customer invoices — from a single dashboard.

## ✨ Features

- **Medicine management** — add, edit, delete, and browse the medicine catalog (name, description, price, stock level, and supplier)
- **Supplier management** — maintain a directory of suppliers with contact details
- **Invoice management** — create customer invoices, add multiple medicines per invoice with quantity and price, and automatically compute totals
- **Reports** — dedicated report views for medicines, suppliers, and invoices, with **PDF export** support (via `jspdf` + `html2canvas`)
- **Dashboard** — at-a-glance counts of medicines, suppliers, and invoices
- Simple, responsive React UI with client-side routing

## 🛠 Tech Stack

**Frontend**
- React 18
- React Router DOM
- Axios (API calls)
- React Icons
- jsPDF + html2canvas (exporting reports as PDF)

**Backend**
- Node.js + Express
- MongoDB with Mongoose ODM
- CORS
- Nodemon (development)

## 📂 Project Structure

```
PharmaEase-Pharmacy-Management-System/
├── backend/
│   ├── index.js                 # Express app entry point & MongoDB connection
│   ├── models/
│   │   ├── medicineModel.js     # Medicine schema (name, description, price, stock, supplier)
│   │   ├── supplierModel.js     # Supplier schema (name, email, contact info)
│   │   └── invoiceModel.js      # Invoice schema (customer, line items, total)
│   └── routes/
│       ├── medicineRoutes.js    # CRUD endpoints for medicines
│       ├── supplierRoutes.js    # CRUD endpoints for suppliers
│       ├── invoiceRoutes.js     # CRUD endpoints for invoices
│       └── dashboardRoutes.js   # Aggregate counts for the dashboard
└── frontend/
    └── src/
        ├── components/
        │   ├── MedicineComponent/    # List, add, edit medicines
        │   ├── SupplierComponent/    # List, add, edit suppliers
        │   ├── InvoiceComponent/     # List, create, edit invoices
        │   ├── DashBoardComponent/   # Dashboard overview
        │   ├── ReportsComponent/     # Medicine / supplier / invoice reports (PDF export)
        │   └── NavigationComponent/  # Navigation bar
        └── App.js                   # Route definitions
```

## 🔌 API Overview

All endpoints are served from the Express backend (default port `8060`).

| Resource | Endpoints |
|---|---|
| Medicines | `GET /medicine`, `GET /medicine/:id`, `POST /create_medicine`, `PUT /update_medicine`, `DELETE /delete_medicine/:id`, `GET /count_medicine` |
| Suppliers | `GET /supplier`, `GET /supplier/:id`, `POST /create_supplier`, `PUT /update_supplier`, `DELETE /delete_supplier/:id`, `GET /count_supplier` |
| Invoices | `GET /invoice`, `GET /invoice/:id`, `POST /create_invoice`, `PUT /update_invoice`, `DELETE /delete_invoice/:id`, `GET /count_invoice` |

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v16+
- A MongoDB database (local instance or a hosted [MongoDB Atlas](https://www.mongodb.com/atlas) cluster)

### 1. Clone the repository

```bash
git clone https://github.com/ruwanyahettiarachchi/PharmaEase-Pharmacy-Management-System.git
cd PharmaEase-Pharmacy-Management-System
```

### 2. Backend setup

```bash
cd backend
npm install
```

Set your MongoDB connection string as an environment variable (do **not** hard-code credentials in source):

```bash
# create a .env file or export directly
export MONGO_URI="your-mongodb-connection-string"
export PORT=8060
```

> ⚠️ **Note:** The current `index.js` connects to MongoDB using an inline connection string. Before deploying or sharing this project publicly, replace it with an environment variable (e.g. `process.env.MONGO_URI`) to keep database credentials out of version control.

Run the backend:

```bash
npm run dev
```

The API will start on `http://localhost:8060`.

### 3. Frontend setup

```bash
cd ../frontend
npm install
npm start
```

The React app will start on `http://localhost:3000` and communicate with the backend API.

## 📄 License

This project is available for personal and educational use. Feel free to fork and adapt it for your own learning purposes.
