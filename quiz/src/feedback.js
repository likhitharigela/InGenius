import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import backgroundImage from './images/background.jpg';


const Feedback = () => {
  const [feedback, setFeedback] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can add any further action you want to perform here.
    window.location.href = '/dboard'; // Redirect to Dashboard
  };

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
            flex-direction: column; /* Added to stack elements vertically */
            color:white;
          }
          h1{
            font-size: 60px;
          }
          h2{
            font-size:10px;
            padding:2px;
          }
        `}
      </style>
    <div style={{ textAlign: 'center' }}>
      <h1>Feedback(optional)</h1>
      <ul style={{ listStyleType: 'none', padding: '0' }}>
        <h2>1)It can motivate and encourage us to keep going and achieve our goals.</h2>
        <h2>2)It is always there and can help us improve and learn from our mistakes.</h2>
        <h2>3)thanking you for completing the test and have a good day</h2>
      </ul>
      <form onSubmit={handleSubmit}>
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          rows="4"
          cols="70"
          placeholder="Enter your feedback here"
          style={{ width: '80%', marginBottom: '20px', fontSize:"18px" }}
        />
        <br />
        <button type="submit">Submit</button>
      </form>
      <br />
    </div>
    </div>
  );
};

export default Feedback;
