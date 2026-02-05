const axios = require("axios");

// 1️⃣ Upload audio
const uploadAudioToAssemblyAI = async (audioBuffer) => {
  const response = await axios.post(
    "https://api.assemblyai.com/v2/upload",
    audioBuffer,
    {
      headers: {
        authorization: process.env.ASSEMBLYAI_API_KEY,
        "content-type": "application/octet-stream",
      },
    }
  );

  return response.data.upload_url;
};

// 2️⃣ Create transcription job
const createTranscriptionJob = async (uploadUrl) => {
  const response = await axios.post(
    "https://api.assemblyai.com/v2/transcript",
    {
      audio_url: uploadUrl,
    },
    {
      headers: {
        authorization: process.env.ASSEMBLYAI_API_KEY,
        "content-type": "application/json",
      },
    }
  );

  return response.data.id;
};

// 3️⃣ Export AFTER definitions
module.exports = {
  uploadAudioToAssemblyAI,
  createTranscriptionJob,
};
