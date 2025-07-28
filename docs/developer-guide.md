---
layout: default
title: "Developer Guide"
---

# Developer Guide

This guide is for contributors who want to modify PantryPal Web.

## Local Setup

1. Install Node.js 18 or higher.
2. Clone the repository and run `npm install` to fetch dependencies.
3. Run `npm run dev` to start the app.

## Project Structure

```
src/
├── components/         # Reusable UI components
├── pages/              # Page-level components
├── routes/             # React Router setup
├── services/           # API calls to PantryPal backend
└── main.tsx            # App entry point
```

## Linting and Formatting

We use **ESLint** and **Prettier** to keep the codebase tidy. Run:

```bash
npm run lint
```

(You may need to install dependencies with internet access.)

## Backend Integration

The frontend relies on the [PantryPal Backend](https://github.com/twhjames/pantrypal-backend). See the backend repository for API docs and environment variables.
