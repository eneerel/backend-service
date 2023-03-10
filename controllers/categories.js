const fs = require("fs");
const { get } = require("http");
const { v4: uuidv4 } = require("uuid");
const connection = require("../config/db");
const { convertQueryStr } = require("../utils/convertQuery");

const filePath = "./data/categories.json";

const getCategory = (req, res) => {
  const query = `SELECT * FROM category`;
  connection.query(query, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.status(201).json({ message: "Amjilttai", result });
  });
};
const createCategory = (req, res) => {
  const { title, image, description, agent_id } = req.body;
  const query = `INSERT INTO category (id,title, image,description,agent_id) VALUES(null,?,?,?,?)`;
  connection.query(
    query,
    [title, image, description, agent_id],
    (err, resullt) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.status(201).json({ message: "Aмжилттай бүртгэгдлээ." });
    }
  );
};

const deleteCategory = (req, res) => {
  const { id } = req.params;
  const query = `DELETE FROM category WHERE id=${id}`;
  connection.query(query, (err, result) => {
    if (err) {
      res.status(400).json({ message: err.message });
      return;
    }
    res.status(200).json({ message: "amjilttai" });
  });
};
const updateCategory = (req, res) => {
  const { id } = req.params;
  const updateData = convertQueryStr(req.body);
  const query = `UPDATE category SET ${updateData} WHERE id=${id}`;
  connection.query(query, (err, result) => {
    if (err) {
      res.status(400).json({ message: err.message });
      return;
    }
    res.status(200).json({ message: "amjilttai", result });
  });
};
// const getCategory =(req, res) => {
//     try {
//       const categoriesData = fs.readFileSync(filePath, "utf-8");
//       const data = JSON.parse(categoriesData);
//       res.status(200).json({ message: "success", data });
//     } catch (err) {
//       return res.status(400).json({ message: err.message });
//     }
//   };
//   const deleteCategory=(req, res) => {
//     try {
//       const categoriesData = fs.readFileSync(filePath, "utf-8");
//       const data = JSON.parse(categoriesData);
//       const {id} = req.params
//       const findArr = data.categoriesData.filter((el) => el.id !== id);
//       const deletedCategory = data.categoriesData.find(
//         (el) => el.id === req.params.id
//       );

//       if (!(findArr.length > 0)) {
//         return res.status(404).json({ message: "not found", data: null });
//       }

//       data.categoriesData = findArr;

//       fs.writeFileSync(filePath, JSON.stringify(data));
//       res.status(200).json({ message: "success", data: deletedCategory });
//     } catch (error) {
//       return res.status(400).json({ message: err.message });
//     }
//   };
//   const createCategory =(req, res) => {
//     try {
//       const content = fs.readFileSync(filePath, "utf-8");
//       const data = JSON.parse(content);
//       const newData = { ...req.body };
//       data.categories.push(newData);
//       fs.writeFileSync(filePath, JSON.stringify(data));
//       res.status(201).json({ message: "Амжилттай үүсгэлээ.", data: newData });
//     } catch (err) {
//       return res.status(400).json({ message: err.message });
//     }
//   };
//   const updateCategory=(req, res) => {
//     try {
//       const categoriesData = fs.readFileSync(filePath, "utf-8");
//       const data = JSON.parse(categoriesData);
//       const {id} =req.params
//       const findIndex = data.categoriesData.findIndex(
//         (el) => el.id === id
//       );

//       if (findIndex === -1) {
//         return res.status(404).json({ message: "not found", data: null });
//       }

//       data.categoriesData[findIndex] = {
//         ...data.categoriesData[findIndex],
//         ...req.body,
//       };

//       fs.writeFileSync(filePath, JSON.stringify(data));
//       res
//         .status(200)
//         .json({ message: "success", data: data.categoriesData[findIndex] });
//     } catch (err) {
//       return res.status(400).json({ message: err.message });
//     }
//   };
module.exports = {
  getCategory,
  deleteCategory,
  createCategory,
  updateCategory,
};
