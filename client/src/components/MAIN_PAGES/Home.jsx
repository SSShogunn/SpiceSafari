import { Link } from "react-router-dom";
import Nav from "./Nav";
import RecipeCard from "../API_PAGES/RecipeCard";
import Quote from "../MAIN_PAGES/Quote";

export default function Favourite({ recipes }) {
  const images = [
    "/img/gallery/img_1.jpg",
    "/img/gallery/img_2.jpg",
    "/img/gallery/img_3.jpg",
    "/img/gallery/img_4.jpg",
    "/img/gallery/img_5.jpg",
    "/img/gallery/img_6.jpg",
    "/img/gallery/img_7.jpg",
    "/img/gallery/img_8.jpg",
    "/img/gallery/img_9.jpg"
  ]
  return (
    <>
      <div className="container">
        {recipes.length === 0 ? (
          <>
          <div className="m-5">
            <div className="section hero">
              <div className="col typography">
                <h1 className="title">What Are We About</h1>
                <p className="info">Elevate your culinary journey with our diverse, free recipes from around the globe. Indulge your taste buds and nourish your soul. Uncover the art of flavor without any cost – your passport to a world of gastronomic bliss awaits. Start your SpiceSafari adventure today!</p>
                <Link className="btn btn-dark " to="/recipes">explore now</Link>
              </div>
              <div className="col gallery">
                {images.map((src, index) => (
                  <img key={index} src={src} />
                ))}
              </div>
            </div>
          </div>
          <div>
            <Quote />
          </div>
          </>
          
        ) : (
          <div className="row row-cols-1 row-cols-md-3 g-4 m-5">
            {recipes.map((recipe) => (
              <RecipeCard recipes={recipe} key={recipe._id} />
            ))}
          </div>
        )
        }
      </div>
    </>
  );
}
