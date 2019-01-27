import express from "express";
import bodyParser from "body-parser";
import users from "./routes/users.routes";
import posts from "./routes/posts.routes";

import connectToDb from "./db/connect";

connectToDb();

let app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.get("/", (req, res) => res.send("Hello World!"));
app.use("/api", users);
app.use("/api", posts);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`server started - ${port}`);
});
