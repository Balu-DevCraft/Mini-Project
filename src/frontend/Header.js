import React from "react";
import "./Header.css";
import "./Login";
import { Link } from "react-router-dom";

function Header() {
  return (
    <>
      <div class="header">
        <Link to="/">
          <a href="#default" class="logo">
            RUSTIQUE
          </a>
        </Link>

        <div class="header-right">
          <Link to="/Login">
            <a class="active" href="">
              LOGIN
            </a>
          </Link>

          <div class="header-right">

          {/* <a href="#contact">Contact</a>
          <a href="#about">About</a> */}
        </div>
      </div>
      </div>
    </>
  );
}
export default Header;
