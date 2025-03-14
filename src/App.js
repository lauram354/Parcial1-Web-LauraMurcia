import React from 'react';
import Login from './components/Login';
import Robots from './components/Robots';
import Detail from './components/Detail';
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  

  return (
    <div className="App">
    <div className="container">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/robots" element={<Robots/>} />
          <Route path="/robots/:robotId" element={<Detail />} />
        </Routes>
      </BrowserRouter>
    </div>
   </div>
  );
}

export default App;
