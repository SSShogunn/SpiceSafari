import express, { json, urlencoded } from "express";
import cors from "cors";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { collection } from "./models/Users.js";
import { RecipesModel } from "./models/Recipies.js";


const app = express();
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cors());

mongoose
  .connect("mongodb+srv://amanabhaysingh:HRsAgplWExbO6Xbs@cluster0.0cuiq01.mongodb.net/?retryWrites=true&w=majority")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", cors(), (req, res) => { });

app.post("/", async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await collection.findOne({ username: username });
    if (result) {
      res.json("exists");
    } else {
      res.json("does not exist");
    }
  } catch (error) {
    res.json(error);
  }
});

app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const data = {
    username: username,
    email: email,
    password: hashedPassword,
  }
  try {
    const result = await collection.findOne({ username: username });
    if (result) {
      res.json("exists");
    } else {
      res.json("does not exist");
      await collection.insertMany(data);
    }
  } catch (error) {

  }
});

app.post("/addRecipe", async (req, res) => {
  const recipe = new RecipesModel({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    ingredients: req.body.ingredients,
    instructions: req.body.instructions,
    imageUrl: req.body.imageUrl,
    cookingTime: req.body.cookingTime,
    userOwner: req.body.userOwner,
  });
  console.log(recipe);
  try {
    const result = await recipe.save();
    res.status(201).json({
      createdRecipe: {
        name: result.name,
        image: result.image,
        ingredients: result.ingredients,
        instructions: result.instructions,
        _id: result._id,
      },
    });
  } catch (error) {
    res.status(500).json(err);
  }
});

app.listen(5000, () => console.log("Server started"));



