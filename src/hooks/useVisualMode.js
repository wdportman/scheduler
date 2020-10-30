import { useState } from "react";

const useVisualMode = (initial) => {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]); 

  function transition(value, replace) {
    if (replace) {
      history.pop();
      history.push(value);
      setMode(value);
    } else {
    setMode(value);
    history.push(value);
    }
  };

  function back() {
    if (history.length > 1) {
      history.pop();
      setMode(history[history.length-1]);
    }
  };

  return {mode, transition, back};
}

export { useVisualMode }