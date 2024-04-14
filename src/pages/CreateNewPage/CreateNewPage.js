import { useState } from "react";
import styles from "./CreateNewPage.module.css";
import { useNavigate } from "react-router-dom";

const CreateNewPage = () => {
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [file, setFile] = useState();
  const [hasError, setHasError] = useState(false);
  const navigate = useNavigate();

  const handleCreateNew = (e) => {
    e.preventDefault();
    if (!title || !description || !author) {
      setHasError(true);
      return;
    }
    setHasError(false);

    const formData = new FormData();
    formData.append("image", file);
    fetch("http://localhost:5000/upload", {
      method: "POST",
      body: formData,
    }).then((res) => {
      const data = res.json().then((data) => {
        const newPost = {
          profileName: author,
          title,
          description,
          imageUrl: data.filename,
          profileImage: "https://avatars.githubusercontent.com/u/51633191",
          isLiked,
          likes: Math.floor(Math.random() * 9991),
        };

        fetch("http://localhost:5000/posts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newPost),
        }).then(() => {
          navigate("/");
        });
      });
    });
  };

  return (
    <div className={styles.container}>
      {hasError && <div className={styles.error}>All fields are required</div>}
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
        <div>
          <label>
            Image
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </label>
        </div>
        <label>
          Is Liked?
          <input
            type="checkbox"
            value={isLiked}
            onChange={(e) => setIsLiked(e.target.checked)}
          />
        </label>
        <div className={styles["button-wrapper"]}>
          <button onClick={handleCreateNew}>Create New</button>
        </div>
      </form>
    </div>
  );
};

export default CreateNewPage;
