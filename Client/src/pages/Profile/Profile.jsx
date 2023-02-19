import React from "react";
import "./Profile.css";

export default function Profile({ user }) {
  // console.log(user);
  return (
    <div className="card-body">
      <div className="card-container">
        <img
          className="round"
          width="35%"
          height="auto"
          src="/images/anna velarde small copy.jpg"
          alt="user"
        />
        <h3>{user.username}</h3>
        <h3>{user.email}</h3>
        <h6>{user.country}</h6>
        <p>
          Full Stack <br /> developer
        </p>
        <div className="buttons">
          <button className="primary">Message</button>
          <button className="primary ghost">Following</button>
        </div>
        <div className="skills">
          <h6>Skills/Tags</h6>
          <ul>
            <li>Front End Development</li>
            <li>HTML</li>
            <li>CSS</li>
            <li>JavaScript</li>
            <li>React</li>
            <li>Node</li>
          </ul>
          <br />
          <button className="primary btn btn-secondary mb-4">
            <a href="/profile/edit">Edit Profile</a>
          </button>
        </div>
      </div>
    </div>
  );
}
