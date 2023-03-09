import React from "react";
import "./Profile.css";
import Loading from "../../components/Loading/Loading";
import { useState } from "react";
import { deleteUser } from "../../services/userService";
import * as PATH from "../../utils/paths";
import { useNavigate } from "react-router-dom";

export default function Profile(props) {
  const { user, setUser } = props;

  // console.log(" 👉 👉 / Profile / setUser:", setUser);
  console.log(" 👉 👉 / Profile / userID:", user._id);
  const [error, setError] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  function handleDeleteUser(event) {
    event.preventDefault();
    setIsLoading(true);
    deleteUser(user._id)
      .then((res) => {
        if (!res.success) {
          return setError(res.data);
        }
      })
      .finally(() => {
        if (error) {
          return setIsLoading(false);
        }
        console.log("User was succesfull deleted");
        return setUser(null);
      });
    navigate(PATH.HOME_PAGE);
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="card-body">
      <div className="card-container">
        <img
          className="round"
          width="35%"
          height="auto"
          src="/images/Profile-PNG-Pic.png"
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
          {user._id && (
            <button
              className="primary ghost btn btn-secondary mb-4"
              type="delete"
              onClick={handleDeleteUser}
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
