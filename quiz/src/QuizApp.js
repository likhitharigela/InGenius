import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import backgroundImage from './images/background.jpg';

const QuizComponent = () => {
  const { quizName } = useParams();
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const navigate = useNavigate();

  const handleOptionChange = (value) => {
    setSelectedOptions(prevOptions => ({
      ...prevOptions,
      [questions[currentQuestion]._id]: value, // Assuming each question has a unique _id
    }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const clearResults = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/clear-results', {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log('Previous results cleared');
      } else {
        console.error('Error clearing results');
      }
    } catch (error) {
      console.error('Error clearing results:', error);
    }
  };

  const submitQuiz = async () => {
    await clearResults(); // Clear previous results

    try {
      const response = await fetch('http://localhost:5000/api/submit-quiz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedOptions),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        navigate('/results');
      } else {
        const errorData = await response.json();
        console.error('Error submitting quiz:', errorData.message);
      }
    } catch (error) {
      console.error('Error submitting quiz:', error);
    }
  };

  useEffect(() => {
    fetch(`http://localhost:5000/api/questions/${quizName}`)
      .then(response => response.json())
      .then(data => setQuestions(data))
      .catch(error => console.error('Error fetching questions:', error));
  }, [quizName]);

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
            height: 100vh; /* Ensures background image covers entire viewport */
            align-items: center;
          }

          .QuestionContainer {
            background: rgba(255, 255, 255, 0.5);
            padding: 20px;
            border-radius: 10px;
            max-width: 600px;
            width: 100%;
          }
          
          .QuestionContainer p {
            font-weight: bold;
          }
          

          .OptionContainer {
            display: flex;
            flex-direction: column;
            align-items: flex-start; /* Align items to the left */
          }
          
          .OptionContainer div {
            margin-bottom: 10px;
            display: flex;
            align-items: center;
            justify-content: flex-start; /* Changed to flex-start */
            margin-left: 180px;
          }
          
          .OptionContainer label {
            flex: 1;
            display: flex;
            align-items: center;
          }
          
          .OptionContainer input[type="radio"] {
            margin-right: 10px; 
          }

          button {
            padding: 10px 20px;
          }
        `}
      </style>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <div className='QuestionContainer'>
          <div style={{ marginBottom: '25px' }}>
            <p style={{ fontSize: '30px', textAlign: 'left' }}>{currentQuestion + 1}) {questions[currentQuestion]?.question}</p>
          </div>
          <div className='OptionContainer' style={{ fontSize: '20px', textAlign: 'left' }}>
            {questions[currentQuestion]?.options.map((option, i) => (
              <div key={i}>
                <label>
                  <input
                    type="radio"
                    name={`q${currentQuestion}`}
                    value={i + 1}
                    checked={selectedOptions[questions[currentQuestion]._id] === `${i + 1}`}
                    onChange={() => handleOptionChange(`${i + 1}`)}
                  />
                  <span style={{ marginLeft: '5px' }}>{i + 1}) {option}</span>
                </label>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
            {currentQuestion > 0 && <button onClick={handlePrev}>Previous</button>}
            {currentQuestion < questions.length - 1
              ? <button onClick={handleNext}>Next</button>
              : <button onClick={submitQuiz}>Submit</button>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizComponent;
