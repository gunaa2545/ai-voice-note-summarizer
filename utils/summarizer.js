function summarizeText(text) {
  if (!text || text.length < 30) {
    return text; // short text doesn't need summarization
  }

  // Basic summarization logic (safe & local)
  const sentences = text.split(".").filter(Boolean);

  if (sentences.length === 1) {
    return sentences[0].trim();
  }

  // Take first and last sentence as summary
  return (
    sentences[0].trim() +
    ". " +
    sentences[sentences.length - 1].trim()
  );
}

module.exports = { summarizeText };
