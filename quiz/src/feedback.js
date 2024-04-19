import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Feedback = () => {
  const [feedback, setFeedback] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can add any further action you want to perform here.
    window.location.href = '/dboard'; // Redirect to Dashboard
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Feedback(optional)</h1>
      <ul style={{ listStyleType: 'none', padding: '0' }}>
        <h3>1)It can motivate and encourage us to keep going and achieve our goals.</h3>
        <h3>2)It is always there and can help us improve and learn from our mistakes.</h3>
        <h3>3)thanking you for completing the test and have a good day</h3>
      </ul>
      <form onSubmit={handleSubmit}>
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          rows="4"
          cols="50"
          placeholder="Enter your feedback here"
          style={{ width: '80%', marginBottom: '20px', fontSize:"18px" }}
        />
        <br />
        <button type="submit">Submit</button>
      </form>
      <br />
    </div>
  );
};

export default Feedback;
