import { Response, Request } from "express";
import { pool } from "../db/index";

export const addTodo = async (req: Request, res: Response) => {
  try {
    const { description } = req.body;
    if (!description) {
      res.render("../views/index.ejs", { error: "Description is required" });
      return
    }

    const data = await pool.query(
      `INSERT INTO todo (description) VALUES ($1) RETURNING *;`,
      [description]
    );
    res.redirect("/");
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
    const data = await pool.query(`SELECT * FROM todo;`);
    console.log(data.rows);
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
    const data = await pool.query(
      `DELETE FROM todo WHERE id = $1 RETURNING *;`,
      [id]
    );
    /* res.json({
      status: "ok",
      message: "Todo task deleted",
      data: null,
    }); */
    res.redirect("/");
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
    const data = await pool.query(
      `UPDATE todo SET description = $1, completed = $2 WHERE id = $3 RETURNING *;`,
      [description, completed, id]
    );
    /*  res.json({
      status: "ok",
      message: "Todo task updated",
      data: null,
    }); */
    res.redirect("/");
  } catch (error) {
    res.status(500).json({
      status: "error",
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
      data: null,
    });
  }
};
