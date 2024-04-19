import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AddTest from './add-test'
import DeleteTest from './delete-test'

const Admin = () => {
  const handleDisplayTests = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/questions');
      const data = await response.json();
      console.log(data); // Log the retrieved quizzes
    } catch (error) {
      console.error('Error fetching quizzes:', error);
    }
  };

  return (
    <div className="AdminContainer" style={styles.adminContainer}>
      <h2>Welcome back, Admin!</h2>
      <div className="Buttons" style={styles.buttonContainer}>
        <Link to="/add-test">
          <button className="Button" style={styles.button}>Add Test</button>
        </Link>
        <Link to="/delete-test">
          <button className="Button" style={styles.button}>Delete Test</button>
        </Link>

        
        
      </div>
      <Link to="/">
          <button className="Button" style={styles.button}>Log Out</button>
        </Link>
    </div>
  );
};

export default Admin;

const styles = {
  adminContainer: {
    backgroundColor: 'green',
    padding: '20px',
    borderRadius: '10px',
    textAlign: 'center',
    margin: 'auto',
    width: '50%',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px',
  },
  button: {
    margin: '5px',
    fontSize: '16px'
  }
};
