import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import List from './List';
import FormPage from './FormPage';

import './App.css';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<FormPage />} />
        <Route path="/list" element={<List />} />
      </Routes>
    </Router>
  );

}

export default App;
