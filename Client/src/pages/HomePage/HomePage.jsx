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
      <div className="container-text">
        <p className="title-individual-blogs">Users BLOG.</p>
        <p className="subtitle-individual-blogs">
          Have you found what you are looking for?
        </p>
      </div>
      <div className="individual-posts">
        {posts.map((post) => (
          <CardPost key={post._id} post={post} />
        ))}
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
