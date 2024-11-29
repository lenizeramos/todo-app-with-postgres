import { Router } from "express";
import { router as router } from "./todoRouter";

export const apiRouter = Router();

const ROUTER = [{ url: "/", router: router }];

ROUTER.forEach(({ url, router }) => {
  apiRouter.use(url, router);
});
