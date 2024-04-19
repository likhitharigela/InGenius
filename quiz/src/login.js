import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './loginstyle.css'; // Import the CSS file



function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    isRegistering: false
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(`http://localhost:5000/api/${formData.isRegistering ? 'register' : 'login'}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: formData.email,
        password: formData.password
      })
    });

    const data = await response.json();

    if (response.ok) {
      if (formData.isRegistering) {
        alert(`Successfully registered!\nEmail: ${formData.email}`);
        setFormData({
          email: '',
          password: '',
          isRegistering: false
        });
      } else {
        if (data.isAdmin) {
          navigate('/admin');
        } else {
          navigate('/dboard');
        }
      }
    } else {
      alert(data.message);
    }
  }

  const toggleMode = () => {
    setFormData(prevState => ({ ...prevState, isRegistering: !prevState.isRegistering }));
  }


  return (
    <div className="container">
      <div className="formContainer">
        <h2>{formData.isRegistering ? 'Register' : 'Login'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="labelContainer">
            <label className="label">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="inputField"
            />
          </div>
          <br />
          <div className="labelContainer">
            <label className="label">Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="inputField"
            />
          </div>
          <br />
          <div className="buttonContainer">
            <button className="button" id="login" type="submit">
              {formData.isRegistering ? 'Register' : 'Login'}
            </button>
            <button className="button" id="register" type="button" onClick={toggleMode}>
              {formData.isRegistering ? 'Switch to Login' : 'Switch to Register'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default Login;