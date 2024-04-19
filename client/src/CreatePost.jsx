import axios from "axios";
import React, { useContext, useState } from "react";
import { userContext } from "./App";
import "./Style.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CreatePost() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const user = useContext(userContext);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation (replace with more comprehensive checks)
    if (!title.trim()) {
      toast.error("Please enter a title");
      return;
    }
    if (!description.trim()) {
      toast.error("Please enter a description");
      return;
    }
    if (!file) {
      toast.error("Please select a file");
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("email", user.email);
      formData.append("file", file);

      const response = await axios.post(
        "http://localhost:3001/create",
        formData,
        {
          // Consider adding headers for authorization (if applicable)
          // headers: { 'Authorization': `Bearer ${accessToken}` },
        }
      );

      if (response.data === "Success") {
        toast.success("Post created successfully!"),
          setTimeout(() => {
            window.location.href = "/"; // Redirect after a short delay
          }, 1000); // Adjust the delay (in milliseconds) as needed
      }
    } catch (error) {
      console.error("Error creating post:", error);
      toast.error("An error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  // ... rest of your component's JSX

  return (
    <div className="post_container">
      <div className="post_form">
        <form onSubmit={handleSubmit}>
          <h2>Create Post</h2>
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
            placeholder="Enter Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <input
            type="file"
            className="file"
            placeholder="Select File"
            onChange={(e) => setFile(e.target.files[0])}
          />
          {isLoading ? (
            <button disabled>Loading...</button>
          ) : (
            <button type="submit">Create Post</button>
          )}
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default CreatePost;
