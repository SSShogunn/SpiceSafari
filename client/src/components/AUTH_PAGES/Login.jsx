import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

import axios from "axios";

export default function Login({
    username,
     password,
      setUsername, 
      setPassword, 
      handleLogin}) {

    return (
        <>
            <div className="card-body login-container">
                <div className="card ">
                    <div className="card-header">
                        <h3 className="text-center mb-4">Login</h3>
                        <form  action="POST" onSubmit={handleLogin}>
                            <div className="form-group m-3">
                                <label>Username</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter username"
                                    onChange={(e) => {setUsername(e.target.value)}}
                                    value={username}
                                />
                            </div>
                            <div className="form-group m-3">
                                <label>Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Enter password"
                                    onChange={(e) => {setPassword(e.target.value)}}
                                    value={password}
                                />
                            </div>

                            <div className="d-grid gap-2 m-3">
                                <button type="submit" className="btn btn-primary btn-block" >
                                    Login
                                </button>
                                <Link to="/register" className="btn btn-success btn-block">
                                    Register
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
    // const navigate = useNavigate();

    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     try {
    //         await axios.post("https://spicesafari.onrender.com/",{username, password})
    //         .then((res) => {
    //             if (res.data === "exists") {
    //                 console.log("User exists");
    //                 navigate("/home", {state: {id: username}});
    //             } else {
    //                 alert("User does not exist");
    //             }
    //         }).catch((err) => {
    //             console.log(err);
    //         });
    //     } catch (error) {
    //        console.log(error); 
    //     }
    // };