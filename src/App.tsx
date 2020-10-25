import React from "react";
import { useSelector } from "react-redux";
import "./App.css";
import ConnectedNode from "./ConnectedNode/ConnectedNode";

function App() {
  return (
    <div className="App">
      <ConnectedNode id={0}></ConnectedNode>
    </div>
  );
}

export default App;
