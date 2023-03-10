const bcrypt = require("bcrypt");
const connection = require("../config/db");
const { convertQueryStr } = require("../utils/convertQuery");

const getAllUsers = (req, res) => {
  const query = `SELECT * FROM users`;
  connection.query(query, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.status(201).json({ message: "Amjilttai", result });
  });
};

const getUser = (req, res) => {
  const { id } = req.params;
  const query = `SELECT * FROM users WHERE id=${id}`;
  connection.query(query, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.status(201).json({ message: "Amjilttai", result });
  });
};

const createUser = (req, res) => {
  const { name, email, password, phoneNumber } = req.body;
  const salted = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salted);

  const query =
    "INSERT INTO users (id, role, name,email,password, phone_number, profileImg) VALUES(null, null, ?, ?, ?, ?, ?)";
  connection.query(
    query,
    [name, email, hashedPassword, phoneNumber, "url"],
    (err, result) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res
        .status(201)
        .json({ message: "Шинэ хэрэглэгч амжилттай бүртгэгдлээ." });
    }
  );
};

const deleteUser =
  ("/:id",
  async (req, res) => {
    const { id } = req.params;
    connection.query(`DELETE FROM users WHERE id=${id}`, (err, result) => {
      if (err) {
        res.status(400).json({ message: err.message });

        return;
      }
      res.status(200).json({ message: "success" });
    });
  });

const updateUser = (req, res) => {
  const { id } = req.params;
  const updateData = convertQueryStr(req.body);

  const query = `UPDATE users SET ${updateData} WHERE id=${id}`;
  connection.query(query, (err, result) => {
    if (err) {
      res.status(400).JSON({ messege: err.message });
      return;
    }
    res.status(200).json({ messege: "amjilttai", data: result });
  });
};

module.exports = { getAllUsers, getUser, createUser, deleteUser, updateUser };
