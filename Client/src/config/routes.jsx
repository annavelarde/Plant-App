import HomePage from "../pages/HomePage/HomePage.jsx";
import Signup from "../pages/Signup/Signup.jsx";
import LogIn from "../pages/LogIn/LogIn.jsx";
import Profile from "../pages/Profile/Profile.jsx";
import CreatePost from "../pages/CreatePost/CreatePost.jsx";
import * as PATHS from "../utils/paths";
import { Navigate } from "react-router-dom";
import UpdateProfile from "../pages/UpdateProfile/UpdateProfile.jsx";
import SinglePost from "../pages/SinglePost/SinglePost.jsx";
import UpdateSinglePost from "../pages/UpdateSinglePost/UpdateSinglePost.jsx";

const routes = (props) => {
  const { user } = props;
  // console.log(" 👉 👉 / routes / props", props);

  return [
    {
      path: PATHS.HOME_PAGE,
      element: <HomePage {...props} />,
    },
    {
      path: PATHS.SIGNUP_PAGE,
      element: <Signup {...props} />,
    },
    {
      path: PATHS.LOGIN_PAGE,
      element: <LogIn {...props} />,
    },
    {
      path: PATHS.SINGLE_POST_PAGE,
      element: <SinglePost {...props} />,
    },
    //////////PROTECTED PATHS/////////////////////////////////////////////////

    {
      path: PATHS.CREATE_POST_PAGE,
      element: user ? (
        <CreatePost {...props} />
      ) : (
        <Navigate to={PATHS.LOGIN_PAGE} replace />
      ),
    },
    {
      path: PATHS.USER_PROFILE,
      element: user ? (
        <Profile {...props} />
      ) : (
        <Navigate to={PATHS.LOGIN_PAGE} replace />
      ),
    },
    {
      path: PATHS.EDIT_USER_PROFILE,
      element: user ? (
        <UpdateProfile {...props} />
      ) : (
        <Navigate to={PATHS.LOGIN_PAGE} replace />
      ),
    },
    {
      path: PATHS.SINGLE_POST_PAGE_EDIT,
      element: user ? (
        <UpdateSinglePost {...props} />
      ) : (
        <Navigate to={PATHS.LOGIN_PAGE} replace />
      ),
    },
    {
      path: "*",
      element: <h1>404 This Page NOT EXIST!</h1>,
    },
  ];
};

export default routes;
