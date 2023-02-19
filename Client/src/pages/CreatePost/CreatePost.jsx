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
      {error && <p style={{ color: "teal", fontWeight: "530" }}>{error}</p>}
      <form method="POST" onSubmit={handleSubmit}>
        <div>
          <h1 className="title-homepage">Create a Post</h1>
        </div>
        <div>
          <label>
            <input type="file" name="post-image" onChange={handleFileInput} />
          </label>
        </div>
        <div>
          <label className="form-label" />
        </div>
        <div>
          <label className="form-label">Title Post*</label>
          <input
            type="text"
            onChange={handleNormalInput}
            placeholder="title"
            name="title"
            value={title}
          />
        </div>
        <div>
          <label>Add text...*</label>
          <textarea
            name="description"
            placeholder="share your thoughts"
            type="text"
            id="inputPost"
            cols="30"
            rows="10"
            onChange={handleNormalInput}
          ></textarea>
        </div>
        {/* <div>
          <img height={"300px"} src={imageUrl} alt="" />
          {error && <p style={{ color: "teal", fontWeight: "530" }}>{error}</p>}
          <input type="file" onChange={handleFileInput} />
        </div> */}
        <div className="btn-group">
          <button className="w-100 btn btn-lg btn-primary mb-3" type="submit">
            Post it
          </button>
          <button className="w-100 btn btn-lg btn-primary mb-3" type="submit">
            Go Back
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreatePost;
