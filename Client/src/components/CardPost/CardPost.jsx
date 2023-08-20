import React from "react";
import "./CardPost.css";
import { Link } from "react-router-dom";

export default function CardPost({ post, user }) {
  // console.log(" 👉 👉 / CardPost / post:", post);
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
        <h5 className="titlepostcard">{post.title}</h5>
        <h5 className="userpostcard">
          username: {user.username} <br />
          {post.createdAt}
        </h5>
        <div className="link">
          <Link to={`posts/${post._id}`} className="authLink">
            <button className="b">View More</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
