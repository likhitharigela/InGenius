import React from 'react';

import unknown from './images/Unknown_person.jpg'
import backgroundImage from './images/background.jpg';

const AboutUs = () => {
  const teamMembers = [
    {
      name: "Amith Sahani",
      position: "Frontend Developer",
      image: unknown,
    },
    {
      name: "Arigela Likhith",
      position: "Backend Developer",
      image: unknown,
    },
    {
      name: "Manya Singh",
      position: "Designer",
      image: unknown,
    },
    {
      name: "Manushri Jayanthi",
      position: "Content",
      image: unknown,
    }
  ];

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
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .TeamMember {
            display: inline-block;
            margin: 20px;
            background-color: rgba(255, 255, 255, 0.7); /* Add a semi-transparent white background */
            padding: 20px;
            border-radius: 10px;
            text-align: center;
          }

          .TeamMemberImage {
            width: 150px;
            height: 150px;
            border-radius: 50%;
          }
        `}
      </style>

      <h1 style={{ textAlign: 'center', color: 'white' }}>Meet Our Team</h1>
      <div>
        {teamMembers.map((member, index) => (
          <div className="TeamMember" key={index}>
            <img className="TeamMemberImage" src={member.image} alt={member.name} />
            <h2>{member.name}</h2>
            <h3>{member.position}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutUs;
