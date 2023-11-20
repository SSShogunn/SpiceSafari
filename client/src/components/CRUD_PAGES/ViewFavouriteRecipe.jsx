// ViewRecipe.js
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getRecipe } from "../../hooks/getRecipe";

export default function ViewFavouriteRecipe() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState({});

  useEffect(() => {
    const fetchRecipeData = async () => {
      try {
        const data = await getRecipe(id);
        setRecipe(data);
      } catch (error) {
        console.log("ERROR : ", error);
      }
    };

    fetchRecipeData();
  }, [id]);

  return (
    <>
      <div className="container">
        <div className="card m-5">
          <div className="card-body m-5">
            <img src={recipe.imageUrl} alt={recipe.name} style={{width:"300px", height:"300px"}}/>
            <h5 className="card-title">{recipe.name}</h5>
            <p className="card-text">{recipe.instructions}</p>
            {recipe.ingredients?.map((ingredient, index) => (
              <p key={index} className="card-text">
                {ingredient}
              </p>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
