# Buildenza

A modern, high-performance web application built with Next.js 14, Tailwind CSS, Framer Motion, and NextAuth.

## Getting Started

1. **Clone the repository:**
   `git clone <repository-url>`
   `cd buildenza`

2. **Install dependencies:**
   `npm install`

3. **Set up Environment Variables:**
   - Copy the `.env.example` file to create a new `.env` file:
     `cp .env.example .env`
   - Open `.env` and configure your environment variables:
     - `DATABASE_URL`: Add your PostgreSQL connection string.
     - `NEXTAUTH_SECRET`: Generate a secure random string (you can use `openssl rand -base64 32`).
     - *Optional:* Add `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` for Google login.

4. **Initialize the Database:**
   - Run your database migrations or setup scripts using your preferred PostgreSQL tool.

5. **Start the Development Server:**
   `npm run build && npm run start`

6. **Open the Application:**
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Features
- Glassmorphism design and custom cursor tracking.
- NextAuth authentication (Email and Google).
- Protected API and frontend routes.
- PostgreSQL database integration.
