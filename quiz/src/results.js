// import React, { useState, useEffect } from 'react';
// import backgroundImage from './images/background.jpg';

// const Results = () => {
//   const [results, setResults] = useState([]);

//   useEffect(() => {
//     fetch('http://localhost:5000/api/results')
//       .then(response => response.json())
//       .then(data => setResults(data))
//       .catch(error => console.error('Error fetching results:', error));
//   }, []);

//   const goToHome = () => {
//     window.location.href = '/dboard';
//   };

//   return (
//     <div>
//     <style>
//       {`
//         body {
//           background-image: url(${backgroundImage});
//           background-size: cover;
//           background-position: center;
//           font-family: Arial, sans-serif;
//           margin: 0;
//           padding: 0;
//           height: 100vh;
//           align-items: center;
//           color: white; /* Text color for all components */
//         }
//         h1 {
//           font-size: 100px;
//           color: white;
//         }
//         th, td {
//           border: 1px solid #ffffff;
//           padding: 8px;
//         }
//         table {
//           border-collapse: collapse;
//           width: 50%;
//           border: 1px solid #ffffff;
//           background-color: rgba(255, 255, 255, 0.3); /* Transparent white background */
//         }
//         button {
//           background-color: #333; 
//           color: white; 
//           border: none;
//           padding: 10px 20px;
//           margin: 5px;
//           cursor: pointer;
//         }
//         button:hover {
//           background-color: #555;
//       `}
//     </style>
//     <div>
//       <h1>Results</h1>
//       <table style={{ borderCollapse: 'collapse', width: '100%' }}>
//         <thead>
//           <tr>
//             <th style={{ border: '1px solid #000', padding: '8px' }}>Question</th>
//             <th style={{ border: '1px solid #000', padding: '8px' }}>Correct Option</th>
//             <th style={{ border: '1px solid #000', padding: '8px' }}>Submitted Option</th>
//             <th style={{ border: '1px solid #000', padding: '8px' }}>Mark</th>
//           </tr>
//         </thead>
//         <tbody>
//           {results.map((result, index) => (
//             <tr key={index}>
//               <td style={{ border: '1px solid #000', padding: '8px' }}>{result.questionText}</td>
//               <td style={{ border: '1px solid #000', padding: '8px' }}>{result.correctOption}</td>
//               <td style={{ border: '1px solid #000', padding: '8px' }}>{result.submittedOption}</td>
//               <td style={{ border: '1px solid #000', padding: '8px' }}>{result.correctOption === result.submittedOption ? '✔' : '❌'}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <div style={{ textAlign: 'center', marginTop: '20px' }}>
//         <h2>
//           Marks: {results.filter(result => result.correctOption === result.submittedOption).length} / {results.length}
//         </h2>
//       </div>
//       <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
//         <button onClick={() => window.location.href = '/feedback'}>Go to Feedback</button>
//         <button onClick={goToHome}>Go to Home</button>
//       </div>
//     </div>
//     </div>
//   );
// };

// export default Results;

import React, { useState, useEffect } from 'react';
import backgroundImage from './images/background.jpg';
import 'animate.css'; // Import Animate.css library

const Results = () => {
  const [results, setResults] = useState([]);
  const [streak, setStreak] = useState(0);
  const [showAnimation, setShowAnimation] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/results')
      .then(response => response.json())
      .then(data => {
        setResults(data);
        calculateStreak(data); // Calculate streak when results are fetched
        setTimeout(() => {
          setShowAnimation(false); // Hide animation after 5 seconds
        }, 5000);
      })
      .catch(error => console.error('Error fetching results:', error));
  }, []);

  // Function to calculate streak
  const calculateStreak = (data) => {
    let currentDate = new Date(data[0].submissionDate); // Assuming submissionDate is available in results data
    let streakCount = 1;

    for (let i = 1; i < data.length; i++) {
      const submissionDate = new Date(data[i].submissionDate);
      const prevDate = new Date(data[i - 1].submissionDate);

      const diffTime = Math.abs(submissionDate - prevDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 1) {
        streakCount++;
      } else {
        break;
      }
    }

    setStreak(streakCount);
  };

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
            position: relative;
            overflow: hidden;
          }
          h1 {
            font-size: 100px;
            color: white;
            animation: fadeInDown; /* Animate the title */
            animation-duration: 1s;
          }
          h2 {
            animation: fadeIn; /* Animate the streak */
            animation-duration: 2s;
          }
          th, td {
            border: 1px solid #ffffff;
            padding: 8px;
            animation: fadeInLeft; /* Animate the table */
            animation-duration: 2s;
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
            animation: fadeInRight; /* Animate the buttons */
            animation-duration: 2s;
          }
          button:hover {
            background-color: #555;
          }
          @keyframes firecracker {
            0% {
              transform: translateY(-50%) rotate(0deg) scale(0);
              opacity: 0;
            }
            50% {
              transform: translateY(-50%) rotate(360deg) scale(2);
              opacity: 1;
            }
            100% {
              transform: translateY(-50%) rotate(0deg) scale(0);
              opacity: 0;
            }
          }
          .firecracker {
            position: absolute;
            top: 50%;
            animation: firecracker 3s ease-out infinite;
          }
          .green-mark {
            color: green;
          }
          .red-mark {
            color: red;
          }
        `}
      </style>
      <div>
        <h1>Results</h1>
        <h2>🔥 Streak: {streak} days in a row! 🔥</h2>
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
                <td style={{ border: '1px solid #000', padding: '8px' }} className={result.correctOption === result.submittedOption ? 'green-mark' : 'red-mark'}>{result.correctOption === result.submittedOption ? '✔' : '❌'}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <h2 style={{ fontSize: '24px' }}>
            Marks: {results.filter(result => result.correctOption === result.submittedOption).length} / {results.length}
          </h2>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <button onClick={() => window.location.href = '/feedback'}>Go to Feedback</button>
          <button onClick={goToHome}>Go to Home</button>
        </div>
        {/* Firecracker animation */}
        {showAnimation && (
          <>
            <div className="firecracker" style={{ left: '10px', top: '10px' }}>✨</div>
            <div className="firecracker" style={{ right: '10px', top: '10px' }}>✨</div>
            <div className="firecracker" style={{ left: '10px', bottom: '10px' }}>✨</div>
            <div className="firecracker" style={{ right: '10px', bottom: '10px' }}>✨</div>
          </>
        )}
      </div>
    </div>
  );
};

export default Results;


