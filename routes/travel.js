const { Router } = require("express");
const {
  getAllTravels,
  createTravel,
  getTravel,
  updateTravel,
  deleteTravel,
} = require("../controllers/travel");

const router = Router();

router.get("/", getAllTravels);
router.post("/", createTravel);
router.get("/:id", getTravel);
router.put("/:id", updateTravel);
router.delete("/:id", deleteTravel);

module.exports = router;
