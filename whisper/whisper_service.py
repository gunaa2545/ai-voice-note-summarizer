import os
import whisper
import sys

# Ensure ffmpeg is available
os.environ["PATH"] += os.pathsep + r"C:\ffmpeg\bin"

def transcribe_audio(audio_path):
    model = whisper.load_model("base")
    result = model.transcribe(audio_path)
    return result["text"]


if __name__ == "__main__":
    audio_file = sys.argv[1]
    text = transcribe_audio(audio_file)
    print(text)
