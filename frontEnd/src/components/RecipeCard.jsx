import React from "react";
import { Link } from "react-router-dom";

export default function RecipeCard({ recipes }) {
  return (
    <>
      <div className="col">
        <div className="card h-100">
          <img style={{ maxHeight: "200px" }} src={recipes.image_url} alt={recipes.title} className="card-img-top" />
          <div className="card-body" >
            <h5 className="card-title">{recipes.title}</h5>
            <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
          </div>
          <div className="card-footer">
            <small className="text-body-secondary">{recipes.publisher}</small>
            <Link to={`/recipe/${recipes.id}`} className="btn btn-outline-primary float-end">View Recipe</Link>
          </div>
        </div>
      </div>
    </>
  );
};
