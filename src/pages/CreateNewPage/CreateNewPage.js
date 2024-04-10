import { useState } from "react";
import "./CreateNewPage.css";

const CreateNewPage = () => {
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleCreateNew = (e) => {
    e.preventDefault();
    if (!title || !description || !author) {
      setHasError(true);
      return;
    }
    const newPost = {
      profileName: author,
      title,
      description,
      imageUrl: "https://source.unsplash.com/random/640x480?sig=1",
      profileImage: "https://avatars.githubusercontent.com/u/51633191",
      isLiked,
      likes: Math.floor(Math.random() * 9991),
    };
    setHasError(false);
    fetch("http://localhost:5000/posts", {
      method: "POST",
      body: JSON.stringify(newPost),
    });
  };

  return (
    <div className="container">
      {hasError && <div className="error">All fields are required</div>}
      <form>
        <label>
          Author
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </label>
        <label>
          Title
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label>
          Description
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <label>
          Is Liked?
          <input
            type="checkbox"
            value={isLiked}
            onChange={(e) => setIsLiked(e.target.checked)}
          />
        </label>
        <div className="button-wrapper">
          <button onClick={handleCreateNew}>Create New</button>
        </div>
      </form>
    </div>
  );
};

export default CreateNewPage;
