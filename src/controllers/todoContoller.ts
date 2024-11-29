import { Response, Request } from "express";
import { create, edit, getAll, remove } from "../models/todo";

export const addTodo = async (req: Request, res: Response) => {
  try {
    const { description } = req.body;
    if (!description || description === "") {
      res.status(400).json({
        status: "error",
        message: "Description is required",
        data: null,
      });
      return;
    }

    await create(description);

    res.status(200).json({
      status: "ok",
      message: "Todo created",
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
      data: null,
    });
  }
};

export const getTodo = async (req: Request, res: Response) => {
  try {
    const data = await getAll();
    res.render("../views/index.ejs", { todos: data.rows });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
      data: null,
    });
  }
};

export const deleteTodo = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    if (!id) {
      res.status(400).json({
        status: "error",
        message: "Id is required",
        data: null,
      });
    }

    await remove(Number(id));
    
    res.status(200).json({
      status: "ok",
      message: "Todo deleted",
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
      data: null,
    });
  }
};

export const updateTodo = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { description, completed } = req.body;
  try {
    if (!id) {
      res.status(400).json({
        status: "error",
        message: "Id is required",
        data: null,
      });
    }
    if (!description) {
      res.status(400).json({
        status: "error",
        message: "Description is required",
        data: null,
      });
    }
    if (typeof completed !== "boolean") {
      return res.status(400).json({
        status: "error",
        message: "Completed must be a boolean",
        data: null,
      });
    }

    await edit(description, completed, Number(id));
  
    res.status(200).json({
      status: "ok",
      message: "Todo updated",
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
      data: null,
    });
  }
};
