import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import users from "./routes/user.routes";
import posts from "./routes/post.routes";
import likes from "./routes/like.routes";
import upload from "./routes/upload.routes";

import connectToDb from "./db/connect";

connectToDb();

let app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.get("/", (req, res) => res.send("Welcome to finding sen application!"));
app.use("/api", users);
app.use("/api", posts);
app.use("/api", likes);
app.use("/api", upload);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`server started - ${port}`);
});
