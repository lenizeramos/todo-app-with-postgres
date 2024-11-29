import { Router } from "express";
import { addTodo, getTodo, deleteTodo, editTodo} from "../../controllers/todoContoller";

export const router = Router();

router.post("/", addTodo);

router.get("/", getTodo);

router.delete("/:id", deleteTodo);

router.put("/:id", editTodo);
