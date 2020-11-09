import { useState } from "react";

const useVisualMode = (initial) => {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  //The below function sets a new value for the mode of the appointment card. It also updates the history array, which is used to go back e.g. when the user hits "cancel." Replace is an optional boolean parameter which means, don't include the latest state in history.
  function transition(value, replace) {
    setMode(value);
    if (replace) {
      setHistory(history);
    } else {
      setHistory([...history, value])
    }
  };

  //The below function utilizes the history array to return to a previous state. E.g. if the user hits "cancel" when editing a card, it will return them to the Show mode.
  function back() {
    if (history.length > 1) {
      const newHistory = history;
      newHistory.pop();
      setHistory(newHistory);
      setMode(history[history.length-1]);
    }
  };

  return { mode, transition, back };
}

export { useVisualMode }