import React, { useEffect, useState } from "react";
import "./PostList.css";

const PostList = () => {
  const [posts, setposts] = useState([]);
  const [page, setPage] = useState(1);
  const [loadIsFinished, setloadIsFinished] = useState(false);

  useEffect(() => {
    getPosts();
  }, [page]);

  const getPosts = async () => {
    const response = await fetch("http://localhost:5000/posts/" + page);
    const newPosts = await response.json();

    if (!newPosts || newPosts.length <= 0) {
      setloadIsFinished(true);
    }

    const result = [...posts, ...newPosts];

    setTimeout(() => {
      setposts(result);
    }, 2);
  };

  const handleNewPage = () => {
    if (loadIsFinished) return;

    setPage(page + 1);
  };

  if (!posts) {
    return <h1>Loading!!!</h1>;
  }

  return (
    <div className="posts-container">
      <div className="posts">
        {posts.map((post) => (
          <div>{post.title}</div>
        ))}
        <div className="load-more" onMouseEnter={handleNewPage}>
          {loadIsFinished ? "Nothing To Load!" : "Hover To Load More..."}
        </div>
      </div>
    </div>
  );
};

export default PostList;
