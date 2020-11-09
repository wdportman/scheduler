import { useState } from "react";

const useVisualMode = (initial) => {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(value, replace) {
    setMode(value);
    if (replace) {
      setHistory(history);
    } else {
      setHistory([...history, value])
    }
  };

  function back() {
    if (history.length > 1) {
      history.pop();
      setMode(history[history.length - 1]);
    }
  };

  return { mode, transition, back };
}

export { useVisualMode }