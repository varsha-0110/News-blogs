## 📰 NewsBlogs App

A modern news and blog platform built with React and Express, powered by the GNews API. Stay updated with the latest headlines, read blogs, check weather, and plan your days with an integrated calendar.

---

### 📌 Features

* 🗕️ Browse top headlines from multiple categories
* 🔎 Search for specific news articles
* 📝 Create and read blog posts
* ☀️ Live weather updates
* 🗕️ Calendar integration
* 🔖 Bookmark articles for later
* ⚙️ Secure backend API with Express.js

---

### 🚀 Live Demo

Frontend: [https://frontend-url.vercel.app](https://your-frontend-url.vercel.app)
Backend: [https://backend-url.onrender.com](https://news-blogs-1.onrender.com)

---

### 🧱 Tech Stack

* **Frontend**: React + Vite
* **Backend**: Node.js + Express
* **API**: [GNews API](https://gnews.io/)
* **Hosting**: Vercel (frontend), Render (backend)

---

### 🛠️ Installation (Local Development)

1. **Clone the repository:**

```bash
git clone https://github.com/varsha-0110/News-blogs.git
cd News-blogs/news-blogs-app
```

2. **Setup Backend:**

```bash
cd backend
npm install
# Create .env file and add your GNews API key
echo GNEWS_API_KEY=your_api_key > .env
node index.js
```

3. **Setup Frontend:**

```bash
cd ..
npm install
npm run dev
```

---

### 🌐 Environment Variables

In `backend/.env`:

```env
GNEWS_API_KEY=your_gnews_api_key
```

---

### 📂 Project Structure

```
news-blogs-app/
│
├── backend/              # Express server
│   ├── index.js
│   └── .env
│
├── src/
|   ├── assets/                  # React frontend
│   ├── components/
│   ├── main.jsx
|   ├── index.css
│   └── App.jsx
│
├── public/
├── package.json
└── vite.config.js
```

---

### 🤩 Future Improvements

* User authentication (login/signup)
* Comment system on blogs
* Admin panel for blog moderation
* Dark mode toggle
* Push notifications

---

### 🤝 Contributing

Feel free to fork the repo and open pull requests. Contributions are welcome!

---

### 📄 License

This project is open-source and available under the MIT License.
