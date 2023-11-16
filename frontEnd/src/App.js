import React from "react";
import { useEffect, useRef, useState } from "react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import Nav from "./components/Nav";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import "./App.css"
import Footer from "./components/Footer";
import AddRecipe from "./components/AddRecipe";
import axios from "axios";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");


  const [searchQuery, setSearchQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState("");

  const [curentUser, setcurrentUser] = useState(null);

  const location = useLocation();
  const navigator = useNavigate();
  const searchField = useRef(null);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/", { username, password })
        .then((res) => {
          if (res.data === "exists") {
            setcurrentUser(username);
            navigator("/home", { state: { id: username } });

          } else {
            alert("User does not exist");
          }
        }).catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };


  const searchHandler = (e) => {
    e.preventDefault();

    getData(searchQuery);
    navigator("/home", { state: { id: username } });
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

<Nav handleLogin={handleLogin} searchField={searchField} searchQuery={searchQuery} setSearchQuery={setSearchQuery} searchHandler={searchHandler} /> 

        <Routes>
          <Route path="/" element={<Login handleLogin={handleLogin} searchField={searchField} setUsername={setUsername} setPassword={setPassword}/>} />
          <Route path="/register" element={<Register />} />
          <Route path="/addRecipe" element={<AddRecipe username={username} navigator={navigator}/>} />
          <Route path="/home" element={<Home recipes={recipes} />} />
        </Routes>
      </div>
      <Footer />

    </>

  );
}

export default App;
