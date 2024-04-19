import React, { useState } from 'react';
import backgroundImage from './images/background.jpg';

const DeleteTest = () => {
  const [formData, setFormData] = useState({
    quizName: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  }

  const handleDelete = async (e) => {
    e.preventDefault();

    if (!formData.quizName) {
      alert('Quiz Name cannot be empty');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/delete-question/${formData.quizName}`, {
        method: 'DELETE'
      });

      const data = await response.json();

      if (response.ok) {
        alert("Test is deleted");
        setFormData({
          quizName: ''
        });
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error('Error deleting question:', error.message);
    }
  }

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

          .DeleteTestContainer {
            background-color: rgba(255, 255, 255, 0.5);
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
          }

          .Form {
            width: 300px;
            text-align: center;
          }

          .FormGroup {
            margin-bottom: 20px;
            display: flex;
            align-items: center;
          }

          .FormGroup label {
            font-weight: bold;
            width: 120px;
            margin-right: 10px;
          }

          .FormGroup input {
            width: 100%;
            padding: 10px;
            border: none;
            border-radius: 5px;
          }

          button {
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            background-color: #333333;
            color: white;
            transition: background-color 0.3s ease;
          }

          button:hover {
            background-color: #45a049;
          }
        `}
      </style>
      <div className="DeleteTestContainer" >
        <h2>Delete Test</h2>
        <form className="Form" onSubmit={handleDelete}>
          <div className="FormGroup">
            <label>Quiz Name:</label>
            <input
              type="text"
              name="quizName"
              value={formData.quizName}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" >Delete Test</button>
        </form>
      </div>
    </div>
  );
};

export default DeleteTest;
