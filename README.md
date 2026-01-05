# 🚀 Techisense AI  
### Intelligent Issue Triage & Duplicate Detection Platform for Engineering Teams

Techisense AI is a smart developer productivity tool that transforms messy, unstructured bug reports into clean, Jira-style tickets and prevents duplicate issue bloat using AI-powered semantic search.

> Built for fast-moving engineering teams where clarity, speed, and learning from past fixes matter.

---

## 🧠 Problem Statement

In real-world development teams:
- Bug reports arrive as vague Slack messages or incomplete notes
- Duplicate issues waste time and fragment discussions
- Engineers repeatedly solve the same problems
- Important bugs are misclassified or ignored

**Techisense AI solves this by acting as an Intelligent Project Manager.**

---

## ✨ Key Features

### 1️⃣ Natural Language → Structured Ticket
Paste any messy issue description, and Techisense AI automatically generates:
- **Title**
- **Description**
- **Steps to Reproduce**
- **Environment**
- **Severity (Critical / Major / Minor)**

---

### 2️⃣ Duplicate Issue Detection (Vector Search)
Before creating a new ticket, the system:
- Converts the issue into an embedding
- Searches past **resolved tickets** using MongoDB Atlas Vector Search
- Warns if a similar issue already exists
- Displays the **previous solution**, if available

> This prevents “duplicate ticket bloat” and saves engineering hours.

---

### 3️⃣ AI-Powered Severity Classification
Based on impact keywords and symptoms, the AI flags issues as:
- 🔴 Critical
- 🟠 Major
- 🟢 Minor

---

### 4️⃣ (Optional / Planned)
- 🔍 Root cause hypothesis (possible code areas to inspect)
- 🧩 Auto team assignment (Frontend / Backend / DevOps)
- 📊 Analytics on recurring issues

---

## 🏗️ Tech Stack (MERN)

### Frontend
- **React.js**
- Tailwind CSS (UI)
- Axios

### Backend
- **Node.js**
- **Express.js**
- REST APIs

### Database
- **MongoDB Atlas**
- Vector Search (for semantic similarity)

### AI / LLM
- OpenRouter / LLM provider
- Embeddings for similarity search
- Prompt-engineered issue structuring

---

## 🔁 High-Level Workflow

1. Developer pastes a raw issue (e.g., Slack message)
2. AI structures it into a professional ticket schema
3. Ticket embedding is generated
4. MongoDB Vector Search checks for similar resolved issues
5. UI warns about duplicates or allows ticket creation
6. Unique issues are saved to the system

---

## 📦 Project Status

🛠️ **MVP – Under Active Development**

Current focus:
- Core issue structuring
- Vector-based duplicate detection
- Clean API-first architecture

---

## 🧪 Example Input

```text
Login button keeps spinning on Firefox but works fine on Chrome.
Probably something with API timeout or CORS.
