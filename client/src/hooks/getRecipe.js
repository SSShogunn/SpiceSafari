// getRecipe.js
import axios from "axios";

export const getRecipe = async (id) => {
  try {
    const res = await axios.get(`https://spicesafari.onrender.com/recipes/${id}`);
    return res.data;
  } catch (error) {
    console.log("ERROR AT GETRECIPE.JS: ", error);
    throw error;
  }
};
