import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import LoadingComponent from "../../components/Loading/Loading";
import { createPost } from "../../services/postService";
import * as PATHS from "../../utils/paths";
import "./CreatePost.css";

function CreatePost() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    imageUrl: "",
    title: "",
    description: "",
  });
  // console.log("FORM:", form);
  const { imageUrl, title, description } = form;
  const [chosenPicture, setChosenPicture] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  function handleFileInput(event) {
    const uploadedPic = event.target.files[0];
    setChosenPicture(uploadedPic);
  }

  const handleNormalInput = (event) => {
    // console.log(event.target);
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    setError(false);

    if (!chosenPicture || !title || !description) {
      setError("please fill in all the form");
      setIsLoading(false);
      return;
    }

    const formBody = new FormData();
    formBody.append("imageUrl", chosenPicture);
    formBody.append("title", title);
    formBody.append("description", description);
    // console.log(`formBody`, formBody);

    createPost(formBody).then((res) => {
      // console.log("RES:", res);
      if (!res.success) {
        return setError(res.data);
      }
      navigate(PATHS.HOME_PAGE);
    });
  }

  if (isLoading) {
    return <LoadingComponent />;
  }

  return (
    <div className="container">
      <div className="backgroundImagePost">
        {/* <img
        className="backgroundImagePost"
        src="https://d.newsweek.com/en/full/1670967/plants-interior-design-indoor-garden.jpg"
        // src="https://www.friendsoffriends.com/app/uploads/igor-and-judith-of-urban-jungle-bloggers-explain-why-plants-became-so-important-for-our-city-homes/Freunde-von-Freunden-Igor-Josifovic-Judith-de-Graaff-6.jpg"
        // src="/public/images/BI9A2487-1.jpeg"
        alt="background"
      /> */}
        <div className="card_content">
          <form method="POST" onSubmit={handleSubmit}>
            <div className="card-components">
              <h1 className="title-homepage">Create a Post</h1>
              <label className="form-label" />
              <div>
                <div>
                  <label className="form-label">Title:</label>
                  <input
                    type="text"
                    onChange={handleNormalInput}
                    placeholder="Title..."
                    name="title"
                    value={title}
                  />
                </div>
                <div>
                  <label className="form-label">Description:</label>
                  <textarea
                    name="description"
                    placeholder="Comment..."
                    type="text"
                    id="inputPost"
                    cols="70"
                    rows="10"
                    onChange={handleNormalInput}
                  ></textarea>
                </div>
                <label>
                  <input
                    className="choose-file"
                    type="file"
                    name="post-image"
                    onChange={handleFileInput}
                  />
                </label>
                <div className="choose-image">
                  {error && (
                    <p style={{ color: "orange", fontWeight: "780" }}>
                      {error}
                    </p>
                  )}
                </div>
                <div className="btn-group">
                  <button
                    className=" btn-post primary ghost btn btn-secondary mb-4"
                    type="submit"
                  >
                    Post it
                  </button>
                  <button
                    className="btn-post primary btn btn-secondary mb-4"
                    type="submit"
                  >
                    Go Back
                  </button>{" "}
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;
