# HireMind AI

> From Resume to Offer Letter — Guided by AI.

HireMind AI is an AI-powered career assistant platform that helps students analyze resumes, identify missing skills, improve ATS performance, and prepare for interviews using Gemini AI.

---

## 🚀 Live Demo

🔗 Deployed on Vercel (https://hiremind-ec221h1mz-saikushal06s-projects.vercel.app/)

---

## 📌 Features

* 📄 Upload Resume PDF
* 🤖 AI Resume Analysis using Gemini API
* 📊 ATS-style Resume Score Dashboard
* 🧠 Missing Skills Detection
* 💡 Personalized AI Suggestions
* 🎯 Interview Preparation Guidance
* 🌙 Premium Responsive Dark UI
* ☁️ Deployed with Vercel
* 🔐 Secure Environment Variables using `.env`

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Vite
* Tailwind CSS

### AI Integration

* Google Gemini API
* Gemini 2.5 Flash

### PDF Processing

* pdfjs-dist

### Deployment

* Vercel
* GitHub

---

## 📷 Screenshots

### Landing Page

Modern AI-powered landing page with responsive UI.

### AI Career Dashboard

Displays resume score, missing skills, and AI suggestions.

### Resume Analyzer

Upload resume PDFs and receive AI-powered analysis.

---

## ⚙️ Installation

### 1️⃣ Clone Repository

```bash
git clone https://github.com/saikushal06/hiremind-ai.git
cd hiremind-ai
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Create `.env` File

```env
VITE_GEMINI_API_KEY=your_api_key_here
```

### 4️⃣ Run Project

```bash
npm run dev
```

---

## 🧠 How It Works

1. User uploads resume PDF.
2. PDF text is extracted using `pdfjs-dist`.
3. Resume content is sent to Gemini AI.
4. AI analyzes:

   * strengths
   * missing skills
   * ATS improvements
   * interview preparation guidance
5. Results are displayed in the dashboard.

---

## ⚠️ Challenges Faced

* Gemini model version compatibility issues
* API quota and rate limit handling
* PDF extraction debugging
* Responsive mobile UI adjustments
* Vercel environment variable setup
* Error handling for failed AI requests

---

## ✅ Solutions Implemented

* Migrated to Gemini 2.5 Flash
* Added proper `try/catch/finally` handling
* Added quota exhaustion fallback messages
* Secured API keys using `.env`
* Improved responsive UI design
* Added loading states and error feedback

---

## 📈 Future Improvements

* Authentication System
* Resume History Storage
* AI Mock Interviews
* Job Recommendation Engine
* Skill Roadmaps
* Voice-based Interview Practice
* Multi-role Resume Optimization

---

## 👨‍💻 Author

### Sai Kushal Ranga

* GitHub: [https://github.com/saikushal06](https://github.com/saikushal06)
* LinkedIn: Sai Kushal Ranga

---

## 📜 License

This project is built for learning, hackathons, and portfolio purposes.
