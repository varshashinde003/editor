import React, { useState } from "react";
import "./button.css";

const Button = ({ id, buttonClass, children, elementClass, tag }) => {
  const [options, setOptions] = useState([]);
  const handleClick = () => {
    setOptions((options) => {
      if (options.includes(id)) {
        return options.filter((option) => option !== id);
      } else {
        return [...options, id];
      }
    });

    const selection = window.getSelection();
    let range = selection?.getRangeAt(0);

    if (selection && !range.collapsed) {
      range.toString();
      let dom = range.extractContents();
      let tagsList = dom.querySelectorAll("strong, em, u, s, ul, ol");
      if (tag) {
        if (tagsList.length > 0) {
          tagsList.forEach((node) => {
            if (node.tagName.toLowerCase() === tag) {
              if (node.tagName === "UL" || node.tagName === "OL") {
                let liList = node.querySelectorAll("li");
                if (liList.length < 0) {
                  liList.forEach((li) => {
                    let p = document.createElement("p");
                    p.innerHTML = li.textContent;
                  });
                } else {
                  let newNode = document.createTextNode(node.textContent);
                  range.insertNode(newNode);
                }
              } else {
                let newNode = document.createTextNode(node.textContent);
                range.insertNode(newNode);
              }
            } else if (
              (node.tagName === "UL" || node.tagName === "OL") &&
              (tag === "ul" || tag === "ol")
            ) {
              let nodeList = dom.querySelectorAll("ul, ol");
              let newNode = document.createElement(
                tag === "ul" ? "ul" : tag === "ol" ? "ol" : tag
              );
              if (nodeList.length > 0) {
                nodeList.forEach((node) => {
                  let li = document.createElement("li");
                  li.appendChild(document.createTextNode(node.textContent));
                  newNode.appendChild(li);
                  range.insertNode(newNode);
                });
              } else {
                let li = document.createElement("li");
                newNode.appendChild(li);
                li.appendChild(dom);
                newNode.appendChild(dom);
                range.insertNode(newNode);
              }
            } else {
              let nodeList = dom.querySelectorAll("p, div");
              if (nodeList.length > 0) {
                nodeList.forEach((node) => {
                  node.classList.add(elementClass);
                });
                range.insertNode(nodeList[0]);
              } else {
                if (tag === "ul" || tag === "ol") {
                  let newNode = document.createElement(
                    tag === "ul" ? "ul" : tag === "ol" ? "ol" : tag
                  );
                  if (nodeList.length > 0) {
                    nodeList.forEach((node) => {
                      let li = document.createElement("li");
                      li.appendChild(document.createTextNode(node.textContent));
                      newNode.appendChild(li);
                      range.insertNode(newNode);
                    });
                  } else {
                    let li = document.createElement("li");
                    newNode.appendChild(li);
                    li.appendChild(dom);
                    newNode.appendChild(dom);
                    range.insertNode(newNode);
                  }
                } else {
                  let newNode = document.createElement("p");
                  elementClass && newNode.classList.add(elementClass);
                  newNode.appendChild(dom);
                  range.insertNode(newNode);
                }
              }
            }
          });
        } else {
          let newNode = document.createElement(
            tag === "ul" ? "ul" : tag === "ol" ? "ol" : tag
          );
          if (tag === "ul" || tag === "ol") {
            let nodeList = dom.querySelectorAll("p, div");
            if (nodeList.length > 0) {
              nodeList.forEach((node) => {
                let li = document.createElement("li");
                li.appendChild(document.createTextNode(node.textContent));
                newNode.appendChild(li);
                range.insertNode(newNode);
              });
            } else {
              let li = document.createElement("li");
              newNode.appendChild(li);
              li.appendChild(dom);
              newNode.appendChild(dom);
              range.insertNode(newNode);
            }
          } else {
            newNode.appendChild(dom);
            range.insertNode(newNode);
          }
        }
      }
    }
  };

  return (
    <button
      id={id}
      className={`editor__button ${buttonClass}${
        options.includes(id) ? " active" : ""
      }`}
      onClick={() => handleClick(id)}
    >
      {children}
    </button>
  );
};

export default Button;
