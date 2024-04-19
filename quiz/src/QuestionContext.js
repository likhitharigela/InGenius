// QuestionsTab.js

import React from 'react';

const QuestionsTab = ({ questions }) => {
  return (
    <div className="QuestionsTab">
      <h2>Questions</h2>
      {questions.map((question, index) => (
        <div key={index}>
          <h3>{question.question}</h3>
          <ul>
            {question.options.map((option, idx) => (
              <li key={idx}>{option}</li>
            ))}
          </ul>
          <p>Correct Answer: {question.correctAnswer}</p>
        </div>
      ))}
    </div>
  );
};

export default QuestionsTab;
