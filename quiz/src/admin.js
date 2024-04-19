import React from 'react';
import { Link } from 'react-router-dom';
import AddTest from './add-test';
import DeleteTest from './delete-test';
import backgroundImage from './images/background.jpg';

const Admin = () => {
  return (
    <div>
      <style>
        {`
          body {
            background-image: url(${backgroundImage});
            background-size: cover;
            background-position: center;
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .AdminContainer {
            background-color: rgba(255, 255, 255, 0.5);
            padding: 30px;
            border-radius: 10px;
            width: 350px;
            box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.5);
            text-align: center;
          }
          .Buttons {
            margin-top: 30px;
          }
          .Button {
            padding: 10px 20px;
            margin: 10px 10px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            background-color: #333333; 
            color: white;
            font-size: 16px;
            font-weight: bold;
            transition: background-color 0.3s ease;
          }
          .Button:hover {
            background-color: #45a049; 
          }
        `}
      </style>
      <div className="AdminContainer">
        <h2>Welcome back, Admin!</h2>
        <div className="Buttons">
          <Link to="/add-test">
            <button className="Button">Add Test</button>
          </Link>
          <Link to="/delete-test">
            <button className="Button">Delete Test</button>
          </Link>
        </div>
        <Link to="/">
          <button className="Button">Log Out</button>
        </Link>
      </div>
    </div>
  );
};

export default Admin;
