import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import { validationResult } from "express-validator";
export const register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array()[0].msg });
  }
  const salt = bcryptjs.genSaltSync(10);
  const hash = bcryptjs.hashSync(req.body.password, salt);
  try {
    const newUser = await User.create({ ...req.body, password: hash });
    const { password, isAdmin, ...otherDetails } = newUser.toJSON();
    return res.status(200).json(otherDetails);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array()[0].msg });
  }

  try {
    const user = await User.findOne({ where: { username: req.body.username } });
    if (user) {
      const validity = bcryptjs.compareSync(req.body.password, user.password);
      if (validity) {
        const token = jwt.sign(
          { id: user.id, isAdmin: user.isAdmin },
          process.env.JWT,
          { expiresIn: "5d" }
        );
        const { password, ...otherDetails } = user.toJSON();
        res
          .cookie("access_token", token, {
            httpOnly: true,
          })
          .status(200)
          .json(otherDetails);
      } else {
        return res.status(400).json("Wrong Password");
      }
    } else {
      return res.status(404).json("User Does not Exist");
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};
