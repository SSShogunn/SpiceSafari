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
          <div className="card-body">
          <h1 className="card-title text-center"><em>{recipe.name}</em></h1>
            <div className="row">
              <div className="col-sm-4">
                <img className="rounded-2 w-100" src={recipe.imageUrl} alt={recipe.name} />
                <div className="card m-2">
                  <div className="card-body">
                    <label htmlFor="ingredients"><strong>Ingredients:</strong></label>
                    {recipe.ingredients?.map((ingredient, index) => (
                      <p key={index} className="card-text">
                        <strong>{index + 1}.</strong> {ingredient}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
              <div className="col-sm-8">
                <h5 className="text-end">Cooking Time (Minutes): {recipe.cookingTime}</h5>
                <div className="card">
                  <div className="card-body">
                  <label htmlFor="instructions"><strong>Instructions:</strong></label>
                      {recipe.instructions && recipe.instructions.split('.').map((sentence, index) => (
                        <p key={index} className="p-1">
                          <em><strong>Step {index + 1}: </strong></em>{sentence.trim()}<br />
                        </p>
                      ))}
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
