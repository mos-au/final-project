import React from "react";
import "./Header.css";
import { Link, useSearchParams } from "react-router-dom";

const Header = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  return (
    <header>
      <div>
        <Link to={"/"}>NatureGram</Link>
        <div className="search-input-wrapper">
          <input
            type="text"
            placeholder="Search here..."
            onChange={(e) => {
              setSearchParams({ title: e.target.value });
            }}
          />
        </div>
        <div className="button-container">
          <Link to={"/createNew"}>Create New</Link>
          <Link to={"/about"}>About</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
