import { Link } from "react-router-dom";
import Nav from "./Nav";
import RecipeCard from "./RecipeCard";

export default function Home({ recipes }) {
    return (
        <>  
        <div className="container">
        <div class="row row-cols-1 row-cols-md-3 g-4 m-5" >
            {recipes.length === 0 ? (
                <div>
                    <p className='text-center'>
                        Nothing to show, please search something!
                    </p>
                </div>
            ) : null}
            {recipes?.length > 0 &&
                recipes.map((recipes) => <RecipeCard recipes={recipes} key={recipes.id} />)}
        </div>
        </div>
        </>
    );
};

;
