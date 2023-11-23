import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { getRecipe } from '../../hooks/getRecipe';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateRecipe = () => {
    const navigate = useNavigate();
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.put(`https://spicesafari.onrender.com/recipe/${id}`, initialRecipe);
            toast.success('Recipe Updated Successfully', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
            navigate("/editRecipe");
        } catch (error) {
            console.error("Error updating recipe:", error);
        }
    };

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

    const handleRemoveIngredient = (index) => {
        const ingredients = [...initialRecipe.ingredients];
        ingredients.splice(index, 1);
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
                                <label htmlFor="name"><strong>Name:</strong></label>
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
                                <label htmlFor="ingredients"><strong>Ingredients:</strong> </label>
                                <div className="row">
                                    {initialRecipe.ingredients.map((ingredient, index) => (
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
                                <label htmlFor="instructions"><strong>Instructions:</strong></label>
                                <textarea
                                    className="form-control"
                                    id="instructions"
                                    name="instructions"
                                    value={initialRecipe.instructions}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="imageURL"><strong>Image URL:</strong></label>
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
                                <label htmlFor="cookingTime"><strong>Cooking Time (minutes):</strong></label>
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
                                <button className="btn btn-danger btn-block m-2" onClick={() => navigate("/editRecipe")}>Cancel</button>
                                <button type="submit" className="btn btn-primary btn-block m-2">Save</button>
                            </div>

                        </form>
                    </div>
                    <div className='col-md-4 p-1 border rounded-3 image-update'>
                        <img className='rounded-3' src={initialRecipe.imageUrl} alt={initialRecipe.name} style={{ width: "100%", height: "100%" }} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateRecipe;
