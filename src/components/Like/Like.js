import React, { useState } from "react";
import "./Like.css";

const Like = (props) => {
  const { size } = props;

  const [isLiked, setIsLiked] = useState(props.isLiked);
  const [likes, setLikes] = useState(props.likes);

  let style = size ? { fontSize: size } : {};

  const handlLike = () => {
    const newIsLiked = !isLiked;
    setIsLiked(newIsLiked);
    setLikes(newIsLiked ? likes + 1 : likes - 1);
  };

  return (
    <div className="likes" style={style}>
      {likes}
      <span onClick={handlLike} className={"heart " + (isLiked ? "red" : "")}>
        ❤
      </span>
    </div>
  );
};

export default Like;
