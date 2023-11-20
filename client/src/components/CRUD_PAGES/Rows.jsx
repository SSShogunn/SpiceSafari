import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Rows({index, recipes }) {

    const handleDelete = async () => {
        try {
            axios.delete(`http://localhost:5000/recipes/${recipes._id}`)
            .then((res) => {
                if (res.status === 200) {
                    alert("Recipe Deleted Successfully");
                    window.location.reload();
                }else{
                    Promise.reject(new Error("Something went wrong"));
                }
            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <tr key={recipes._id}>
            <th scope="row">{index}</th>
            <td>{recipes.name}</td>
            <td>{recipes.dateAdded}</td>
            <td>
                <Link className="btn btn-primary m-2" to={`/editRecipe/${recipes._id}`}>
                <i class="fa-regular fa-pen-to-square"></i>
                </Link>
                <button className="btn btn-danger m-2" onClick={handleDelete}>
                <i class="fa-solid fa-trash"></i>
                </button>
            </td>
        </tr>
    );
}
