import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './dashboard.css';
import backgroundImage from './images/background.jpg';



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
    <div>
      <style>
        {`
        h1{
          font-size:40px;
        }
          .DashboardContainer {
            position: relative;
            width: 100%;
            max-width: 1300px;
            max-height:100px;
            margin: 0 auto;
            padding: 5px;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          
          .MenuIcon {
            position: absolute;
            top: 20px;
            left: 20px;
            cursor: pointer;
            z-index: 100;
          }
          
          .MenuIcon .Line {
            width: 30px;
            height: 3px;
            background-color: #fff;
            margin: 5px 0;
            transition: transform 0.3s, opacity 0.3s;
          }
          
          .MenuIcon.menuActive .Line:first-child {
            transform: translateY(8px) rotate(45deg);
          }
          
          .MenuIcon.menuActive .Line:nth-child(2) {
            opacity: 0;
          }
          
          .MenuIcon.menuActive .Line:last-child {
            transform: translateY(-8px) rotate(-45deg);
          }
          
          .MenuOptionsOverlay {
            top: 110px;
            left: 25px; /* Adjust the left position as needed */
            background-color: rgba(0, 0, 0, 0.8);
            padding: 20px;
            border-radius: 5px;
            flex-direction: column;
            gap: 10px;
            visibility: hidden;
            opacity: 0;
            transition: visibility 0s, opacity 0.3s;
            right: auto; /* Ensures it's not positioned from the right */
          }
          
          
          .MenuOptionsOverlay.active {
            visibility: visible;
            opacity: 1;
          }
          
          .MenuOptionsOverlay a {
            color: #fff;
            text-decoration: none;
            font-size: 18px;
          }
          
          .WelcomeText {
            text-align: center;
            margin-bottom: 40px;
          }
          
          .AvailableTest {
            position: absolute;
            background-color: rgba(255, 255, 255, 0.8);
            border-radius: 10px;
            padding: 5px;
            margin-bottom: 5px;
            width: 14%;
            max-width: 600px;
            cursor: pointer;
            align-items: center;
            transition: transform 0.3s, box-shadow 0.3s;
          }
          
          .AvailableTest:hover {
            transform: translateY(-5px);
            box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.3);
          }
          
          .TestDetails h3 {
            margin-bottom: 10px;
          }
          
          .TestDetails p {
            margin-bottom: 20px;
          }
          
          .TestDetails button {
            background-color: #007bff;
            color: #fff;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s;
          }
          
          .TestDetails button:hover {
            background-color: #0056b3;
          }

          body {
            background-image: url(${backgroundImage});
            background-size: cover;
            background-position: center;
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            height: 100vh; /* Ensures background image covers entire viewport */
            align-items: center;
          }
          
        `}
      </style>
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
        <h1>Welcome to the Online Quiz</h1>
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
    </div>
  );
};

export default Dashboard;
