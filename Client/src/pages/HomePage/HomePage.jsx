/** @format */
import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import { getPosts } from "../../services/postService";
import CardPost from "../../components/CardPost/CardPost";
import "./HomePage.css";

function HomePage({ user }) {
  console.log(" 👉 👉 / HomePage / user:", user);
  const [posts, setPosts] = useState([]);
  // console.log(" 👉 👉 / HomePage / posts:", posts);

  useEffect(() => {
    getPosts().then((dbPosts) => {
      if (!dbPosts.success) {
        return console.log(dbPosts.data);
      }
      // console.log("HOMEPAGE POSTs", dbPosts.data);
      setPosts(dbPosts.data.posts);
    });
  }, []);

  return (
    <div className="homePageContainer">
      <Header />
      <h1>Blog Post</h1>
      {posts.map((post) => (
        <CardPost key={post._id} post={post} />
      ))}
    </div>
  );
}
export default HomePage;
