import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
export default function Nav({
  searchQuery,
  searchField,
  setSearchQuery,
  searchHandler, }) {

  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.clear();
    navigate("/");
  };
  
  function onSearchChange(e) {
    setSearchQuery(e.target.value);
    console.log(searchQuery);
  }
  return (
    <>
      <div className="container">
        <nav className="navbar navbar-expand-lg " data-bs-theme="dark" style={{ borderRadius: '0 0 15px 15px ', backdropFilter: 'blur(1000px)', position: 'relative', zIndex: 1 }}>
          <div className="container-fluid">
            <label className="navbar-brand"><strong>SpiceSafari</strong></label>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item " >
                  <Link className="nav-link active" aria-current="page" to="/favourite">Favourite</Link>
                </li>
                <li className="nav-item dropdown">
                  <Link to="" className="nav-link dropdown-toggle active"  role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Dropdown
                  </Link>
                  <ul className="nav-item dropdown-menu">
                    <li><Link className="dropdown-item" aria-current="page" to="/addRecipe">Add Recipe</Link></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><Link className="dropdown-item" to="/editRecipe" >Edit Recipe</Link></li>
                  </ul>
                </li>
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/" onClick={logout}>Logout</Link>
                </li>
              </ul>
              <form className="d-flex" role="search" onSubmit={searchHandler}>
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  ref={searchField}
                  value={searchQuery}
                  onChange={onSearchChange}
                  required
                />
                <button className="btn btn-success" type="submit" >Search</button>
              </form>
            </div>
          </div>
        </nav>
      </div>

    </>
  );
}



