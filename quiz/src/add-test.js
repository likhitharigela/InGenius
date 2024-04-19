import React, { useState } from 'react';

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
    <div className="AddTestContainer" style={styles.addTestContainer}>
      <h2>Add Test</h2>
      <form className="Form" onSubmit={handleSubmit}>
        <div className="FormGroup" style={styles.formGroup}>
          <label>Quiz Name:</label>
          <input
            type="text"
            name="quizName"
            value={formData.quizName}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
        <div className="FormGroup" style={styles.formGroup}>
          <label>Question:</label>
          <input
            type="text"
            name="question"
            value={formData.question}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
        <div className="FormGroup" style={styles.formGroup}>
          <label>Options:</label>
          {formData.options.map((option, index) => (
            <input
              type="text"
              value={option}
              onChange={(e) => handleOptionChange(e, index)}
              key={index}
              required
              style={styles.input}
            />
          ))}
        </div>
        <div className="FormGroup" style={styles.formGroup}>
          <label>Correct Option:</label>
          <select
            name="correctOption"
            value={formData.correctOption}
            onChange={handleChange}
            required
            style={styles.input}
          >
            <option value={1}>Option A</option>
            <option value={2}>Option B</option>
            <option value={3}>Option C</option>
            <option value={4}>Option D</option>
          </select>
        </div>
        <button type="submit" style={styles.button}>Submit</button>
      </form>
    </div>
  );
};

export default AddTest;

const styles = {
  addTestContainer: {
    backgroundColor: 'pink',
    padding: '20px',
    borderRadius: '10px',
    textAlign: 'center',
    margin: 'auto',
    width: '50%'
  },
  formGroup: {
    marginBottom: '10px'
  },
  input: {
    width: '100%',
    padding: '8px',
    borderRadius: '5px'
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    borderRadius: '5px',
    backgroundColor: 'yellow',
    color: 'green',
    border: '2px solid green',
    cursor: 'pointer'
  }
};
