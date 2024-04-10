import React from "react";
import "./Post.css";
import { Link } from "react-router-dom";

const Post = ({ post, fullPage }) => {
  const { postId, title, profileImage, imageUrl, description, profileName } =
    post;

  return (
    <div className={"post " + (fullPage && "larger")}>
      <LinkToPage>
        <div className="post-header">
          <img src={profileImage} alt={profileName} />
          <div className="profile-name">{profileName}</div>
        </div>

        <img className="post-image" src={imageUrl} alt={title} />
      </LinkToPage>
      <div className="post-title">
        <LinkToPage>
          <div className="title">{title}</div>
        </LinkToPage>
      </div>

      <LinkToPage>
        <div className={"post-description " + (fullPage && "showAll")}>
          {description}
        </div>
      </LinkToPage>
    </div>
  );

  function LinkToPage({ children }) {
    if (fullPage) return children;
    return <Link to={"/post/" + postId}>{children}</Link>;
  }
};

export default Post;
