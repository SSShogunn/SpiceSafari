import axios from 'axios';
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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

    const handleRemoveIngredient = (index) => {
        const ingredients = [...formData.ingredients];
        ingredients.splice(index, 1);
        setformData({ ...formData, ingredients });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("https://spicesafari.onrender.com/addRecipe",
                { ...formData },
                {
                    headers: { authorization: cookies.access_token }
                }
            );
            toast.success('Recipe Added Successfully', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
            navigate("/recipes");
        } catch (error) {
            console.error(error);
            alert("Recipe not added");
        }
    };

    return (
       <div className='container card mt-5 shadow p-3 mb-5 bg-white rounded'>
           <div className="card-blur"> </div>
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
                        <label htmlFor="ingredients"><strong>Ingredients:</strong> </label>
                        <div className="row">
                            {formData.ingredients.map((ingredient, index) => (
                                <div key={index} className="mb-1 col-md-6">
                                    <div className="input-group">
                                        <span className="input-group-text" id={`basic-addon${index + 1}`}>{index + 1}</span>
                                        <input
                                            className="form-control"
                                            aria-label="Username"
                                            aria-describedby={`basic-addon${index + 1}`}
                                            id={`formFile${index}`}
                                            key={index}
                                            type="text"
                                            name="ingredients"
                                            value={ingredient}
                                            onChange={(event) => handleIngredientChange(event, index)}
                                        />
                                        <button type="button" className="btn btn-outline-danger" onClick={() => handleRemoveIngredient(index)}>
                                            <i className="fa-solid fa-minus"></i>
                                        </button>
                                    </div>
                                </div>
                            ))}
                            <div className="col-md-6">
                                <button type="button" className="btn btn-outline-secondary" onClick={handleAddIngredient}>
                                    <i className="fa-solid fa-plus"></i> Add Ingredient
                                </button>
                            </div>
                        </div>
                    </div>



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
