import { useState } from "react";
import { updateProfileImage, updatingUser } from "../../services/userService";
import "./UpdateProfile.css";
import LoadingComponent from "../../components/Loading/Loading";
import { useNavigate, Link } from "react-router-dom";
import * as PATH from "../../utils/paths";

function UpdateProfile(props) {
  const { user, setUser } = props;

  const userId = user._id;

  const userForm = {
    username: "",
    email: "",
    password: "",
    country: "",
    profileImage: "",
  };

  const [editedUser, setEditedUser] = useState(userForm);
  const [chosenPicture, setChosenPicture] = useState("");

  const [inputKey, setInputKey] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  //User upload input
  const handleChangeText = (e) => {
    const { name, value } = e.target;
    setEditedUser({ ...editedUser, [name]: value });
  };

  //Image upload input
  const handleImageInput = (e) => {
    const profileImage = e.target.files[0];
    setChosenPicture(profileImage);
    // console.log("UPDATED-IMAGE--39", imageFile);
  };

  //updating userFromData
  const handleFromSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(false);

    updatingUser(editedUser)
      .then((res) => {
        if (!res.success) {
          setError("An error occurred while updating the user.", res.data);
          console.log("FAILED UPDATING USER", res.data);
          setIsLoading(false);
          return;
        }
        setUser(res.data.user);
        setIsLoading(false);
        navigate(PATH.USER_PROFILE);
      })
      .finally((params) => {
        setIsLoading(false);
      });
    // .catch((error) => {
    //   console.error("Error updating user:", error);
    //   setError("An error occurred while updating the user.");
    //   setIsLoading(false);
    // });
  };

  // const handleProfilePicture = (e) => {
  //   e.preventDefault();
  //   setIsLoading(true);
  //   setError("");

  //   if (!chosenPicture) {
  //     setError("Don't forget to update your profile image!");
  //     setIsLoading(false);
  //     return;
  //   }

  //   const formBody = new FormData();
  //   formBody.append("imageFile", chosenPicture);
  //   formBody.append("userId", userId);

  //   console.log("FormBody 74", formBody);

  //   updateProfileImage(formBody)
  //     .then((res) => {
  //       console.log(res);
  //       if (!res.success) {
  //         setError("Something went wrong while updating the profile image.");
  //       } else {
  //         setUser({ ...user, imageFile: res.data.imageFile }); // Update the user's profileImage
  //         navigate(PATH.HOME_PAGE);
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("[update-profile] - request failed", error);
  //       setError("An error occurred while updating the profile image.");
  //     })
  //     .finally(() => {
  //       setIsLoading(false);
  //     });
  // };

  const handleProfilePicture = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (!chosenPicture) {
      setError("Don't forget to update your profile image!");
      setIsLoading(false);
      return;
    }

    const formBody = new FormData();
    formBody.append("profileImage", chosenPicture);
    formBody.append("userId", userId);

    // const response = await updateProfileImage(formBody);
    updateProfileImage(formBody)
      .then((response) => {
        console.log("CLIENT-UPDATEDUSER-OK", response);
        if (!response.success) {
          setError("The Updated NEWUSER body failed!");
        }
        setUser({ ...user, profileImage: response.data.profileImage });
        navigate(PATH.USER_PROFILE);
      })
      .finally(() => {
        setIsLoading(false);
      });

    //   if (response.success) {
    //     setUser({ ...user, imageFile: response.imageFile }); // Update the user's profileImage
    //     navigate(PATH.USER_PROFILE);
    //   } else {
    //     setError("Something went wrong while updating the profile image.");
    //   }
    // } catch (error) {
    //   console.error("[update-profile] - request failed", error);
    //   setError("An error occurred while updating the profile image.");
    // } finally {
    //   setIsLoading(false);
    // }
  };

  if (isLoading) {
    return <LoadingComponent />;
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
                src={
                  user.profileImage
                    ? user.profileImage
                    : "/images/Profile-PNG-Pic.png"
                }
                alt={"User picture"}
              />
              <div>
                <form onSubmit={handleFromSubmit}>
                  <div>
                    <input
                      className="addPicture"
                      key={inputKey}
                      type="file"
                      onChange={handleImageInput}
                    />
                    <button type="submit" onClick={handleProfilePicture}>
                      Update Image
                    </button>
                  </div>
                  <div>
                    <p className="style"> Name:</p>
                    <input
                      type="text"
                      name="username"
                      placeholder={user.username}
                      value={editedUser.username}
                      onChange={handleChangeText}
                    />
                    <p className="style">Email:</p>
                    <input
                      type="text"
                      name="email"
                      placeholder={user.email}
                      value={editedUser.email}
                      onChange={handleChangeText}
                    />
                    <p className="style">Password:</p>
                    <input
                      type="text"
                      name="password"
                      placeholder="Enter new password"
                      value={editedUser.password}
                      onChange={handleChangeText}
                    />
                    <p className="style">Country:</p>
                    <input
                      type="text"
                      name="country"
                      placeholder={user.country}
                      value={editedUser.country}
                      onChange={handleChangeText}
                    />
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
                      Update
                    </button>
                    <Link to={`/profile`}>
                      <button type="button" className="primary ghost">
                        Back
                      </button>
                    </Link>
                  </div>
                </form>
                {error && (
                  <p style={{ color: "teal", fontWeight: "530" }}>{error}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default UpdateProfile;
