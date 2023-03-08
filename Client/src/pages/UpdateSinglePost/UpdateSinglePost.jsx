import React from "react";
import { updateSinglePost, getSinglePost } from "../../services/postService.js";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as PATH from "../../utils/paths";
import "./UpdateSinglePost.css";
import Loading from "../../components/Loading/Loading";

const initialFormData = {
  imageUrl: "",
  title: "",
  description: "",
};

function UpdateSinglePost() {
  const { postId } = useParams();
  // console.log(" 👉 👉 / UpdateSinglePost / useParams:", useParams());
  // console.log(" 👉 👉 / UpdateSinglePost / :", post);

  const [singlePostForm, setSinglePostForm] = useState(initialFormData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [formPicture, setFormPicture] = useState("");
  const { title, imageUrl, description } = singlePostForm;

  const navigate = useNavigate();
  // console.log("description", singlePostForm.description);
  // console.log(" 👉 👉 / UpdateSinglePost / title:", singlePostForm.title);

  useEffect(() => {
    getSinglePost(postId)
      .then((res) => {
        setSinglePostForm(res.data);
      })
      .catch((error) => console.log(error.menssage));
  }, []);

  function handleImageInput(event) {
    // console.log(event.target.files[0]);
    const imageFromInput = event.target.files[0];
    setFormPicture(imageFromInput);
  }

  const handleTextInput = (e) => {
    // console.log("handletextuboyt", e.target.name);
    // console.log(e.target.value);
    const { name, value } = e.target;

    setSinglePostForm({ ...singlePostForm, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(false);
    setIsLoading(true);

    if (!formPicture || !title || !description) {
      setError("Please, check before submitting!");
      setIsLoading(false);
      return;
    }

    const formBody = new FormData();
    // console.log(" 👉 👉 / handleSubmit / formBody:", formBody);
    formBody.append("formPicture", formPicture);
    formBody.append("title", title);
    formBody.append("description", description);
    // console.log("lineeeee 60", formBody);

    updateSinglePost(postId, formBody)
      .then((response) => {
        // console.log(" 👉 👉 / .then / response:", response);
        if (!response.success) {
          return setError(response.data);
        }
        setIsLoading(false);
      })
      .finally(() => {
        navigate(PATH.HOME_PAGE);
      });
  };

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div>
      <img
        height={"350px"}
        src={imageUrl}
        alt={formPicture.name ? formPicture.name : "Upload an Image"}
      />
      <form onSubmit={handleSubmit}>
        <h1>Update your Post</h1>
        {error && <p style={{ color: "teal", fontWeight: "530" }}>{error}</p>}
        <label htmlFor="fileInput">
          <input
            type="file"
            id="fileInput"
            onChange={handleImageInput}
            name="post-image"
          />
        </label>
        <div>
          <b>Post Title:</b>
          <input
            type="text"
            placeholder={title}
            onChange={handleTextInput}
            name="title"
            value={title}
          />{" "}
          <b>Post Description:</b>
          <textarea
            name="description"
            value={description}
            type="text"
            placeholder={description}
            onChange={handleTextInput}
          ></textarea>
        </div>
        <button type="submit" className="primary ghost">
          Publish
        </button>
      </form>
    </div>
  );
}

export default UpdateSinglePost;
