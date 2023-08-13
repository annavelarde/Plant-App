import { useState } from "react";
import { updateProfileImage, updatingUser } from "../../services/userService";
import "./UpdateProfile.css";

const userForm = {
  username: "",
  email: "",
  password: "",
  country: "",
  imageFile: "",
};

const UpdateProfile = (props) => {
  const { user, setUser } = props;

  const userId = user._id;

  const [infoUser, setInfoUser] = useState(userForm);
  const [chosenPicture, setChosenPicture] = useState("");
  const [inputKey, setInputKey] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  //updating userFromData
  const handleFromSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(false);

    updatingUser(infoUser)
      .then((res) => {
        if (!res.success) {
          setError(res.data);
          setIsLoading(false);
          return;
        }
        setUser(res.data.user);
        setIsLoading(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  //User upload input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfoUser({ ...infoUser, [name]: value });
  };

  //Image upload input
  const handleImageInput = (e) => {
    console.log(e.target.files[0]);
    const imageFromInput = e.target.files[0];
    setChosenPicture(imageFromInput);
  };

  const handleProfilePicture = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(false);

    if (!chosenPicture) {
      setError("Don't forget to update your profile image!");
      setIsLoading(false);
      return;
    }
    const formBody = new FormData();
    formBody.append("imageFile", chosenPicture); //profileImage  comes from index router.post
    formBody.append("userId", userId);
    updateProfileImage(formBody)
      .then((res) => {
        // console.log(response);
        if (!res.success) {
          setError("Something is wrong");
        }
        setUser({ ...user, imageFile: res.data.imageFile });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  if (isLoading) {
    return <Loading />;
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
                src={user.imageFile && user.imageFile}
                alt="User picture"
              />
              <div>
                <form onSubmit={handleFromSubmit} method="POST">
                  <div>
                    <div>
                      <input
                        className="addPicture"
                        key={inputKey}
                        type="file"
                        onChange={handleImageInput}
                      />
                      <button onClick={handleProfilePicture} type="submit">
                        Update Image
                      </button>
                    </div>
                    <div>
                      <p className="style"> Name:</p>
                      <input
                        type="text"
                        name="username"
                        placeholder={user.username}
                        value={infoUser.username}
                        onChange={handleChange}
                      />
                      <p className="style">Email:</p>
                      <input
                        type="text"
                        name="email"
                        placeholder={user.email}
                        value={infoUser.email}
                        onChange={handleChange}
                      />
                      <p className="style">Password:</p>
                      <input
                        type="text"
                        name="password"
                        placeholder="Enter new password"
                        value={infoUser.password}
                        onChange={handleChange}
                      />
                      <p className="style">Country:</p>
                      <input
                        type="text"
                        name="country"
                        placeholder={user.country}
                        value={infoUser.country}
                        onChange={handleChange}
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
                    <button
                      type="submit"
                      className="primary btn btn-secondary mb-4"
                    >
                      Update Profile
                    </button>
                    {error && (
                      <p style={{ color: "teal", fontWeight: "530" }}>
                        {error}
                      </p>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UpdateProfile;
