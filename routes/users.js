const { Router } = require("express");
const bcrypt =require("bcrypt")
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const router = Router();

router.get("/", (req, res) => {
  fs.readFile("users.json", "utf-8", (err, data) => {
    if (err) {
      console.log("Файл уншихад алдаа гарлаа. !!!");
      return;
    }
    console.log(data);
    const parsedData = JSON.parse(data);
    res.status(201).json({ users: parsedData.users });
  });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const data = fs.readFileSync("users.json", "utf-8");
  const parsedData = JSON.parse(data);
  const user = parsedData.users.find((el) => el.id === id);
  res.status(200).json({ user });
});
router.post("/signup", (req, res) => {
    const { name, role = "user", email, password } = req.body;
    const data = fs.readFileSync("users.json", "utf-8");
    const parsedData = JSON.parse(data);
    const id = uuidv4();
    const salted = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salted);
    console.log(hashedPassword);
    const newUser = {
      id,
      name,
      role,
      email,
      password: hashedPassword,
    };
    parsedData.users.push(newUser);
    fs.writeFileSync("users.json", JSON.stringify(parsedData));
    res.status(201).json({ message: "Шинэ хэрэглэгчийгн амжилттай бүртгэлээ." });
  });
  router.post("/signin", (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);
    const data = fs.readFileSync("users.json", "utf-8");
    const parsedData = JSON.parse(data);
    const findUser = parsedData.users.find((user) => user.email === email);
    console.log(findUser);
    if (!findUser) {
      return res.status(401).json({ message: "Ийм хэрэглэгч олдсонгүй" });
    }
    const isCheck = bcrypt.compareSync(password, findUser.password);
    if (isCheck) {
      res.status(200).json({ message: "Амжилттай нэвтэрлээ.", user: findUser });
    } else {
      return res
        .status(401)
        .json({ message: "Имэйл эсвэл нууц үг буруу байна ш дээ.", user: null });
    }
  });
  router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const data = fs.readFileSync("users.json", "utf-8");
    const parsedData = JSON.parse(data);
    const findIndex = parsedData.users.findIndex((el) => el.id === id);
    parsedData.users[findIndex].name = name;
    fs.writeFileSync("users.json", JSON.stringify(parsedData));
    res
      .status(201)
      .json({ message: "Шинэ хэрэглэгчийн өгөгдөл амжилттай солигдлоо." });
  });
  router.delete("/:id", (req, res) => {
    const { id } = req.params;
    const data = fs.readFileSync("users.json", "utf-8");
    const parsedData = JSON.parse(data);
    const findIndex = parsedData.users.findIndex((el) => el.id === id);
    parsedData.users.splice(findIndex, 1);
    fs.writeFileSync("users.json", JSON.stringify(parsedData));
    res
      .status(201)
      .json({ message: `${id} тай хэрэглэгч амжилттай устгагдлаа.` });
  });

module.exports = router;
