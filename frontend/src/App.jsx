import { useEffect, useState } from "react";
import "prismjs/themes/prism-tomorrow.css";
import prism from "prismjs";
import Editor from "react-simple-code-editor";
import axios from "axios";
import Markdown from "react-markdown"
import "./App.css";

function App() {
  const [code, setCode] = useState(`function sum(){
                return 1+1;
              }`);

  useEffect(() => {
    prism.highlightAll;
  });

  const [review, setReview] = useState('')

  async function reviewCode() {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/ai/get-review`, { code });
    setReview(response.data)
  }

  return (
    <>
      <main>
        <div className="left">
          <div className="code">
            <Editor
              value={code}
              onValueChange={(code) => setCode(code)}
              highlight={(code) => prism.highlight(code, prism.languages.javascript, "javascript")}
              padding={10}
              style={{
                fontFamily: "Fira codel, Fira Mono, monospace ",
                fontSize: 12,
                border: "1px solid #ddd",
                borderRadius: "5px",
                height: "100%",
                width: "100%",
              }}
            ></Editor>
          </div>
          <div onClick={reviewCode} className="review">
            Review
          </div>
        </div>
        <div className="right">
          <Markdown>{review}</Markdown>
        </div>
      </main>
    </>
  );
}

export default App;
