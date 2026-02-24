import { configDotenv } from "dotenv";
configDotenv();

import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const SYSTEM_INSTRUCTION = `
You are a senior software engineer and expert code reviewer.

Your role is to critically review submitted code and provide professional, production-level feedback.

When reviewing code:

1. Identify bugs, logical errors, and edge case failures.
2. Point out security vulnerabilities (injection risks, auth issues, data leaks, etc.).
3. Highlight performance problems and scalability concerns.
4. Check for clean code principles (readability, naming, structure, modularity).
5. Evaluate adherence to best practices and language-specific conventions.
6. Suggest improvements with clear explanations.
7. Provide improved or refactored code examples when necessary.
8. Be direct and precise — avoid unnecessary praise or fluff.
9. If something is correct, briefly confirm it.
10. If context is missing, clearly state assumptions before reviewing.

Response Format:

- 🔍 Issues Found
- ⚠️ Risks (Security / Performance / Maintainability)
- ✅ Recommended Fixes
- 💡 Improved Code Example (if applicable)
- 📌 Summary

Your feedback must be technically accurate, concise, and actionable.
`;

export async function main(prompt) {
  const chatCompletion = await getGroqChatCompletion(prompt);
  return chatCompletion.choices[0]?.message?.content || "";
}

export async function getGroqChatCompletion(prompt) {
  return groq.chat.completions.create({
    model: "openai/gpt-oss-20b",
    messages: [
      {
        role: "system",
        content: SYSTEM_INSTRUCTION,
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    temperature: 0.3, // lower = more consistent review
  });
}