# AI Code Reviewer

A web app that uses AI to review your code and provide feedback on bugs, performance, and best practices.

## Features

- Paste your code and get instant AI feedback
- Supports multiple programming languages
- Clean, modern interface
- Highlights issues and suggests improvements

## Tech Stack

**Frontend:** React, Vite, Prism.js  
**Backend:** Node.js, Express, Groq API

## Setup

### Backend

1. Navigate to backend folder:
```bash
cd backend
npm install
```

2. Create `.env` file:
```
GROQ_API_KEY=your_api_key_here
PORT=5000
```

3. Start server:
```bash
npm start
```

### Frontend

1. Navigate to frontend folder:
```bash
cd frontend
npm install
```

2. Create `.env` file:
```
VITE_API_URL=http://localhost:5000
```

3. Start app:
```bash
npm run dev
```

4. Open http://localhost:5173

## Usage

1. Paste your code in the editor
2. Click "Review Code"
3. Get AI feedback on your code quality

## Live Demo

[View Demo](https://ai-code-reviewer-ochre.vercel.app)

## License

ISC
