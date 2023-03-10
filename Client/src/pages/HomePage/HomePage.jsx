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
        <div>
          <p className="title-individual-blogs">Users BLOG.</p>
          <p className="subtitle-individual-blogs">
            Have you found what you are looking for?{" "}
          </p>
        </div>
      </div>
      <div className="individual-posts">
        {posts.map((post) => (
          <CardPost key={post._id} post={post} />
        ))}
      </div>{" "}
      <p className="subtitle2-individual-blogs">
        You can also send us a message! ✉️
      </p>
    </div>
  );
}
export default HomePage;
