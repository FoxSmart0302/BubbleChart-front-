import React from "react";
import ReactDOM from "react-dom";
import Bubble from "./components/Bubble";

const App = () => {
 
  return (
   <div>
      <Bubble />
   </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
