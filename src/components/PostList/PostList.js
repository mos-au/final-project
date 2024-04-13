import React, { useEffect, useState } from "react";
import "./PostList.css";
import Post from "../Post/Post";
import { useSearchParams } from "react-router-dom";

const PostList = () => {
  const [posts, setposts] = useState([]);
  const [page, setPage] = useState(1);
  const [loadIsFinished, setloadIsFinished] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("title");
  useEffect(() => {
    setloadIsFinished(false);
    getPosts({ reload: true });
  }, [query]);

  const getPosts = async ({ reload = false, page = 1 }) => {
    let url = `http://localhost:5000/posts?${
      query ? `title_like=${query}&` : ""
    }_page=${page}&_limit=5`;
    setPage(page);
    const response = await fetch(url);
    const newPosts = await response.json();

    for (let i = 1; i < newPosts.length; i++) {
      if (!newPosts[i].imageUrl.startsWith("https")) {
        const res = await fetch(
          `http://localhost:5000/files/${newPosts[i].imageUrl}`
        );
        const data = await res.blob();
        newPosts[i].image = data;
      }
    }
    if (!newPosts || newPosts.length <= 0) {
      setloadIsFinished(true);
    }

    const result = reload ? newPosts : [...posts, ...newPosts];

    setTimeout(() => {
      setposts(result);
    }, 2);
  };

  const handleNewPage = () => {
    if (loadIsFinished) return;
    getPosts({ page: page + 1 });
  };

  if (!posts) {
    return <h1>Loading!!!</h1>;
  }
  return (
    <div className="posts-container">
      <div className="posts">
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
        <div className="load-more" onMouseEnter={handleNewPage}>
          {loadIsFinished ? "Nothing To Load!" : "Hover To Load More..."}
        </div>
      </div>
    </div>
  );
};

export default PostList;
