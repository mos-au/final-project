import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <div>
        <Link to={"/"}>NatureGram</Link>
        <div>
          <Link to={"/"}>Create New</Link>|<Link to={"/"}>About</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
