import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
    <div>
      <style>
        {`
          body {
            background-image: url('./images/background.jpg');
            background-size: cover;
            background-position: center;
            margin: 0;
            padding: 0;
            height: 100vh;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          }
          .container {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
          }
          .formContainer {
            background-color: rgba(255, 255, 255, 0.4);
            padding: 30px;
            border-radius: 10px;
            width: 350px;
            box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
          }
          .label {
            font-size: 16px;
            color: #333333;
            margin-bottom: 8px;
          }
          .inputField {
            width: 100%;
            padding: 12px;
            margin-top: 5px;
            border: 1px solid #ddd;
            border-radius: 5px;
            font-size: 16px;
          }
          .buttonContainer {
            display: flex;
            justify-content: space-between;
            margin-top: 20px;
          }
          .button {
            padding: 12px 30px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            background-color: #333333;
            color: white;
            font-size: 16px;
            font-weight: bold;
            text-transform: uppercase;
            transition: background-color 0.3s ease;
          }
          .button:hover {
            background-color: #555555;
          }
          .toggleButton {
            border: none;
            background: none;
            color: #333333;
            font-size: 14px;
            text-decoration: underline;
            cursor: pointer;
          }
        `}
      </style>
      <div className="container">
        <div className="formContainer">
          <h1>{formData.isRegistering ? 'Register' : 'Login'}</h1>
          <form onSubmit={handleSubmit}>
            <div>
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
            <div>
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
            <div className="buttonContainer">
              <button className="button" type="submit">
                {formData.isRegistering ? 'Register' : 'Login'}
              </button>
              <button className="toggleButton" type="button" onClick={toggleMode}>
                {formData.isRegistering ? 'Switch to Login' : 'Switch to Register'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
