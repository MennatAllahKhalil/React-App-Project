import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditPost() {
  const [title, setTitle] = useState();
  const [file, setFile] = useState();
  const [description, setDescription] = useState();
  const { id } = useParams();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("file", file);

    axios
      .put(`http://localhost:3001/editpost/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.data === "Success") {
          navigate("/");
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios
      .get("http://localhost:3001/getpostbyid/" + id)
      .then((result) => {
        setTitle(result.data.title);
        setFile(result.data.file);
        setDescription(result.data.description);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="post_container">
      <div className="post_form">
        <form onSubmit={handleSubmit}>
          <h2>Update Post</h2>
          <input
            type="text"
            placeholder="Enter Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            name="desc"
            id="desc"
            cols="30"
            rows="10"
            value={description}
            placeholder="Enter Description"
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>

          <input
            type="file"
            className="file"
            placeholder="Select File"
            onChange={(e) => setFile(e.target.files[0])}
          />

          <button>Update</button>
        </form>
      </div>
    </div>
  );
}

export default EditPost;
