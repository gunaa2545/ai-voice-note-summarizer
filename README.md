# 🎙️ AI Voice Note Summarizer

A backend application that transcribes and summarizes voice notes using OpenAI Whisper running locally.  
The project avoids paid APIs and performs speech-to-text and summarization entirely on the local machine.

---

## 🚀 Features

- Upload audio files (MP3 / WAV)
- Speech-to-text transcription using Whisper
- Automatic text summarization
- Fully local processing (no external APIs)
- Node.js and Python integration

---

## 🛠 Tech Stack

- Node.js (Express)
- Python 3.10
- OpenAI Whisper
- FFmpeg
- Multer

---

## 📁 Project Structure
ai-voice-summarizer/
├── routes/
│ └── upload.js # Audio upload API
├── utils/
│ └── summarizer.js # Text summarization logic
├── whisper/
│ └── whisper_service.py # Whisper transcription service
├── uploads/ # Temporary audio storage
├── .env # Environment variables
├── .gitignore
├── package.json
├── package-lock.json
├── server.js # Express server entry point
└── README.md
