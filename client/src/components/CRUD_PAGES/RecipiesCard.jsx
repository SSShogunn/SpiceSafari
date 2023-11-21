import React from "react";
import { Link } from "react-router-dom";

export default function FavouriteCard({ recipes }) {
  return (
    <>
      <div className="col">
        <div className="card h-100">
          <img style={{ maxHeight: "300px" }} src={recipes.imageUrl} alt={recipes.name} className="card-img-top" />
          <div className="card-body" >
            <h5 className="card-title">{recipes.name}</h5>
          </div>
          <div className="card-footer">
            <small className="text-body-secondary">{recipes.dateAdded}</small>
            <Link to={`/recipes/${recipes._id}`} className="btn btn-outline-primary float-end">View Recipe</Link>
          </div>
        </div>
      </div>
    </>
  );
};
