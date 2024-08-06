import React from 'react';
import './App.css';
import { Routes, Route } from "react-router-dom";
import Search from "./scenes/Search"
import EditPage from "./scenes/EditPage"
import Login from "./scenes/Login"
import { ThemeProvider } from '@mui/styles';

function App() {

  return (
    <div className="App">
      <ThemeProvider>
      <header className="App-header">
        <Routes>
          <Route path="/" element={<Search />} />
          <Route path="/edit" element={<EditPage/>} />
          <Route path="/login" element={<Login/>} />
        </Routes>
      </header>
      </ThemeProvider>
    </div>
  );
}

export default App;