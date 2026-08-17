# Cent Graphics

A fullstack color palette web app for designers. Browse curated palettes, copy hex codes instantly, and save your favorites to a personal collection.

**Live Demo:** [cent-graphics.vercel.app](https://cent-graphics.vercel.app)

---

## Features

- Browse 6 color editions with 18 curated palettes
- Copy hex codes with one click
- Save palettes to your personal collection
- Register and login with JWT authentication
- Responsive page adaptation

---

## Tech Stack

**Frontend**

- React + Vite
- React Router
- CSS (per component)

**Backend**

- Node.js + Express
- MongoDB Atlas + Mongoose
- JWT + bcrypt

**Deploy**

- Frontend → Vercel
- Backend → Railway

---

## Project Structure

```
cent-graphics/
├── client/          # React frontend
│   └── src/
│       ├── api/     # Centralized API calls
│       ├── components/
│       │   ├── auth/
│       │   ├── collection/
│       │   ├── data/
│       │   ├── home/
│       │   └── navbar/
│       └── App.jsx
│
└── server/          # Express backend
    ├── controllers/
    ├── middlewares/
    ├── models/
    ├── routes/
    └── app.js
```

---

## API Endpoints

| Method | Endpoint               | Auth | Description            |
| ------ | ---------------------- | ---- | ---------------------- |
| POST   | /api/auth/register     | No   | Register new user      |
| POST   | /api/auth/login        | No   | Login, returns JWT     |
| GET    | /api/palettes          | No   | Get all palettes       |
| POST   | /api/palettes          | Yes  | Submit new palette     |
| POST   | /api/palettes/:id/save | Yes  | Save to collection     |
| DELETE | /api/palettes/:id/save | Yes  | Remove from collection |

---

## Run Locally

**Backend**

```bash
cd server
npm install
# create .env with MONGO_URI and JWT_SECRET
npm run dev
```

**Frontend**

```bash
cd client
npm install
npm run dev
```

---

## Built By

Vincent — Former design editor turned fullstack developer.
