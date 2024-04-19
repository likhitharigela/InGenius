import React, { useState } from 'react';

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
    <div className="DeleteTestContainer" style={styles.deleteTestContainer}>
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
            style={styles.input}
          />
        </div>
        <button type="submit" style={styles.button}>Delete Test</button>
      </form>
    </div>
  );
};

export default DeleteTest;

const styles = {
  deleteTestContainer: {
    backgroundColor: 'green',
    padding: '20px',
    borderRadius: '10px',
    textAlign: 'center',
    margin: 'auto',
    width: '50%'
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
    backgroundColor: 'white',
    color: 'green',
    border: '2px solid green',
    cursor: 'pointer'
  }
};
