/** @format */

import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import CardPost from "../../components/CardPost/CardPost";
import { getPosts } from "../../services/postService";
import "./HomePage.css";

function HomePage(props) {
  const [posts, setPosts] = useState([]);
  const user = props.user;

  useEffect(() => {
    getPosts().then((dbPosts) => {
      if (!dbPosts.success) {
        // console.log("unsuccesful response getting data");
        return;
      }
      setPosts(dbPosts.data.posts);
    });
  }, []);

  return (
    <div className="homePageContainer">
      <Header />
      <div className="container-text">
        <p className="title-individual-blogs">Users BLOG.</p>
        <p className="subtitle-individual-blogs">
          Have you found what you are looking for?
        </p>
      </div>
      <div className="individual-posts">
        {/* {posts.map((post) => (
          <CardPost key={post._id} post={post} />
        ))} */}
        {posts.length === 0 ? (
          <h3 className="h3text">Please write a post 🌻</h3>
        ) : (
          posts.map((post) => (
            <CardPost key={post._id} post={post} user={user} />
          ))
        )}
      </div>
      <div className="calltoactionTitle">
        <h2 className="calltoaction">
          "Plants have different needs, and react to sunlight, water, and
          fertilizer in a variety of ways. Learn about their needs, and you
          might be able to stop the damage in time."
        </h2>
      </div>
    </div>
  );
}
export default HomePage;
