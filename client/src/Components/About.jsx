import React from "react";
import userImage from "../Images/user.png";

const About = () => {
  return (
    <div>
      <h1>About this project</h1>
      <p>This project is developed by: Jasmin Estudillo.</p>
      <p>Email: 36J234@utas.edu.om</p>
      <img src={userImage} alt="devimage" className="userImage" />
      <button>Contact developer</button>
    </div>
  );
};

export default About;
