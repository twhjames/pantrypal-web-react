# PantryPal Web

**PantryPal Web** is a mobile-responsive web application built with React, TypeScript, and Vite. It connects to the [PantryPal Backend](https://github.com/twhjames/pantrypal-backend) to serve as a smart pantry assistant — helping users manage groceries, predict expiry dates, scan receipts, chat about recipes, and receive personalized meal suggestions.

---

## 📚 Table of Contents

-   [🛠️ Tech Stack](#️-tech-stack)
-   [📱 Features](#-features)
-   [🛰 Backend API](#-backend-api)
-   [🌐 Documentation](#-documentation)
-   [🚀 Getting Started](#-getting-started)
-   [📂 Project Structure](#-project-structure)
-   [⚙️ Environment Variables](#️-environment-variables)
-   [📦 Build for Production](#-build-for-production)
-   [📄 License](#-license)
-   [👥 Contributors](#-contributors)
-   [📬 Feedback / Issues](#-feedback--issues)

---

## 🛠️ Tech Stack

-   **React** – UI framework
-   **TypeScript** – Type-safe JavaScript
-   **Vite** – Fast development build tool
-   **Tailwind CSS** – Utility-first CSS framework
-   **shadcn/ui** – Accessible UI components built on Radix UI

---

## 📱 Features

-   Mobile-responsive interface
-   Pantry inventory management
-   Recipe suggestions based on expiry and availability
-   Chat assistant (integrated with backend)
-   Account management with JWT authentication
-   Receipt scanning via the backend pipeline
-   Clean, accessible UI with shadcn/ui components

---

## 🛰 Backend API

This web app communicates with the [PantryPal Backend](https://github.com/twhjames/pantrypal-backend),
which exposes RESTful endpoints for pantry management, account services, recipe
recommendations, receipt processing, and a conversational chatbot powered by
LLaMA via the Groq API. Refer to the backend repository for a detailed
architecture overview and API documentation.

---

## 🌐 Documentation

Read the full **User Guide** and **Developer Guide** on our [GitHub Pages site](https://twhjames.github.io/pantrypal-web-app/).

---

## 🚀 Getting Started

### Prerequisites

-   Node.js (v18+)
-   npm

### Installation

```bash
# Clone the repository
git clone https://github.com/twhjames/pantrypal-web-react.git
cd pantrypal-web-react

# Install dependencies
npm install
```

### Run the Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## 📂 Project Structure

```
src/
├── components/         # Reusable UI components
├── pages/              # Page-level components
├── routes/             # React Router setup
├── lib/                # Utility and helper functions
├── services/           # API calls to PantryPal backend
├── assets/             # Images and static assets
└── main.tsx            # App entry point
```

---

## ⚙️ Environment Variables

Create a `.env` file in the root:

```bash
PANTRYPAL_API_BASE_URL=http://localhost:8000
```

---

## 📦 Build for Production

```bash
npm run build
```

---

## 📄 License

This project is licensed under the **Apache 2.0 License**.

---

## 👥 Contributors

-   [James Teo — Full Stack Software Engineer](https://www.linkedin.com/in/twhjames/)
-   [Le Rui — Data Scientist](https://www.linkedin.com/in/le-rui-tay-7b6507272/)

---

## 📬 Feedback / Issues

Please submit issues via GitHub Issues: https://github.com/twhjames/pantrypal-web-react/issues
