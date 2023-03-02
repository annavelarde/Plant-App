import { Link } from "react-router-dom";
import { getSinglePost, deleteSinglePost } from "../../services/postService";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as PATHS from "../../utils/paths";
import "./SinglePost.css";

function SinglePost({ post }) {
  // console.log(" 👉 👉 / SinglePost / post", post);

  const { postId } = useParams();
  console.log(" 👉 👉 / SinglePost / postId", postId);

  const [singlePost, setSinglePost] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    getSinglePost(postId)
      .then((res) => {
        console.log(" 👉 👉 / useEffect / res", res.data);
        setSinglePost(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  function handleDeletePost() {
    deleteSinglePost(postId)
      .then((res) => {
        console.log(" 👉 👉 / .then / e", res);
        navigate(PATHS.HOME_PAGE);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  return (
    <div className="cardSinglePost">
      <img
        width="100%"
        className="imageSinglePost"
        src={singlePost.imageUrl}
        alt={`${singlePost.username}picture`}
      />
      <h3>{singlePost.title}</h3>
      <p>{singlePost.description}</p>
      <Link to={`/posts/edit/${postId}`}>
        <button type="button" className="primary btn btn-secondary mb-4">
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
    </div>
  );
}

export default SinglePost;
