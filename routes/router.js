import express from "express";
import { getPosts, savePosts } from "../utils/fileHelpers.js";

const router = express.Router();

export default (upload) => {
  router.get("/", (req, res) => {
    const posts = getPosts();
    res.render("index", { posts });
  });

  return router;
};
