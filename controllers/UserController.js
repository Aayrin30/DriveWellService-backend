import bcrypt from "bcryptjs";
import { User } from "../models/User.js";

//Update the User
export const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findByPk(id);

    if (!user) return res.status(404).json({ error: "User Does not Exist" });

    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    const [updatedRowsCount] = await User.update(req.body, { where: { id } });

    if (updatedRowsCount === 1) {
      const updatedUser = await User.findByPk(id);
      return res.status(200).json(updatedUser);
    } else {
      return res.status(500).json({ error: "Failed to update user" });
    }
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

//Delete the User
export const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findByPk(id);

    if (!user) return res.status(404).json({ error: "User Does not Exist" });
    const deletedRowCount = await User.destroy({ where: { id } });
    if (deletedRowCount === 1) {
      return res.status(200).json("User has been deleted.");
    } else {
      return res.status(500).json({ error: "Failed to delete user" });
    }
  } catch (err) {
    return res.status(500).json(err);
  }
};

//Get the User
export const getUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ error: "User Does not Exist" });
    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json(err);
  }
};

//Get All Users
export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    if (!users)
    return res.status(404).json("No User available");
    res.status(200).json(users);
  } catch (err) {
    return res.status(500).json(err);
  }
};
