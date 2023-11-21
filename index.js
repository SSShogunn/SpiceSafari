import jwt from "jsonwebtoken";
import express, { json, urlencoded } from "express";
import cors from "cors";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { collection } from "./models/Users.js";
import { RecipesModel } from "./models/Recipies.js";
import { verifyToken } from "./routes/verifyToken.js";
const PORT = process.env.PORT || 5000;

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

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await collection.findOne({ username });
  if (!user) {
    return res
      .status(400)
      .json({ message: "Username or password is incorrect" });
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res
      .status(400)
      .json({ message: "Username or password is incorrect" });
  }
  const token = jwt.sign({ id: user._id }, "secret");
  res.json({ token, userID: user._id });
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

app.get("/recipes", async (req, res) => {
  try {
    const result = await RecipesModel.find();
    res.json(result);
  } catch (error) {
    console.log(error);
  }
});

app.post("/addRecipe", verifyToken, async (req, res) => {
  const recipe = new RecipesModel({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    ingredients: req.body.ingredients,
    instructions: req.body.instructions,
    imageUrl: req.body.imageUrl,
    cookingTime: req.body.cookingTime,
    userOwner: req.body.userOwner,
  });

  try {

    const result = await recipe.save();

    res.status(201).json({
      createdRecipe: {
        name: result.name,
        ingredients: result.ingredients,
        instructions: result.instructions,
        cookingTime: result.cookingTime,
        dateAdded: result.dateAdded,
        _id: result._id,
      },
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/recipes", async (req, res) => {
  try {
    const result = await RecipesModel.find();
    res.json(result);
  } catch (error) {
    console.log(error);
  }
});

app.get("/editRecipes/:userID", async (req, res) => {
  try {
    const userId = req.params.userID;
    const result = await RecipesModel.find({ userOwner: userId });
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/recipes/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const result = await RecipesModel.findById(id);
    if (result) {
      res.json(result);
    } else {
      res.status(404).json({ error: "Recipe not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.delete("/recipes/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const result = await RecipesModel.findByIdAndDelete(id);

    if (result) {
      res.status(200).json({ message: "Recipe deleted successfully" });
    } else {
      res.status(404).json({ error: "Recipe not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.put("/recipes/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const result = await RecipesModel.findByIdAndUpdate(id, req.body, { new: true });

    if (result) {
      res.status(200).json({ message: "Recipe updated successfully", updatedRecipe: result });
    } else {
      res.status(404).json({ error: "Recipe not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


app.listen(PORT, () => console.log("SERVER STARTED ON http://localhost:"+PORT));



