const express = require("express");

const {
  getSeatByScreenId,
  createTicket,
} = require("../controllers/ticketToseats");

const router = express.Router();

router.get("/:id", getSeatByScreenId);
router.post("/", createTicket);
module.exports = router;
