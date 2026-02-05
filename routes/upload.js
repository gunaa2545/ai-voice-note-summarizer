const express = require("express");
const multer = require("multer");

const router = express.Router();

// store file in memory (we'll process it later)
const upload = multer({ storage: multer.memoryStorage() });

router.post("/upload", upload.single("audio"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No audio file uploaded" });
  }

  res.json({
    message: "Audio file received successfully",
    fileName: req.file.originalname,
    fileSize: req.file.size
  });
});

module.exports = router;
