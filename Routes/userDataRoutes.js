const { Router } = require("express");
const { UserModel } = require("../models/UserModel");

const userDataRoutes = Router();

userDataRoutes.get("/get", async (req, res) => {
  try {
    const userData = await UserModel.find();
    return res.status(200).json(userData);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "An error occurred while fetching user data" });
  }
});

userDataRoutes.post("/add", async (req, res) => {
  const { name, education, skills, gender, phone, email } = req.body;

  try {
    const existingData = await UserModel.findOne({ email });

    if (existingData) {
      return res.status(409).json({ error: "User exist with this email" });
    }

    const newUser = new UserModel(req.body);
    await newUser.save();
    return res.status(201).json({ message: "User added successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Failed to add User" });
  }
});

module.exports = userDataRoutes;
