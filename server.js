const express = require("express");
const cors = require("cors");
const usersRoute = require("./routes/users");
const categoriesRoute = require("./routes/categories");
const logger = require("./utils/logger");
const port = 8000;
const server = express();
const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "azure_db",
});
server.use(cors());
server.use(express.json());

server.use(logger);

server.get("/", async (req, res) => {
  connection.query("SELECT * FROM azure_user", (err, result) => {
    if (err) {
      res.status(400).json({ message: err.message });

      return;
    }
    res.status(200).json({ message: "success", data: result });
  });
});

server.get("/:id", async (req, res) => {
  const { id } = req.params;
  connection.query(
    `SELECT * FROM azure_user WHERE aid=${id}`,
    (err, result) => {
      if (err) {
        res.status(400).json({ message: err.message });

        return;
      }
      res.status(200).json({ message: "success", data: result });
    }
  );
});

server.post("/", async (req, res) => {
  const { id } = req.params;
  connection.query(
    `INSERT INTO azure_user(aid, name ,owog) VALUE("${id}","${req.body.name}","${req.body.owog}")`,
    (err, result) => {
      if (err) {
        res.status(400).json({ message: err.message });

        return;
      }
      res.status(200).json({ message: "success", data: result });
    }
  );
});

server.put("/:id", async (req, res) => {
  const { id } = req.params;
  connection.query(
    `UPDATE  azure_user SET name="${req.body.name}", owog="${req.body.owog}" WHERE aid=${id}`,
    (err, result) => {
      if (err) {
        res.status(400).json({ message: err.message });

        return;
      }
      res.status(200).json({ message: "success", data: result });
    }
  );
});

server.delete("/:id", async (req, res) => {
  const { id } = req.params;
  connection.query(`DELETE FROM azure_user WHERE aid=${id}`, (err, result) => {
    if (err) {
      res.status(400).json({ message: err.message });

      return;
    }
    res.status(200).json({ message: "success", data: result });
  });
});

server.use("/users", usersRoute);
server.use("/categories", categoriesRoute);

server.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
