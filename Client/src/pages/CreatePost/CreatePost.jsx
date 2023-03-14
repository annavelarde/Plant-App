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
    <div className="container-createpost">
      <div className="backgroundImagePost">
        <div className="card-content">
          <form method="POST" onSubmit={handleSubmit}>
            <div className="card-components-createpost">
              <h1 className="title-createpost">Create Post</h1>
              <label className="form-label">Title.</label>
              <input
                type="text"
                className="form-label-2"
                onChange={handleNormalInput}
                placeholder="type of plant"
                name="title"
                value={title}
              />
              <label className="form-label">Description.</label>
              <textarea
                className="form-label-3"
                name="description"
                placeholder="comment"
                type="text"
                id="inputPost"
                cols="70"
                rows="6"
                onChange={handleNormalInput}
              ></textarea>{" "}
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
                  <p style={{ color: "pink", fontWeight: "280" }}>{error}</p>
                )}
              </div>
              <div className="btn-group">
                <button className="btn-post-white ghost " type="submit">
                  Publish
                </button>
                <button
                  className="btn-post primary btn btn-secondary mb-4"
                  type="submit"
                >
                  <a href="/">Back</a>
                </button>{" "}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;
