import "./Profile.css";
import Loading from "../../components/Loading/Loading";
import { useState } from "react";
import { deleteUser } from "../../services/userService";
import * as PATHS from "../../utils/paths";
import { useNavigate, Link } from "react-router-dom";

export default function Profile(props) {
  const { user, setUser } = props;

  // console.log(" 👉 👉 / Profile / setUser:", setUser);
  console.log(" 👉 👉 / Profile / userID:", user._id);
  const [error, setError] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  function handleDeleteUser(event) {
    event.preventDefault();
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your profile?"
    );
    if (confirmDelete) {
      setIsLoading(true);
      deleteUser(user._id)
        .then((res) => {
          if (res.success) {
            // Profile deleted successfully
            setUser(null); // Clear the user data
            navigate(PATHS.HOME_PAGE);
            // window.location.reload();
          } else {
            setError(res.data);
          }
        })
        .catch((error) => {
          setError("An error occurred while deleting the profile.", error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }

  if (isLoading) {
    return <Loading />;
  }

  // const deleteAlert = () => {
  //   const confirmDelete = window.confirm(
  //     "⚠️ Are you sure you want to delete your session?"
  //   );
  //   if (confirmDelete) {
  //     handleDeleteUser();
  //   }
  // };

  return (
    <div className="profile-page">
      <div className="card-container">
        <img
          className="round"
          // width="35%"
          // height="auto"
          src={
            isLoading
              ? "https://www.vuescript.com/wp-content/uploads/2018/11/Show-Loader-During-Image-Loading-vue-load-image.png"
              : user.profileImage
          }
          alt="User photo profile"
        />
        <h3 className="user">
          {user.username} | {user.country}
        </h3>
        <h3 className="email">{user.email}</h3>
        <h3 className="job">Full Stack developer</h3>
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
          {/* <button className="primary btn btn-secondary mb-4">
            <a href="/profile/edit">Edit Profile</a>
          </button> */}
          <Link to="/profile/edit">
            <button className="primary btn btn-secondary mb-4">Edit</button>
          </Link>
          <Link>
            {props.user._id && (
              <button
                className="primary ghost btn btn-secondary mb-4"
                type="delete"
                onClick={handleDeleteUser}
              >
                Delete
              </button>
            )}
          </Link>
        </div>
      </div>
    </div>
  );
}
