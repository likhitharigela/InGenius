import React, { useState } from 'react';
import backgroundImage from './images/background.jpg';

const AddTest = () => {
  const [formData, setFormData] = useState({
    quizName: '',
    question: '',
    options: ['', '', '', ''],
    correctOption: 0
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  }

  const handleOptionChange = (e, index) => {
    const newOptions = [...formData.options];
    newOptions[index] = e.target.value;
    setFormData({
      ...formData,
      options: newOptions
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/add-question', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        setFormData({
          quizName: '',
          question: '',
          options: ['', '', '', ''],
          correctOption: 0
        });
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error('Error adding question:', error.message);
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
          .AddTestContainer {
            background-color: rgba(255, 255, 255, 0.5);
            padding: 30px;
            border-radius: 10px;
            width: 400px;
            box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
            text-align: center;
          }
          .FormGroup {
            margin-bottom: 20px;
          }
          .FormGroup label {
            font-weight: bold;
          }
          .FormGroup input,
          .FormGroup select {
            width: 100%;
            padding: 10px;
            margin-top: 5px;
            border: none;
            border-radius: 5px;
          }
          .FormGroup input[type="text"],
          .FormGroup select {
            margin-top: 5px;
            
          }
          .FormGroup input[type="text"] {
            margin-bottom: 5px;
          }
          button {
            padding: 10px 20px;
            margin-top: 20px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            background-color: #333333; 
            color: white;
            font-size: 16px;
            font-weight: bold;
            transition: background-color 0.3s ease;
          }
          button:hover {
            background-color: #45a049; 
          }
        `}
      </style>
      <div className="AddTestContainer">
        <h2>Add Test</h2>
        <form onSubmit={handleSubmit}>
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
          <div className="FormGroup">
            <label>Question:</label>
            <input
              type="text"
              name="question"
              value={formData.question}
              onChange={handleChange}
              required
            />
          </div>
          <div className="FormGroup">
            <label>Options:</label>
            {formData.options.map((option, index) => (
              <input
                type="text"
                value={option}
                onChange={(e) => handleOptionChange(e, index)}
                key={index}
                required
              />
            ))}
          </div>
          <div className="FormGroup">
            <label>Correct Option:</label>
            <select
              name="correctOption"
              value={formData.correctOption}
              onChange={handleChange}
              required
            >
              <option value={1}>Option A</option>
              <option value={2}>Option B</option>
              <option value={3}>Option C</option>
              <option value={4}>Option D</option>
            </select>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default AddTest;
