const axios = require("axios");

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

module.exports = { uploadAudioToAssemblyAI };

