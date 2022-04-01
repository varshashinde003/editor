import React, { useState, useEffect } from "react";
import Button from "../Button";
import EditableElement from "../EditableElement";
import "./editor.css";

const Editor = ({ text, optionsVisible }) => {
  const initialValue = text || "";
  const [value, setValue] = useState(initialValue);
  const [toolbar, setToolbar] = useState([]);
  // const [showModal, toggleModal] = useState(false);
  useEffect(() => {
    let toolbar = optionsVisible.map((option, idx) => (
      <Button
        key={idx}
        buttonClass={`icon fa fa-${option}`}
        elementClass={`editor__button--${option}`}
        id={idx}
        tag={getTags(option)}
      >
        {option}
      </Button>
    ));
    setToolbar(toolbar);
  }, [optionsVisible]);

  const getTags = (option) => {
    if (option === "bold") return "strong";
    if (option === "italic") return "em";
    if (option === "underline") return "u";
    if (option === "strikethrough") return "s";
    if (option === "list") return "ul";
    if (option === "list-ol") return "ol";
    else return null;
  };

  const handleChange = (value) => {
    if (value.length > 0) return;
    setValue(value);
  };

  return (
    <div className="editor">
      <nav className="editor__toolbar">{toolbar}</nav>
      <EditableElement
        onChange={handleChange}
        className="editor__textarea editor__html"
      >
        <p>{value}</p>
      </EditableElement>
    </div>
  );
};

export default Editor;
