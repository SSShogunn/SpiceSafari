import { Link } from "react-router-dom";
import Nav from "../MAIN_PAGES/Nav";
import RecipeCard from "../API_PAGES/RecipeCard";
import { useEffect, useState } from "react";
import axios from "axios";
import FavouriteCard from "./FavouriteCard";

export default function Home() {
    const [recipes, setRecipes] = useState([]);
    useEffect(() => {
        const fetchRecipes = async () => {
          try {
            const response = await axios.get("http://localhost:5000/recipes");
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
                recipes.map((recipes) => <FavouriteCard recipes={recipes} key={recipes._id} />)}
        </div>
        </div>
        </>
    );
};

;
