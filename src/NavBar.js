import React from "react";
import "./NavBar.css";

/**
 * Navigation bar implementation
 *
 * @author Christopher Lau
 */

//navigation bar to access all parts of the site
function NavBar() {
  return (
          <ul className="nav_ul">
            <li className="nav_li"><a href="/#">Home</a></li>
            <li className="nav_li"><a href="/reviews">Reviews</a></li>
            <li className="nav_li"><a href="/Showings">Showings</a></li>
            <li className="nav_li"><a href="/movies">Movies</a></li>
          </ul>
  );
}

export default NavBar;
