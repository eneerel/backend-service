const express = require("express");
const cors = require("cors");
const usersRoute = require("./routes/users");
const categoriesRoute = require("./routes/categories");
const logger = require("./utils/logger");
const port = 8000;
const server = express();
server.use(cors());
server.use(express.json());

server.use(logger);

server.use("/users", usersRoute);
server.use("/categories", categoriesRoute);


server.listen(port, () => {
  console.log(`Server is running at ${port}`);
});

