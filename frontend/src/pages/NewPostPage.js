import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";

// Use the environment variable for the backend URL (Render or local)
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const NewPostPage = () => {
  const { isAuthenticated, user } = useAuth0();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // If not authenticated or email is not verified, show an error message
  if (!isAuthenticated || !user?.email_verified) {
    return (
      <div className="pgbody">
        <p>You must be logged in with a verified email to access this page.</p>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      name: title.toLowerCase().replace(/\s+/g, "-"), // Slug-friendly
      title,
      content: [content],
    };
  
    try {
      // Use the API_URL environment variable for the request
      const response = await fetch(`${API_URL}/api/articles`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPost),
      });
  
      if (!response.ok) {
        throw new Error("Failed to submit post");
      }
  
      alert("Post submitted successfully!");
      setTitle("");
      setContent("");
    } catch (error) {
      console.error("Error submitting post:", error);
      alert("There was an error submitting your post.");
    }
  };

  return (
    <div className="pgbody">
      <h1>Create a New Post</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Post Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <textarea
          placeholder="Post Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default NewPostPage;
