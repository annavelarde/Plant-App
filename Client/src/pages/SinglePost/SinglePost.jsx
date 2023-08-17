import { Link } from "react-router-dom";
import { getSinglePost, deleteSinglePost } from "../../services/postService";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as PATHS from "../../utils/paths";
import "./SinglePost.css";

function SinglePost(props) {
  const { postId } = useParams();
  const { user } = props;

  const userId = user ? user._id : null;
  // console.log(" 👉 👉 / SinglePost / user:", user);
  // console.log(" 👉 👉 / SinglePost / postId", postId);
  // console.log(userId);

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
        if (!res.success) {
          return setError(response.data);
        }
        // console.log(" 👉 👉 / .then / e", res);
        navigate(PATHS.HOME_PAGE);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  const deleteAlert = () => {
    const confirmDelete = window.confirm(
      " ⚠️ Are you sure you want to delete this post?"
    );
    if (confirmDelete) {
      handleDeletePost();
    }
  };

  return (
    <div className="cardSinglePost">
      <div className="group">
        <img
          width="100%"
          className="imageSinglePost"
          src={singlePost.imageUrl}
          alt={`${singlePost.username}picture`}
        />
        <h3 className="title-singlePost">Title.</h3>
        <p className="text-singlePost">{singlePost.title}</p>
        <h3 className="description-singlePost">Description.</h3>
        <p className="text-singlePost">{singlePost.description}</p>
        <div className="buttons-single">
          {props.user &&
          singlePost.author &&
          singlePost.author._id === props.user._id ? (
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
                  onClick={deleteAlert}
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
