import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";


// CSS
import "./css/App.scss";

// Screens
import Home from "./screens/Home2";


function App() {
  return (
    <div className="App flex">

      <BrowserRouter>
        <div className="main-body flex">
        
          <Routes>
            <Route path="/" element={<Home />} exact />
            {/* <Route path="/alert" element={<AlertDialog />} exact /> */}
          </Routes>
        </div>
      </BrowserRouter>

      
    </div>
  );
}

export default App;
