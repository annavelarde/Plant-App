import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  updateProfileImage,
  updatingUserName,
} from "../../services/userService";
import * as PATHS from "../../utils/paths";
import "./UpdateProfile.css";

const blancForm = {
  username: "",
  email: "",
  password: "",
  userDescription: "",
  profileImage: "",
};

function UpdateProfile(props) {
  const { user, setUser } = props;
  // console.log(" 👉 👉 / UpdateProfile / props:", props);
  // console.log(" 👉 👉 / UpdateProfile / setUser:", setUser);
  // console.log(" 👉 👉 / UpdateProfile / user:", user);

  // const [username, setUsername] = useState(user.username);
  // const [email, setEmail] = useState(user.email);
  // const [country, setCountry] = useState(user.country);
  // const [password, setPassword] = useState(user.password);

  const [chosenPicture, setChosenPicture] = useState("");
  const [inputKey, setInputKey] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [infoUser, setInfoUser] = useState(blancForm);
  // console.log(" 👉 👉 / UpdateProfile / infoUser:", infoUser);

  //main form
  function handleFromSubmit(event) {
    event.preventDefault();
    setError(false);

    // if (!chosenPicture || !username || !email || !country) {
    //   setError("Please, check before saving!");
    //   return;
    // }

    // const formBody = new window.FormData();
    // formBody.append("profileImage", chosenPicture);
    // formBody.append("userId", user._id);

    updateProfileImage(infoUser)
      .then((res) => {
        if (!res.success) {
          setError(response.data);
          setIsLoading(false);
          return;
        }
        // setUser({ ...user, profileImage: res.data.profileImage });
        setUser(response.data.user);
        console.log(
          " 👉 👉 / updateProfileImage / response:",
          response.data.user
        );
      })
      .finally(() => {
        setIsLoading(false);
        // setInputKey(Date.now());
      });
  }
  //Image
  function handleImageInput(event) {
    console.log(event.target.files[0]);
    const imageFromInput = event.target.files[0];

    setChosenPicture(imageFromInput);
  }
  //Text
  function handleTextChange(e) {
    const { name, value } = e.target;
    setInfoUser({ ...infoUser, [name]: value });
    console.log(" 👉 👉 / handleTextChange / setInfoUser:", setInfoUser);
  }

  return (
    <div className="profile-page-update">
      <div className="elements-profile">
        <div className="card-body-update">
          <h1> Hi {user.username}, </h1>
          <b>update your profile </b>
          <br />
        </div>
        <div>
          <div className="card-container-div">
            <div className="card-container-update">
              <img
                className="round"
                width="35%"
                height="auto"
                src={user.profileImage}
                alt={isLoading ? user.chosenPicture : user.profileImage}
              />
              <div>
                {error && (
                  <p style={{ color: "teal", fontWeight: "530" }}>{error}</p>
                )}
                <form onSubmit={handleFromSubmit} method="POST">
                  <div>
                    <div>
                      <input
                        className="addPicture"
                        key={inputKey}
                        type="file"
                        onChange={handleImageInput}
                      />
                      {/* <button type="submit">Update image</button> */}
                    </div>
                    <div>
                      <p className="style"> Name: </p>
                      <input
                        type="text"
                        name="username"
                        placeholder={user.username}
                        value={infoUser.username}
                        onChange={handleTextChange}
                      />
                      <p className="style">Email:</p>
                      <input
                        type="text"
                        name="email"
                        placeholder={user.email}
                        value={infoUser.email}
                        onChange={handleTextChange}
                      />
                      <p className="style">Country:</p>
                      <input
                        type="text"
                        name="country"
                        placeholder={user.country}
                        value={infoUser.country}
                        onChange={handleTextChange}
                      />
                    </div>
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
                      Publish
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default UpdateProfile;
