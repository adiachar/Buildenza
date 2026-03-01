# Deploying to Vercel

This application is fully prepared to be deployed on Vercel. Because the application uses authentication and a database, you must configure a few environment variables for the deployment to succeed.

## 1. Prepare Your Database (MongoDB)

Since serverless environments (like Vercel) do not support persistent local files (like SQLite), this app has been configured to use **MongoDB**.

1. Create a free account on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Create a new Cluster.
3. Under "Database Access", create a user with a username and password.
4. Under "Network Access", allow access from anywhere (`0.0.0.0/0`) since Vercel IPs are dynamic.
5. Click "Connect" -> "Connect your application" and copy the **Connection String**.
6. Replace `<password>` in the connection string with the password you just created.

## 2. Deploy to Vercel

1. Push your code to a GitHub, GitLab, or Bitbucket repository.
2. Go to [Vercel](https://vercel.com/) and click "Add New Project".
3. Import your repository.
4. Before clicking "Deploy", expand the **Environment Variables** section.

## 3. Configure Environment Variables

Add the following environment variables to your Vercel project:

| Name | Value | Description |
| :--- | :--- | :--- |
| `DATABASE_URL` | `mongodb+srv://...` | The MongoDB connection string you got from Atlas. |
| `NEXTAUTH_URL` | `https://your-domain.vercel.app` | The URL of your deployed application. |
| `NEXTAUTH_SECRET` | `your-secret-key` | A random string. Generate one using `openssl rand -base64 32` in your terminal. |
| `GOOGLE_CLIENT_ID` | `...` | (Optional) Your Google OAuth Client ID if using Google Login. |
| `GOOGLE_CLIENT_SECRET` | `...` | (Optional) Your Google OAuth Client Secret. |

## 4. Build and Deploy

Vercel will automatically detect that this is a Next.js application.
The build command `next build` will run, and it will automatically execute `prisma generate` during the build process to set up the database client.

Click **Deploy**.

## Troubleshooting

- **500 Errors on Login:** Double-check your `DATABASE_URL` and ensure `NEXTAUTH_SECRET` is set.
- **Prisma Client Errors:** Ensure `npx prisma generate` is not explicitly disabled in your build commands. Next.js + Prisma usually handles this out of the box on Vercel.
