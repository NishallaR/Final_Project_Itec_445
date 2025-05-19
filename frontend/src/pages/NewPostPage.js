// NewPostPage.js
import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";

const NewPostPage = () => {
  const { isAuthenticated, user } = useAuth0();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

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
      name: title.toLowerCase().replace(/\s+/g, "-"), // slug-friendly
      title,
      content: [content],
    };
  
    try {
      const response = await fetch("http://localhost:5000/api/articles", {
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
