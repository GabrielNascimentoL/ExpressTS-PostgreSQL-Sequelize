import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import Auth from "../models/Auth";

const JWT_SECRET = process.env.JWT_SECRET;

export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const user = await Auth.findOne({ where: { email } });

  if (user) {
    return res.status(400).json({ message: "User already exists" });
  }

  try {
    await Auth.create({
      name,
      email,
      password,
    });

    res.status(201).json({
      name,
      email,
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await Auth.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isPasswordValid = await Auth.validatePassword(password, user.password); // Usando o método do modelo
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user.id }, JWT_SECRET!, {
      expiresIn: "168h",
    });

    res.json({
      user: {
        email,
        name: user.name,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
