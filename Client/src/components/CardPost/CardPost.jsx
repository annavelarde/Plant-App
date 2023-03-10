import React from "react";
import "./CardPost.css";
import { Link } from "react-router-dom";

export default function CardPost({ post }) {
  console.log(" 👉 👉 / CardPost / post:", post);
  return (
    <div className="a-box">
      <div className="img-container">
        <div className="img-inner">
          <div className="inner-skew">
            <img src={post.imageUrl} />
          </div>
        </div>
      </div>
      <div className="text-container">
        <div>
          <h4>Title.</h4>
          <p>{post.title}</p>
        </div>
        <div>
          {/* <h4>Description.</h4>
          <p>{post.description}</p> */}
        </div>

        <Link to={`posts/${post._id}`} className="authLink ">
          <button className="primary btn btn-secondary mb-4">View More</button>
        </Link>
      </div>
    </div>
  );
}
