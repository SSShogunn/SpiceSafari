import react from "react";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Rows from "./Rows";

import axios from "axios";

export default function EditRecipes() {
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
            {recipes.length === 0 ? (
                <div>
                    <p className="text-center">No Recipe Added Yet !!!</p>
                </div>
            ) : null}
            <div className="container mt-5" >
                <div className="card">
                    <div className="card-body">
                        <table className="table">
                            <thead className="table-light">
                                <tr>
                                    <th scope="col">Index</th>
                                    <th scope="col">Title</th>
                                    <th scope="col">Date Added</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recipes?.length > 0 &&
                                    recipes.map((recipes, index) => (
                                        <Rows key={recipes._id} index={index + 1} recipes={recipes} />
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

