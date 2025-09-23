# ÉcolePay - School Payment & Dashboard System

A comprehensive microservice-based school payment management system built with **Node.js/Express** backend and **React.js** frontend. This application provides seamless integration with payment gateways for managing school transactions, student payments, and administrative dashboards.

## 🔗 Live Applications

- **Frontend**: [https://ecolepay.vercel.app/?page=1](https://ecolepay.vercel.app/?page=1)
- **Backend API**: [https://ecolepay.onrender.com](https://ecolepay.onrender.com)

- 👤akash.kevat@example.com / akash.kevat
- 👤jinn.chegg@example.com / jinn.chegg
 -SMALL CASE

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [System Architecture](#-system-architecture)
- [Installation](#-installation)
- [Environment Configuration](#-environment-configuration)
- [API Documentation](#-api-documentation)
- [Payment Gateway Integration](#-payment-gateway-integration)
- [Database Schema](#-database-schema)
- [Usage Examples](#-usage-examples)
- [Screenshots](#-screenshots)
- [Contributing](#-contributing)

## ✨ Features

### Backend Features
- **JWT-based Authentication** with trustee and student roles
- **Payment Gateway Integration** with Edviron API
- **Webhook Processing** for real-time payment status updates
- **MongoDB Integration** with aggregation pipelines
- **RESTful API** with comprehensive error handling
- **File Upload Support** with Cloudinary integration
- **Security Implementation** with input validation

### Frontend Features
- **Responsive Dashboard** with transaction management
- **Advanced Filtering & Sorting** capabilities
- **Pagination** for large datasets
- **Multi-select Filters** for status and school IDs
- **URL State Persistence** for shareable views
- **Modern UI/UX** with Tailwind CSS

## 🛠 Tech Stack

### Backend
- **Node.js** with **Express.js** framework
- **MongoDB Atlas** for database
- **Mongoose** ODM for data modeling
- **JWT** for authentication
- **Bcrypt** for password hashing
- **Multer & Cloudinary** for file uploads
- **Zod** for input validation
- **CORS** for cross-origin requests

### Frontend
- **React.js 19** with modern hooks
- **Redux Toolkit** for state management
- **React Router DOM** for navigation
- **Axios** for API communication
- **Tailwind CSS** for styling
- **React Toastify** for notifications
- **Vite** for build tooling

### API Testing with Postman
Import the provided Postman collection from `postman_collection.json` for comprehensive API testing.

## 🏗 System Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React Client  │◄──►│  Express API    │◄──►│  MongoDB Atlas  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                              │
                              ▼
                    ┌─────────────────┐
                    │ Payment Gateway │
                    │   (Edviron)     │
                    └─────────────────┘
```

## 🚀 Installation

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- MongoDB Atlas account
- Git

### Backend Setup

```bash
# Clone the repository
git clone <your-repo-url>
cd ecolepay/backend

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env
# Edit .env with your credentials

# Start development server
npm run dev
```

### Frontend Setup

```bash
# Navigate to frontend directory
cd ../frontend

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env
# Edit .env with your API endpoints

# Start development server
npm run dev

```

## ⚙️ Environment Configuration

### Backend (.env)
```env
# Database
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/ecolepay

# JWT Configuration
JWT_SECRET=your-super-secret-key
JWT_EXPIRE=7d

# Payment Gateway (Edviron)
PG_KEY=edvtest01
API_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SCHOOL_ID=65b0e6293e9f76a9694d84b4
PAYMENT_API_URL=https://dev-vanilla.edviron.com/erp

# Cloudinary (for file uploads)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Server Configuration
PORT=5000
NODE_ENV=production
```

### Frontend (.env)
```env
VITE_API_URL=https://ecolepay.onrender.com
VITE_APP_NAME=ÉcolePay
```

## 📱 Screenshots

### Dashboard Overview
![Dashboard](screenshots/dashboard.png)

### Transaction Details
![Transactions](screenshots/transactions.png)

### Payment Flow
![Payment](screenshots/payment-flow.png)

### Mobile Responsive
![Mobile](screenshots/mobile-view.png)


## 📈 Monitoring & Logging

- **Comprehensive Error Logging**
- **Webhook Event Tracking**
- **Payment Transaction Auditing**
- **User Activity Logs**


## 🚀 Deployment

### Backend Deployment (Render)
1. Connect GitHub repository to Render
2. Configure environment variables
3. Set build command: `npm install`
4. Set start command: `npm start`

### Frontend Deployment (Vercel)
1. Connect GitHub repository to Vercel
2. Configure environment variables
3. Set build command: `npm run build`
4. Set output directory: `dist`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support and queries, please reach out to:
- **Email**: support@ecolepay.com
- **Documentation**: [API Docs](https://ecolepay.onrender.com/docs)
- **Issues**: [GitHub Issues](https://github.com/yourusername/ecolepay/issues)

---

**Built with ❤️ for Educational Institutions**
