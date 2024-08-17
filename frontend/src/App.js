import React from "react";
import "./App.css";
import Body from "./Components/Body";
import { Toaster } from "react-hot-toast";
function App() {
  return (
    <div className="App h-[100vh] w-[100vw]">
      <Body/>
      <Toaster/>
    </div>
  );
}

export default App;
