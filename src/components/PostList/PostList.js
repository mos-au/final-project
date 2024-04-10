import React, { useEffect, useState } from "react";
import "./PostList.css";
import Post from "../Post/Post";

const PostList = () => {
  const [posts, setposts] = useState([]);
  const [page, setPage] = useState(1);
  const [loadIsFinished, setloadIsFinished] = useState(false);

  useEffect(() => {
    getPosts();
  }, [page]);

  const getPosts = async () => {
    const response = await fetch(
      `http://localhost:5000/posts?_page=${page}&_per_page=5`
    );
    const newPosts = await response.json();
    const { data, last } = newPosts;

    if (!data || data.length <= 0 || page === last) {
      setloadIsFinished(true);
    }

    const result = [...posts, ...data];

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
          <Post key={post.postId} post={post} />
        ))}
        <div className="load-more" onMouseEnter={handleNewPage}>
          {loadIsFinished ? "Nothing To Load!" : "Hover To Load More..."}
        </div>
      </div>
    </div>
  );
};

export default PostList;
