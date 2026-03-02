# Buildnza

A modern, high-performance web application built with Next.js 14, Tailwind CSS, Framer Motion, and NextAuth.

## Getting Started

1. **Clone the repository:**
   `git clone <repository-url>`
   `cd buildnza`

2. **Install dependencies:**
   `npm install`

3. **Set up Environment Variables:**
   - Copy the `.env.example` file to create a new `.env` file:
     `cp .env.example .env`
   - Open `.env` and configure your environment variables:
     - `DATABASE_URL`: Add your MongoDB connection string (e.g., from MongoDB Atlas).
     - `NEXTAUTH_SECRET`: Generate a secure random string (you can use `openssl rand -base64 32`).
     - *Optional:* Add `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` for Google login.

4. **Initialize the Database:**
   - Push the Prisma schema to your MongoDB database to create the required collections:
     `npx prisma db push`
   *(Note: This resolves the `P1012 error: Environment variable not found: DATABASE_URL` by ensuring Prisma can read your `.env` connection string.)*

5. **Start the Development Server:**
   `npm run build && npm run start`

6. **Open the Application:**
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Features
- Glassmorphism design and custom cursor tracking.
- NextAuth authentication (Email and Google).
- Protected API and frontend routes.
- MongoDB integration with Prisma.
