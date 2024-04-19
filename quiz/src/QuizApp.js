import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

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
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <div style={{ background: 'coral', padding: '30px', borderRadius: '10px', maxWidth: '600px', width: '100%' }}>
        <div style={{ marginBottom: '25px' }}>
          <p style={{ fontSize: '20px', textAlign: 'center' }}>{currentQuestion + 1}) {questions[currentQuestion]?.question}</p>
        </div>
        <div>
          {questions[currentQuestion]?.options.map((option, i) => (
            <div key={i} style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', marginLeft: '180px'}}>
              <label style={{ flex: 1 }}>
                <input
                  type="radio"
                  name={`q${currentQuestion}`}
                  value={i + 1}
                  checked={selectedOptions[questions[currentQuestion]._id] === `${i + 1}`}
                  onChange={() => handleOptionChange(`${i + 1}`)}
                />
                <span style={{ marginLeft: '10px' }}>{i + 1}) {option}</span>
              </label>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
          {currentQuestion > 0 && <button onClick={handlePrev} style={{ padding: '10px 20px' }}>Previous</button>}
          {currentQuestion < questions.length - 1
            ? <button onClick={handleNext} style={{ padding: '10px 20px', marginLeft: currentQuestion === 0 ? 'auto' : '' }}>Next</button>
            : <button onClick={submitQuiz} style={{ padding: '10px 20px', marginLeft: currentQuestion === 0 ? 'auto' : '' }}>Submit</button>
          }
        </div>
      </div>
    </div>
  );
};

export default QuizComponent;
