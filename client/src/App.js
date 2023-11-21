import React from "react";
import { useEffect, useRef, useState } from "react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import Nav from "./components/MAIN_PAGES/Nav";
import Login from "./components/AUTH_PAGES/Login";
import Register from "./components/AUTH_PAGES/Register";
import Home from "./components/MAIN_PAGES/Home";
import "./App.css"
import Footer from "./components/MAIN_PAGES/Footer";
import AddRecipe from "./components/CRUD_PAGES/AddRecipe";
import Recipes from "./components/CRUD_PAGES/Recipes";
import EditRecipes from "./components/CRUD_PAGES/EditRecipes";
import ViewRecipe from "./components/CRUD_PAGES/ViewRecipe";
import UpdateRecipe from "./components/CRUD_PAGES/UpdateRecipie";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

function App() {
  const [_, setCookies] = useCookies(["access_token"]);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");


  const [searchQuery, setSearchQuery] = useState("");
  const [recipes, setRecipes] = useState([]);

  const navigator = useNavigate();
  const searchField = useRef(null);

  useEffect(() => {
    if (window.localStorage.getItem("userID")) {
      navigator("/home");
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post("https://spicesafari.onrender.com/login", { username, password });
      setCookies("access_token", result.data.token);
      window.localStorage.setItem("userID", result.data.userID);
      navigator("/home");
    } catch (error) {
      toast.error('Incorrect Credentials', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      console.log(error);
    }
  };


  const searchHandler = (e) => {
    e.preventDefault();
    getData(searchQuery);
    navigator("/home");
    setRecipes([]);
  }

  const getData = async (e) => {
    try {
      const res = await fetch(
        `https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchQuery}`
      );
      if (!res.ok) throw new Error("Something went wrong!");
      const data = await res.json();
      if (data.results === 0) throw new Error("No recipe found!");
      setRecipes(data?.data?.recipes);
      console.log(recipes)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div>
        {window.localStorage.getItem("userID") && <Nav handleLogin={handleLogin} searchField={searchField} searchQuery={searchQuery} setSearchQuery={setSearchQuery} searchHandler={searchHandler} />}
        <Routes>
          <Route path="/" element={<Login handleLogin={handleLogin} searchField={searchField} setUsername={setUsername} setPassword={setPassword} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/addRecipe" element={<AddRecipe username={username} navigator={navigator} />} />
          <Route path="/editRecipe" element={<EditRecipes />} />
          <Route path="/editRecipe/:id" element={<UpdateRecipe username={username} navigator={navigator} />} />
          <Route path="/home" element={<Home recipes={recipes} />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/recipes/:id" element={<ViewRecipe />} />
        </Routes>
        <ToastContainer />
      </div>
      <Footer />

    </>

  );
}

export default App;
