import { useEffect, useState } from "react"

export const composeOptions = ({ ...options }) =>
  Object.keys(options).reduce((a, c) => {
    if (options[c]) {
      a.push(c.split("").map((c, i) => i === 0 ? c.toUpperCase() : c).join(""));
    }
    return a;
  }, []).join("")

// // WARNING: this hook will only work if the setNode is set to a DOM element, e.g. div, input, etc., not a React element!!!
export const useClickOutside = handleClick => {
  const [node, setNode] = useState(null);

  useEffect(() => {
    const checkOutside = e => {
      if (node.contains(e.target)) {
        return;
      }
      handleClick(e);
    }
    node && document.addEventListener("mousedown", checkOutside);
    return () => document.removeEventListener("mousedown", checkOutside);
  }, [node, handleClick])

  return setNode;
}
