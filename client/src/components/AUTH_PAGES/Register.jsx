import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log(username, email, password);

      await axios.post("https://spicesafari.onrender.com/register", {
          username,
          email,
          password,
        })
        .then((res) => {
          if (res.data === "exists") {
            toast.error('User exists', {
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              });
            console.log("User exists");
          } else {
            toast.success('Registered Successfully', {
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              });
            navigate("/");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="card-body register-container">
        <div className="card">
          <h2 className="text-center mb-4">Register</h2>
          <form>
            <div className="form-group m-3">
              <label htmlFor="newUsername" className="form-label">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                id="newUsername"
                placeholder="Enter your new username"
                required
                onChange={(e) => {
                  setUsername(e.target.value);
                  console.log(username);
                }}
              />
            </div>
            <div className="form-group m-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter your email"
                required
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div className="form-group m-3">
              <label htmlFor="newPassword" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="newPassword"
                placeholder="Enter your new password"
                required
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <div className="mb-3 text-center">
              <button onClick={handleSubmit} className="btn btn-success">
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
