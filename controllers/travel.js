// const fs = require("fs");
// const { v4: uuidv4 } = require("uuid");

// const filePath = "../data/travel.json";

const connection = require("../config/db");
const { convertQueryStr } = require("../utils/convertQuery");

const getAllTravels = (req, res) => {
  const query = `SELECT * FROM travel`;
  connection.query(query, (err, result) => {
    if (err) {
      res.status(400).json({ message: err.message });
      return;
    }
    res.status(200).json({ message: "amjilttai bolcloooooo", result });
  });
};
const getTravel = (req, res) => {
  const { id } = req.params;
  const query = `SELECT * FROM travel WHERE id=${id}`;
  connection.query(query, (err, result) => {
    if (err) {
      res.status(400).json({ message: err.message });
      return;
    }
    res.status(200).json({ message: "amjilttai bolcloooooo", result });
  });
};

const createTravel = (req, res) => {
  const { title, images, detail, price, location, day, cat_id } = req.body;
  const query = `INSERT INTO travel(id,title, images, detail, price, location, day, cat_id) VALUES(null,?,?,?,?,?,?,?)`;
  connection.query(
    query,
    [title, images, detail, price, location, day, cat_id],
    (err, result) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.status(201).json({ message: "амжилттай бүртгэгдлээ" });
    }
  );
};
const deleteTravel = (req, res) => {
  const { id } = req.params;
  const query = `DELETE FROM travel WHERE id=${id}`;
  connection.query(`DELETE FROM users WHERE id=${id}`, (err, result) => {
    if (err) {
      res.status(400).json({ message: err.message });

      return;
    }
    res.status(200).json({ message: "success" });
  });
};
const updateTravel = (req, res) => {
  const { id } = req.params;
  const updateData = convertQueryStr(req.body);
  const query = `UPDATE travel SET ${updateData} WHERE id=${id} `;
  connection.query(query, (err, result) => {
    if (err) {
      res.status(400).JSON({ messege: err.message });
      return;
    }
    res.status(200).json({ messege: "amjilttai", data: result });
  });
};

// const createTravel = (req, res) => {
//   try {
//     const content = fs.readFileSync(filePath, "utf-8");
//     const data = JSON.parse(content);
//     const newData = { ...req.body };
//     data.categories.push(newData);
//     fs.writeFileSync(filePath, JSON.stringify(data));
//     res.status(201).json({ message: "Амжилттай үүсгэлээ.", data: newData });
//   } catch (err) {
//     return res.status(400).json({ message: err.message });
//   }
// };

// const getTravel = (req, res) => {
//   const catId = req.params.id;
//   try {
//     const data = fs.readFileSync(filePath, "utf-8");
//     const parsedData = JSON.parse(data);
//     const findData = parsedData.datas.find((el) => el.id === catId);
//     res.status(200).json({ message: "success", data: findData });
//   } catch (err) {
//     return res.status(400).json({ message: err.message });
//   }
// };

// const getAllTravels = (req, res) => {
//   try {
//     const datas = fs.readFileSync(filePath, "utf-8");
//     const parsedData = JSON.parse(datas);
//     res.status(200).json({ message: "success", data: parsedData.datas });
//   } catch (err) {
//     return res.status(400).json({ message: err.message });
//   }
// };

// const updateTravel = (req, res) => {
//   // try {
//   //   const data = fs.readFileSync(filePath, "utf-8");
//   //   const parsedData = JSON.parse(data);
//   //   const findIndex = parsedData.datas.findIndex(
//   //     (el) => el.id === req.params.id
//   //   );
//   //   if (findIndex === -1) {
//   //     return res.status(404).json({ message: "not found", data: null });
//   //   }
//   //   parsedData.datas[findIndex] = {
//   //     ...parsedData.datas[findIndex],
//   //     ...req.body,
//   //   };
//   //   fs.writeFileSync(filePath, JSON.stringify(data));
//   //   res
//   //     .status(200)
//   //     .json({ message: "success", data: parsedData.datas[findIndex] });
//   // } catch (err) {
//   //   return res.status(400).json({ message: err.message });
//   // }
// };

// const deleteTravel = (req, res) => {
//   try {
//     const data = fs.readFileSync(filePath, "utf-8");

//     const parsedData = JSON.parse(data);
//     console.log("DD", parsedData);
//     const findArr = parsedData.datas.filter((el) => el.id !== req.params.id);
//     const deletedCategory = parsedData.datas.find(
//       (el) => el.id === req.params.id
//     );

//     if (!(findArr.length > 0)) {
//       return res.status(404).json({ message: "not found", data: null });
//     }

//     parsedData.datas = findArr;

//     fs.writeFileSync(filePath, JSON.stringify(parsedData));
//     res.status(200).json({ message: "success", data: deletedCategory });
//   } catch (error) {
//     return res.status(400).json({ message: err.message });
//   }
// };

module.exports = {
  getAllTravels,
  createTravel,
  getTravel,
  updateTravel,
  deleteTravel,
};
