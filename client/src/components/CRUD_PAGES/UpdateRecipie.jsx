import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useCookies } from "react-cookie";
import { useGetUserID } from '../../hooks/useGetUserID';
import { useNavigate, useParams } from "react-router-dom";
import { getRecipe } from '../../hooks/getRecipe';

const UpdateRecipe = () => {
    const { id } = useParams();
    const [initialRecipe, setinitialRecipe] = useState({
        name: "",
        ingredients: [],
        instructions: "",
        imageUrl: "",
        cookingTime: 0,
    });

    useEffect(() => {
        const fetchRecipeData = async () => {
            try {
                const data = await getRecipe(id);
                setinitialRecipe(data);
            } catch (error) {
                console.log("ERROR : ", error);
            }
        };
        fetchRecipeData();
    }, [id]);

    const handleSubmit = () => {

    }

    const handleIngredientChange = (event, index) => {
        const { value } = event.target;
        const ingredients = [...initialRecipe.ingredients];
        ingredients[index] = value;
        setinitialRecipe({ ...initialRecipe, ingredients });
        console.log(initialRecipe);
    };

    const handleAddIngredient = () => {
        const ingredients = [...initialRecipe.ingredients, ""];
        setinitialRecipe({ ...initialRecipe, ingredients });
    };


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setinitialRecipe((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        console.log(initialRecipe)
    }

    return (
        <div className='container card mt-5' >
            <div className="card-body ">
                <h2 className="text-center mt-4 mb-4">Update Recipe</h2>
                <div className='row'>
                    <div className='col-md-8 border rounded-3'>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="name">Name:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    name="name"
                                    value={initialRecipe.name}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="ingredients">Ingredients: </label>
                                {initialRecipe.ingredients.map((ingredient, index) => (
                                    <div key={index}>
                                        <div className="input-group mb-3">
                                            <span className="input-group-text" id="basic-addon1">{index + 1}</span>
                                            <input
                                                className="form-control"
                                                aria-label="Username" aria-describedby="basic-addon1"
                                                id="formFile"
                                                key={index}
                                                type="text"
                                                name="ingredients"
                                                value={ingredient}
                                                onChange={(event) => handleIngredientChange(event, index)} />
                                        </div>
                                    </div>

                                ))}
                                <button type="button" className="btn btn-outline-secondary m-1" onClick={handleAddIngredient}>
                                    <i className="fa-solid fa-plus"></i>
                                </button>
                            </div>

                            <div className="form-group">
                                <label htmlFor="instructions">Instructions:</label>
                                <textarea
                                    className="form-control"
                                    id="instructions"
                                    name="instructions"
                                    value={initialRecipe.instructions}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="imageURL">Image URL:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="imageUrl"
                                    name="imageUrl"
                                    value={initialRecipe.imageUrl}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="cookingTime">Cooking Time (minutes):</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="cookingTime"
                                    name="cookingTime"
                                    value={initialRecipe.cookingTime}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div class="d-grid gap-2 d-md-flex justify-content-md-end m-2">
                                <a className="btn btn-danger btn-block m-2" to="/">Cancel</a>
                                <button type="submit" className="btn btn-primary btn-block m-2">Submit</button>
                            </div>

                        </form>
                    </div>
                    <div className='col-md-4 '>
                        <img className='rounded-3' src={initialRecipe.imageUrl} alt={initialRecipe.name} style={{ width: "100%", height: "100%" }} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateRecipe;
