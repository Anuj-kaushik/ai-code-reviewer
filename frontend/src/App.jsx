import { useEffect, useState } from "react";
import "prismjs/themes/prism-tomorrow.css";
import prism from "prismjs";
import Editor from "react-simple-code-editor";
import axios from "axios";
import Markdown from "react-markdown";
import "./App.css";

function App() {
  const [code, setCode] = useState(`function sum(a, b) {
  return a + b;
}

// Example usage
const result = sum(5, 3);
console.log(result);`);

  const [review, setReview] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    prism.highlightAll();
  }, []);

  async function reviewCode() {
    if (!code.trim()) {
      setError("Please enter some code to review");
      return;
    }

    setIsLoading(true);
    setError("");
    setReview("");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/ai/get-review`,
        { code }
      );
      setReview(response.data);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to get code review. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  }

  function clearCode() {
    setCode("");
    setReview("");
    setError("");
  }

  function loadSample() {
    setCode(`function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// This function has performance issues
console.log(fibonacci(40));`);
    setReview("");
    setError("");
  }

  function copyReview() {
    if (review) {
      navigator.clipboard.writeText(review);
      // You could add a toast notification here
    }
  }

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <div className="logo-section">
            <div className="logo-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M16 18l2-2-2-2M8 6L6 8l2 2M12 2v20M2 12h20" />
              </svg>
            </div>
            <div>
              <h1 className="logo-title">AI Code Reviewer</h1>
              <p className="logo-subtitle">Get instant feedback on your code</p>
            </div>
          </div>
          <div className="header-actions">
            <button className="btn-secondary" onClick={loadSample}>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Load Sample
            </button>
            <button className="btn-secondary" onClick={clearCode}>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
              Clear
            </button>
          </div>
        </div>
      </header>

      <main className="main-content">
        <div className="editor-section">
          <div className="section-header">
            <h2 className="section-title">Your Code</h2>
            <span className="code-language">JavaScript</span>
          </div>
          <div className="code-editor-wrapper">
            <Editor
              value={code}
              onValueChange={(code) => setCode(code)}
              highlight={(code) =>
                prism.highlight(code, prism.languages.javascript, "javascript")
              }
              padding={20}
              className="code-editor"
              style={{
                fontFamily: '"JetBrains Mono", "Fira Code", monospace',
                fontSize: 14,
                lineHeight: 1.6,
                height: "100%",
              }}
            />
          </div>
          <div className="editor-footer">
            <button
              className="btn-primary"
              onClick={reviewCode}
              disabled={isLoading || !code.trim()}
            >
              {isLoading ? (
                <>
                  <span className="spinner"></span>
                  Analyzing...
                </>
              ) : (
                <>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  Review Code
                </>
              )}
            </button>
          </div>
        </div>

        <div className="review-section">
          <div className="section-header">
            <h2 className="section-title">AI Review</h2>
            {review && (
              <button className="btn-icon" onClick={copyReview} title="Copy review">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </button>
            )}
          </div>
          <div className="review-content">
            {error && (
              <div className="error-message">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                {error}
              </div>
            )}

            {isLoading && (
              <div className="loading-state">
                <div className="loading-animation">
                  <div className="loading-dot"></div>
                  <div className="loading-dot"></div>
                  <div className="loading-dot"></div>
                </div>
                <p>AI is analyzing your code...</p>
              </div>
            )}

            {!isLoading && !error && !review && (
              <div className="empty-state">
                <div className="empty-icon">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3>No Review Yet</h3>
                <p>Paste your code and click "Review Code" to get AI-powered feedback</p>
              </div>
            )}

            {review && !isLoading && !error && (
              <div className="markdown-content">
                <Markdown>{review}</Markdown>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
