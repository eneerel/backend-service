const { Router } = require("express");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const router = Router();

router.post("/", (req, res) => {
  try {
    const content = fs.readFileSync("categories.json", "utf-8");
    const data = JSON.parse(content);
    const newData = { ...req.body };
    data.categories.push(newData);
    fs.writeFileSync("categories.json", JSON.stringify(data));
    res.status(201).json({ message: "Амжилттай үүсгэлээ.", data: newData });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});

router.get("/", (req, res) => {
  try {
    const categoriesData = fs.readFileSync("categories.json", "utf-8");
    const data = JSON.parse(categoriesData);
    res.status(200).json({ message: "success", data });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});

router.put("/:id", (req, res) => {
  try {
    const categoriesData = fs.readFileSync("categories.json", "utf-8");
    const data = JSON.parse(categoriesData);
    const {id} =req.params
    const findIndex = data.categoriesData.findIndex(
      (el) => el.id === id
    );

    if (findIndex === -1) {
      return res.status(404).json({ message: "not found", data: null });
    }

    data.categoriesData[findIndex] = {
      ...data.categoriesData[findIndex],
      ...req.body,
    };

    fs.writeFileSync("categories.json", JSON.stringify(data));
    res
      .status(200)
      .json({ message: "success", data: data.categoriesData[findIndex] });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});

router.delete("/:id", (req, res) => {
  try {
    const categoriesData = fs.readFileSync("categories.json", "utf-8");
    const data = JSON.parse(categoriesData);
    const {id} = req.params
    const findArr = data.categoriesData.filter((el) => el.id !== id);
    const deletedCategory = data.categoriesData.find(
      (el) => el.id === req.params.id
    );

    if (!(findArr.length > 0)) {
      return res.status(404).json({ message: "not found", data: null });
    }

    data.categoriesData = findArr;

    fs.writeFileSync("categories.json", JSON.stringify(data));
    res.status(200).json({ message: "success", data: deletedCategory });
  } catch (error) {
    return res.status(400).json({ message: err.message });
  }
});
module.exports = router;