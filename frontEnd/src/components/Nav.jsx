import React, { useState } from "react";
export default function Nav({
  searchQuery,
  searchField,
  setSearchQuery,
  searchHandler, }) {

  function onSearchChange(e) {
    setSearchQuery(e.target.value);
    console.log(searchQuery);
  }
  return (
    <><div className="container">
      <nav className="navbar navbar-expand-lg  border-body">
        <div className="container">
          <a className="navbar-brand"><strong>SpiceSafari</strong></a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/home">Favourite</a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/addRecipe">Add Recipe</a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">Logout</a>
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





// const searchHandler = async (e) => {
//   e.preventDefault();
//   try {
//     const res = await fetch(
//       `https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchQuery}`
//     );
//     if (!res.ok) throw new Error("Something went wrong!");
//     const data = await res.json();
//     if (data.results === 0) throw new Error("No recipe found!");
//     setRecipes(data?.data?.recipes);
//     console.log(recipes)
//   } catch (error) {
//     console.log(error);
//   }
// };