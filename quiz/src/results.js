import React, { useState, useEffect } from 'react';
import backgroundImage from './images/background.jpg';

const Results = () => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/results')
      .then(response => response.json())
      .then(data => setResults(data))
      .catch(error => console.error('Error fetching results:', error));
  }, []);

  const goToHome = () => {
    window.location.href = '/dboard';
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
          align-items: center;
          color: white; /* Text color for all components */
        }
        h1 {
          font-size: 100px;
          color: white;
        }
        th, td {
          border: 1px solid #ffffff;
          padding: 8px;
        }
        table {
          border-collapse: collapse;
          width: 50%;
          border: 1px solid #ffffff;
          background-color: rgba(255, 255, 255, 0.3); /* Transparent white background */
        }
        button {
          background-color: #333; 
          color: white; 
          border: none;
          padding: 10px 20px;
          margin: 5px;
          cursor: pointer;
        }
        button:hover {
          background-color: #555;
      `}
    </style>
    <div>
      <h1>Results</h1>
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #000', padding: '8px' }}>Question</th>
            <th style={{ border: '1px solid #000', padding: '8px' }}>Correct Option</th>
            <th style={{ border: '1px solid #000', padding: '8px' }}>Submitted Option</th>
            <th style={{ border: '1px solid #000', padding: '8px' }}>Mark</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result, index) => (
            <tr key={index}>
              <td style={{ border: '1px solid #000', padding: '8px' }}>{result.questionText}</td>
              <td style={{ border: '1px solid #000', padding: '8px' }}>{result.correctOption}</td>
              <td style={{ border: '1px solid #000', padding: '8px' }}>{result.submittedOption}</td>
              <td style={{ border: '1px solid #000', padding: '8px' }}>{result.correctOption === result.submittedOption ? '✔' : '❌'}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <h2>
          Marks: {results.filter(result => result.correctOption === result.submittedOption).length} / {results.length}
        </h2>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <button onClick={() => window.location.href = '/feedback'}>Go to Feedback</button>
        <button onClick={goToHome}>Go to Home</button>
      </div>
    </div>
    </div>
  );
};

export default Results;
