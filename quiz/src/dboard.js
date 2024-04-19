import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './dashboard.css';


const Dashboard = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [quizzes, setQuizzes] = useState([]);
  const navigate = useNavigate();

  const handleMenuToggle = () => {
    setShowMenu(!showMenu);
  }

  const handleTakeTest = (quizName) => {
    navigate(`/QuizApp/${quizName}`);
  }

  useEffect(() => {
    fetch('http://localhost:5000/api/quizzes')
      .then(response => response.json())
      .then(data => setQuizzes(data))
      .catch(error => console.error('Error fetching quizzes:', error));
  }, []);


  useEffect(() => {
    fetch('http://localhost:5000/api/all-quizzes')
      .then(response => response.json())
      .then(data => setQuizzes(data))
      .catch(error => console.error('Error fetching quizzes:', error));
  }, []);

  return (
    <div className={`DashboardContainer ${showMenu ? 'menuActive' : ''}`}>
      <div className={`MenuIcon ${showMenu ? 'menuActive' : ''}`} onClick={handleMenuToggle}>
        <div className="Line"></div>
        <div className="Line"></div>
        <div className="Line"></div>
      </div>
      <div className={`MenuOptionsOverlay ${showMenu ? 'active' : ''}`}>
        <Link to="/results">Marks</Link>
        <Link to="/contactus">Contact Us</Link>
        <Link to="/aboutus">About Us</Link>
        <Link to="/">Logout</Link>
      </div>
      <div className="WelcomeText">
        <h2>Welcome to the Online Quiz</h2>
      </div>

      {quizzes.map((quiz, index) => (
        <div className={`AvailableTest test${index}`} key={index} onClick={() => handleTakeTest(quiz)}>
          <div className="TestDetails">
            <h3>Available Test</h3>
            <p>Test Name: {quiz}</p>
            <button>Take Test</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
