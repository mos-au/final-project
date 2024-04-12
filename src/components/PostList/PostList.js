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
      query ? `title=${query}&` : ""
    }_page=${page}&_per_page=5`;
    setPage(page);
    const response = await fetch(url);
    const newPosts = await response.json();
    const { data, last } = newPosts;

    if (!data || data.length <= 0 || page === last) {
      setloadIsFinished(true);
    }

    const result = reload ? data : [...posts, ...data];

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
