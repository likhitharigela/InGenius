import React, { useState } from "react";

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
    <div style={contactFormContainer}>
        <form onSubmit={handleSubmit}>
          <div>
            <input style={inputStyle} type="text" placeholder="Your name" name="name" required />
          </div>
          <div>
            <input style={inputStyle} type="email" placeholder="Email" name="email" required />
          </div>
          <div>
            <textarea style={inputStyle} placeholder="Your message" name="message" required />
          </div>
          <div>
            <button style={buttonStyle} type="submit">Send a message</button>
          </div>
        </form>
    </div>
  );
};

export default ContactForm;

const contactFormContainer = {
  backgroundColor: "#2e86c1",
  padding: "20px",
  dsiplay:"flex",
  borderRadius: "10px",
  textAlign: "center"
};

const inputStyle = {
  margin: "10px 0",
  padding: "10px",
  width: "100%",
  border: "none"
};

const buttonStyle = {
  backgroundColor: "#2980b9",
  color: "white",
  cursor: "pointer",
  borderRadius: "5px"
};
