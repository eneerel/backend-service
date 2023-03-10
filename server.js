const express = require("express");
const cors = require("cors");
const usersRoute = require("./routes/users");
const categoriesRoute = require("./routes/categories");
const travelRoute = require("./routes/travel");
const logger = require("./utils/logger");

const port = 8000;
const server = express();

server.use(cors());
server.use(express.json());

server.use(logger);

server.use("/api/users", usersRoute);
server.use("/api/categories", categoriesRoute);
server.use("/api/travel", travelRoute);

server.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
