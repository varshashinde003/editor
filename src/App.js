import React from "react";
import "./App.css";
import Editor from "./components/Editor";

const App = () => (
  <div className="container">
    <h1 className="heading">React Editor</h1>
    <Editor
      optionsVisible={[
        "bold",
        "italic",
        "underline",
        "strikethrough",
        "list",
        "list-ol",
        // "link",
        // "image",
      ]}
    />
  </div>
);

export default App;
