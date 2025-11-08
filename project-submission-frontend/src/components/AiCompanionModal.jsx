import { useState } from "react";
import axios from "axios";
import useDarkMode from "../hooks/useDarkMode";
import { getTheme } from "../utils/themeConfig";

const AiCompanionModal = ({ projectId, onClose }) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const isDark = useDarkMode();
  const theme = getTheme(isDark);

  const AI_URL = import.meta.env.VITE_AI_COMPANION_URL; // e.g. https://ai-companion-service.onrender.com

  const handleAsk = async () => {
    if (!question.trim()) return alert("Please enter a question!");
    setLoading(true);
    setAnswer("");

    try {
      const token = sessionStorage.getItem("token");
      const res = await axios.get(
        `${AI_URL}/api/ai/projects/${projectId}/ask?q=${encodeURIComponent(question)}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setAnswer(res.data.answer || "No response from AI.");
    } catch (err) {
      console.error("AI request failed:", err);
      setAnswer("⚠️ AI service unavailable or token invalid.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div
        className={`rounded-2xl w-full max-w-2xl p-6 shadow-2xl border ${theme.cardBg} ${theme.border}`}
      >
        <h2 className={`text-xl font-semibold mb-3 ${theme.text.primary}`}>
          🤖 AI Companion
        </h2>
        <p className={`mb-4 text-sm ${theme.text.secondary}`}>
          Ask anything about this project — architecture, GitHub repo, evaluation,
          or summary.
        </p>

        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Type your question here..."
          className={`w-full p-3 mb-4 rounded-lg resize-none border ${theme.searchBorder} ${theme.searchBg} ${theme.text.primary} focus:outline-none`}
          rows="3"
        />

        <div className="flex items-center gap-3">
          <button
            onClick={handleAsk}
            disabled={loading}
            className={`px-5 py-2 rounded-lg text-white ${theme.accent} ${theme.accentHover} transition`}
          >
            {loading ? "Thinking..." : "Ask AI"}
          </button>
          <button
            onClick={onClose}
            className={`px-5 py-2 rounded-lg ${theme.button} ${theme.text.secondary} border ${theme.buttonBorder}`}
          >
            Close
          </button>
        </div>

        {answer && (
          <div
            className={`mt-6 p-4 rounded-lg border ${theme.cardBg} ${theme.border}`}
          >
            <h3 className={`text-sm font-medium mb-2 ${theme.text.primary}`}>
              AI Response:
            </h3>
            <p className={`text-sm whitespace-pre-wrap ${theme.text.secondary}`}>
              {answer}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AiCompanionModal;
