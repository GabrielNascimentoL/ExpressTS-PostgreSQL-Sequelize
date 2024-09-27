import { Request, Response } from "express";
import Note from "../models/Note";

export const create = async (req: Request, res: Response) => {
  const { title, content } = req.body;
  

  try {
    const note = await Note.create({
      title,
      content,
      userId: req.user.id
    });

    res.status(201).json(note);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const index = async (req: Request, res: Response) => {
  try {
    const notes = await Note.findAll();
    res.status(201).json(notes);
  } catch (error) {
    res.status(400).json(error);
  }
};
