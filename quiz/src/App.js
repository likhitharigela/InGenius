import React, { useState } from 'react';

import { BrowserRouter as Router, Routes, Route, Outlet,Navigate } from 'react-router-dom';
import Login from './login';
import Dashboard from './dboard';
import QuizApp from './QuizApp';
import Results from './results.js';
import Feedback from './feedback.js'
import AboutUs from './aboutus.js'
import ContactUs from './contactus.js'
import Admin from './admin.js'

import AddTest from './add-test'
import DeleteTest from './delete-test'



function App() {
  
  return (
    <Router>

      <div>
        <Routes>
          <Route
            exact
            path="/"
            element={<Login />}
          />
          
          <Route
            path="/dboard"
            element={<Dashboard />}
          />
          <Route
            path="/QuizApp"
            element={<QuizApp />}
          />
          <Route 
            path="/QuizApp/:quizName" 
            element={<QuizApp />}
          />

          <Route
            path="/results"
            element={<Results/>}
          />

          <Route
            path="/feedback"
            element={<Feedback/>}
          />
          <Route
            path="/aboutus"
            element={<AboutUs/>}
          />
          <Route
            path="/contactus"
            element={<ContactUs/>}
          />
          <Route
            path="/admin"
            element={<Admin/>}
          />
          <Route
            path="/add-test"
            element={<AddTest/>}
          />
          <Route
            path="/delete-test"
            element={<DeleteTest/>}
          />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
