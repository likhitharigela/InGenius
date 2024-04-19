import React from "react";
import backgroundImage from './images/background.jpg';

const ContactForm = () => {

  const handleSubmit = (e) => {
    e.preventDefault();
    const inputs = e.target.elements;
    const data = {};
    console.log(data);
    alert("Thanks for contacting us! We'll be in touch soon.");
    e.target.reset(); // Reset the form
  };

  return (
    <div style={containerStyle}>
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
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column; /* Added to stack elements vertically */
          }
          h1 {
            font-size:60px;
            color: white;
            margin-bottom: 450px; /* Added to create space between h1 and form */
            text-align: center; /* Center the text */
          }
          form {
            position: absolute;
            background-color: rgba(255, 255, 255, 0.5); /* Transparent white background */
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2); /* Drop shadow effect */
            width: 300px;
          }
          input, textarea {
            margin: 10px 0;
            padding: 10px;
            width: calc(100% - 20px); /* Adjusting width to consider padding */
            border: none;
            border-radius: 5px;
          }
          button {
            margin-top: 10px;
            padding: 10px 0;
            width: calc(100% - 20px); /* Adjusting width to consider padding */
            background-color: #2980b9;
            color: white;
            cursor: pointer;
            border: none;
            border-radius: 5px;
          }
          button:hover {
            background-color: #2471a3;
          }
        `}
      </style>
      <h1>Contact Us</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Your name" name="name" required />
        <input type="email" placeholder="Email" name="email" required />
        <textarea placeholder="Your message" name="message" required />
        <button type="submit">Send a message</button>
      </form>
    </div>
  );
};

export default ContactForm;

const containerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};
