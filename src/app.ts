import express from "express";
import path from "path";
import { apiRouter } from "./routes/api";

export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.use(apiRouter);

// Error handling
//app.all("*", errorRoute);