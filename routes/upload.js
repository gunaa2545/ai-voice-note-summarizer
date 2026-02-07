const { summarizeText } = require("../utils/summarizer");
const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { execFile } = require("child_process");

const router = express.Router();

// Ensure uploads folder exists
const uploadDir = path.join(__dirname, "..", "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Multer config: store file on disk
const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

router.post("/upload", upload.single("audio"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No audio file uploaded" });
  }

  const audioPath = req.file.path;
  const pythonScript = path.join(
    __dirname,
    "..",
    "whisper",
    "whisper_service.py"
  );

  execFile(
  "py",
  ["-3.10", pythonScript, audioPath],
  { timeout: 10 * 60 * 1000 }, // 10 minutes (Whisper can be slow)
  (error, stdout, stderr) => {
    // Log stderr but DON'T fail on warnings
    if (stderr) {
      console.warn("Whisper warning:", stderr);
    }

    if (error && !stdout) {
      console.error("Whisper error:", error);
      return res.status(500).json({ error: "Transcription failed" });
    }

    // Cleanup uploaded file
    fs.unlinkSync(audioPath);

    const transcript = stdout.trim();
const summary = summarizeText(transcript);

res.json({
  message: "Transcription completed",
  transcript,
  summary,
});

  }
);

});

module.exports = router;
