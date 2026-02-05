const express = require("express");
const multer = require("multer");
const {
  uploadAudioToAssemblyAI,
  createTranscriptionJob,
} = require("../services/assemblyAI");

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
});

router.post("/upload", (req, res) => {
  upload.single("audio")(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: "File upload failed" });
    }

    if (!req.file) {
      return res.status(400).json({ error: "No audio file uploaded" });
    }

    try {
      const uploadUrl = await uploadAudioToAssemblyAI(req.file.buffer);
      const transcriptId = await createTranscriptionJob(uploadUrl);

      res.json({
        message: "Transcription job created",
        transcriptId: transcriptId,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to create transcription job" });
    }
  });
});

module.exports = router;
