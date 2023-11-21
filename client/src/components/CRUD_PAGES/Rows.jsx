import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Rows({ index, recipes }) {

    const handleDelete = async () => {
        try {
            axios.delete(`https://spicesafari.onrender.com/editRecipes/${recipes._id}`)
                .then((res) => {
                    if (res.status === 200) {
                        toast.success('Recipe Deleted Successfully', {
                            position: "bottom-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                            });
                        window.location.reload();
                    } else {
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
                <button type="button" className="btn btn-danger m-2" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    <i class="fa-solid fa-trash"></i>
                </button>

                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="exampleModalLabel">Delete this recipe?</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <h4>Title : <em>{recipes.name}</em></h4>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">No</button>
                                <button type="button" class="btn btn-danger" onClick={handleDelete}>Yes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </td>
        </tr>
    );
}


