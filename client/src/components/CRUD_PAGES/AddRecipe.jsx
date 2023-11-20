import axios from 'axios';
import React, { useState } from 'react';
import { useCookies } from "react-cookie";
import { useGetUserID } from '../../hooks/useGetUserID';
import { useNavigate } from "react-router-dom";

const RecipeForm = ({ username, history }) => {
    const userID = useGetUserID();
    const [cookies, _] = useCookies(["access_token"]);
    const [formData, setformData] = useState({
        name: "",
        ingredients: [],
        instructions: "",
        imageUrl: "",
        cookingTime: 0,
        userOwner: userID,
    });

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setformData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        console.log(formData);
    };

    const handleIngredientChange = (event, index) => {
        const { value } = event.target;
        const ingredients = [...formData.ingredients];
        ingredients[index] = value;
        setformData({ ...formData, ingredients });
        console.log(formData);
    };

    const handleAddIngredient = () => {
        const ingredients = [...formData.ingredients, ""];
        setformData({ ...formData, ingredients });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/addRecipe",
                { ...formData },
                {
                    headers: { authorization: cookies.access_token }
                }
            );
            alert("Recipe added successfully");
            navigate("/favourite");
        } catch (error) {
            console.error(error);
            alert("Recipe not added");
        }
    };

    return (
        <div className='container card mt-5' >
            <div className="card-body">
                <h2 className="text-center mt-4 mb-4">Add Recipe</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="ingredients">Ingredients: </label>
                        {formData.ingredients.map((ingredient, index) => (
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

                    {/* <label htmlFor="ingredients">Ingredients:</label>
                        <textarea
                            className="form-control"
                            id="ingredients"
                            name="ingredients"
                            value={formData.ingredients}
                            onChange={handleInputChange}
                        /> */}

                    <div className="form-group">
                        <label htmlFor="instructions">Instructions:</label>
                        <textarea
                            className="form-control"
                            id="instructions"
                            name="instructions"
                            value={formData.instructions}
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
                            value={formData.imageUrl}
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
                            value={formData.cookingTime}
                            onChange={handleInputChange}
                        />
                    </div>

                    <button type="submit" className="btn btn-primary m-2">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default RecipeForm;
