import fs from "fs";
import { json } from "stream/consumers";
export const getPosts = () => {
  return JSON.parse(fs.readFileSync("posts.json", "utf-8"));
};

export const savePosts = (posts) => {
  fs.writeFileSync("posts.json", JSON.stringify(posts, null, 2));
};
