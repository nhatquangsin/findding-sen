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
app.use("/api", users);
app.use("/api", posts);

app.listen(3000, () => {
  console.log("server started - 3000");
});
