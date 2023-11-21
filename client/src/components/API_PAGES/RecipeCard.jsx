import React from "react";
import { Link } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";

export default function RecipeCard({ recipes }) {
  const {data : recipe } = useFetch(recipes.id)
  return (
    <>
      <div className="col" >
        <div className="card h-100">
          <img style={{ maxHeight: "200px" }} src={recipes.image_url} alt={recipes.title} className="card-img-top" />
          <div className="card-body" >
            <h5 className="card-title">{recipes.title}</h5>
          </div>
          <div className="card-footer">
            <small className="text-body-secondary">{recipes.publisher}</small>
            <Link to={recipe?.source_url} className="btn btn-outline-primary float-end" target="_blank">View Recipe</Link>
          </div>
        </div>
      </div>
    </>
  );
};
