
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from "react";
import axios from "axios";
import RecipiesCard from "./RecipiesCard";

export default function Recipies() {
    const [recipes, setRecipes] = useState([]);
    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await axios.get("https://spicesafari.onrender.com/recipes");
                setRecipes(response.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchRecipes();
    }, []);
    return (
        <>
            <div className="container">
                <div className="row row-cols-1 row-cols-md-3 g-4 m-5" >
                    {recipes.length === 0 ? (
                        <div>
                            <p className='text-center'>
                                Nothing to show, please search something!
                            </p>
                        </div>
                    ) : null}
                    {recipes?.length > 0 &&
                        recipes.map((recipes) => <RecipiesCard recipes={recipes} key={recipes._id} />)}
                </div>
            </div>
            <ToastContainer />
        </>
    );
};

;
