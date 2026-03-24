## Made By - Sayan Kundu

**Full Stack Developer | Hands On Experience in EdTech & Fintech | Passionate about building real-world solutions**

---

## 🔗 Links
[![Resume](https://img.shields.io/badge/View_Resume-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://drive.google.com/file/d/1c0JPOQJcRBYOldQvooPfd4gQQ0kkJgbq/view?usp=drive_link)
[![LinkedIn](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/sayan-kundu-70b5442b6/)
[![Github](https://img.shields.io/badge/github-1DA1F2?style=for-the-badge&logo=github&logoColor=white)](https://github.com/sayank22)
[![Portfolio](https://img.shields.io/badge/Portfolio-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)](https://sayan-kundu-portfolio.netlify.app)
---


# AI Prompt Flow App

A full-stack, interactive node-based application that allows users to visually connect text prompts to AI-generated responses in real-time. Built with the MERN stack and React Flow, it seamlessly integrates with OpenRouter's AI models and securely saves interaction histories to a cloud database.

## 🌟 Features

- **Interactive Visual Canvas:** Drag, drop, and connect input nodes to output nodes using a smooth, animated UI powered by React Flow.
- **Persistent Cloud Storage:** Saves successful prompt-and-response pairs to a MongoDB Atlas database with a single click.
- **Professional UI/UX:** Features modern hover effects, secure form validation, and sleek pop-up notifications using React Toastify.

---

**Frontend:**
* React (via Vite)
* React Flow (`@xyflow/react`) for node visualization
* Axios for API requests
* React Toastify for notifications
* Deployed on Vercel

**Backend:**
* Node.js & Express.js
* Mongoose (MongoDB Object Modeling)
* `dotenv` for secure environment variables
* Deployed on Render

**Database & External APIs:**
* MongoDB Atlas (Cloud Database)
* OpenRouter API (AI Model Integration)

---

## 🌐 Live Links

* **Frontend App:** [prompt-flow-ai-sayan-kundu.vercel.app](https://prompt-flow-ai-sayan-kundu.vercel.app)
* **Backend API:** [prompt-flow-ai.onrender.com](https://prompt-flow-ai.onrender.com)
* **Video Walkthrough:** [Watch the Demo on Loom](https://www.loom.com/share/e3c92856a203430f8959cc08f95ac3d1)

---


## Getting Started (Run Locally)

# 1. Clone the repo
   ```bash
   git clone [https://github.com/sayank22/prompt-flow-ai](https://github.com/sayank22/prompt-flow-ai)
cd prompt-flow-ai
   ```

# 2. Backend Setup
   ```bash
  cd server
npm install

   ```
**Create a .env file in /Server:**
```ini
MONGO_URI=your_mongodb_connection_string
OPENROUTER_API_KEY=your_openrouter_key (For AI connection)
CLIENT_URL=http://localhost:5173 (Or your frontend deployed link)

```
**Run the server:**
```bash

node server.js

```

# 3. Frontend Setup
   ```bash
  cd client
npm install

   ```
**Create a .env file in /client:**
```ini
VITE_API_URL=http://localhost:5000 (Or your backend deployed link)

```
**Run the server:**
```bash

npm run dev

```
