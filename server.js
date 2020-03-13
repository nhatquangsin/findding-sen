import express from "express";
import bodyParser from "body-parser";
import users from "./routes/users.routes";
import posts from "./routes/posts.routes";
import cors from 'cors';

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

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`server started - ${port}`);
});
