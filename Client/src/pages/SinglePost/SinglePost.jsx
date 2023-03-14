import { Link } from "react-router-dom";
import { getSinglePost, deleteSinglePost } from "../../services/postService";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as PATHS from "../../utils/paths";
import "./SinglePost.css";

function SinglePost(props) {
  const { postId } = useParams();
  const { user } = props;

  const userId = user._id;
  // console.log(" 👉 👉 / SinglePost / user:", user);
  // console.log(" 👉 👉 / SinglePost / postId", postId);

  const [singlePost, setSinglePost] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    getSinglePost(postId)
      .then((res) => {
        // console.log(" 👉 👉 / useEffect / res", res.data);
        setSinglePost(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  function handleDeletePost() {
    deleteSinglePost(postId)
      .then((res) => {
        // console.log(" 👉 👉 / .then / e", res);
        navigate(PATHS.HOME_PAGE);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  return (
    <div className="cardSinglePost">
      <div className="group">
        <div className="overlay-image">
          <img
            width="100%"
            className="imageSinglePost"
            src={singlePost.imageUrl}
            alt={`${singlePost.username}picture`}
          />
        </div>
        <h3 className="title-singlePost">Title.</h3>
        <p className="text-singlePost">{singlePost.title}</p>
        <h3 className="description-singlePost">Description.</h3>
        <p className="text-singlePost">{singlePost.description}</p>
        <div className="buttons-single">
          {props.user ? (
            <>
              <Link to={`/posts/edit/${postId}`}>
                <button
                  type="button"
                  className="primary btn btn-secondary mb-4"
                >
                  Edit
                </button>
              </Link>
              <Link>
                <button
                  type="button"
                  onClick={handleDeletePost}
                  className="primary ghost"
                >
                  Delete
                </button>
              </Link>
            </>
          ) : (
            <>
              <Link to={`/`}>
                <button
                  type="button"
                  className="primary btn btn-secondary mb-4"
                >
                  Back
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default SinglePost;
