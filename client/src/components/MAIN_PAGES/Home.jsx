import { Link } from "react-router-dom";
import Nav from "./Nav";
import RecipeCard from "../API_PAGES/RecipeCard";

export default function Favourite({ recipes }) {
  return (
    <>  
      <div className="container">
        <div className="row row-cols-1 row-cols-md-3 g-4 m-5">
          {recipes.length === 0 ? (
            <div className="container">
              <p className='text-center' style={{ color: "white" }}>
                Nothing to show, please search something!
              </p>
            </div>
          ) : null}
          {recipes?.length > 0 &&
            recipes.map((recipe) => (
              <RecipeCard recipes={recipe} key={recipe._id} />
            ))}
        </div>
      </div>
    </>
  );
}
