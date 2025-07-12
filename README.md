 # TheCodeEdge

**TheCodeEdge** is a platform built for competitive programmers to write, share, and explore contest editorials in a structured and community-driven way. It aims to centralize the editorial-writing process and promote knowledge sharing within the CP community.

> “Compete, solve, share – level up together.”

---

## 🚀 Live Demo

🌐 [the-code-edge.vercel.app](https://the-code-edge.vercel.app)   
---

## 🧩 Problem it Solves

- Editorials are often scattered across social media or blogs with inconsistent structure.
- No centralized place exists where individuals can write and organize their contest solutions in an accessible way.
- Hard for beginners to discover well-explained solutions for past contests.

---

## 🎯 Key Features

- 📝 **Write Editorials** – Choose a contest platform and contest, add problem-wise approaches, optional code, and notes.
- 🧭 **Explore Editorials** – Browse latest/popular editorials with filters by platform, difficulty, and keywords.
- 👤 **User Profiles** – Showcase your editorial contributions and earn **AlgoPoints** to unlock badges.
- 📊 **Featured Editorial** – Based on popularity (likes/comments), highlighted on the landing page.
- 💾 **Save as Draft** – Start writing and continue later.
- 🔐 **Authentication & Dashboard** – Secure access with Clerk, your editorials in one dashboard.

---

## 🛠️ Tech Stack

| Layer         | Technology                        |
|--------------|------------------------------------|
| **Frontend**  | Next.js 14 (App Router), TypeScript, Tailwind CSS |
| **Backend**   | API routes, MongoDB with Mongoose |
| **Auth**      | Clerk                              |
| **Editor**    | Custom code editor integration     |
| **Dev Tools** | GitHub, Postman, Vercel            |

---

## 🧱 MongoDB Schema Overview

### `Editorial`
```ts
interface Editorial {
  _id: ObjectId;
  title: string;
  author: ObjectId;
  contestPlatform: string;
  contestName: string;
  languageUsed: string;
  overallDifficulty: string;
  problems: {
    problemName: string;
    approach: string;
    code?: string;
    problemUrl?: string;
  }[];
  likes: number;
  comments: Comment[];
  createdAt: Date;
  updatedAt: Date;
}
