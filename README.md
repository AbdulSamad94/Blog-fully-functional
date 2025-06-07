
# Blog Project

A fully functional blog built with **Next.js 15**, **Tailwind CSS**, **Mongoose**, and **NextAuth.js**. Users can create, edit, and view posts with images and categories.

## Features
- **Create & Edit Blog Posts**: Users can create and edit blog posts with titles, descriptions, images, and categories.
- **Authentication**: Secure user authentication with password hashing.
- **Image Upload**: Ability to upload and preview images for blog posts.
- **Categories**: Posts can be categorized into various predefined categories.
- **Responsive Design**: Optimized for mobile and desktop devices with a clean and modern UI built with Tailwind CSS.
- **Error Handling**: Graceful error handling with custom error pages and retry functionality.
- **Next.js 15 App Router**: Efficient routing using the App Router in Next.js for optimal performance and SEO.

## Tech Stack
- **Next.js 15** (App Router)
- **React & React** Context for state management
- **MongoDB** (via Mongoose)
- **Tailwind CSS** for utility-first styling
- **NextAuth.js** for authentication
- **React Toastify** for notifications
- **Vercel** for deployment (optional)

## Setup

### 1. Clone the repo:
```bash
git clone https://github.com/AbdulSamad94/Blog-fully-functional.git
cd Blog-fully-functional
```
### 2. Install Dependencies:
```bash
npm install
```
### 3. Set up environment variables:
Create a .env.local file with:

```bash
NEXT_PUBLIC_MONGO_URI=your-mongo-uri
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key
```
4. Run the development server:

```bash
npm run dev
Access the app at http://localhost:3000.
```
License
All rights reserverd

