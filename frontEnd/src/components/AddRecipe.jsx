import axios from 'axios';
import React, { useState } from 'react';

const RecipeForm = ({username}) => {

    const [formData, setFormData] = useState({
        name: "",
        ingredients: "",
        instructions: "",
        imageUrl: "",
        cookingTime: 0,
      });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        console.log(formData)
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          await axios.post("http://localhost:5000/addRecipe", formData)  
          alert("Recipe added successfully");
          navigator("/home",{state:{id:username}})   
        } catch (error) {
            console.log(error);
            alert("Recipe not added");
        }
    };

    return (
        <div className='container card' style={{ opacity: "0.9" }}>
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
                    <label htmlFor="ingredients">Ingredients:</label>
                    <textarea
                        className="form-control"
                        id="ingredients"
                        name="ingredients"
                        value={formData.ingredients}
                        onChange={handleInputChange}
                    />
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
                        id="imageURL"
                        name="imageURL"
                        value={formData.imageURL}
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
    );
};

export default RecipeForm;
