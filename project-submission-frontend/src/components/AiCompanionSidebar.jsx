import { useState, useEffect } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { motion, AnimatePresence } from "framer-motion";
import useDarkMode from "../hooks/useDarkMode";
import { getTheme } from "../utils/themeConfig";

const AiCompanionSidebar = ({ projectId, onClose }) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [displayedText, setDisplayedText] = useState("");
  const [loading, setLoading] = useState(false);

  const isDark = useDarkMode();
  const theme = getTheme(isDark);
  const AI_URL = import.meta.env.VITE_AI_SERVICE_URL;

  // Typing animation for answer
  useEffect(() => {
    if (!answer) return;
    let i = 0;
    setDisplayedText("");
    const typing = setInterval(() => {
      setDisplayedText(answer.slice(0, i));
      i++;
      if (i > answer.length) clearInterval(typing);
    }, 10);
    return () => clearInterval(typing);
  }, [answer]);

  const handleAsk = async () => {
    if (!question.trim()) return;
    setLoading(true);
    setAnswer("");
    setDisplayedText("");

    try {
      const token = sessionStorage.getItem("token");
      const res = await axios.get(
        `${AI_URL}/api/ai/projects/${projectId}/ask?q=${encodeURIComponent(question)}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const aiText = res.data.answer
        ?.replace(/\\n/g, "\n")
        ?.replace(/\*\*/g, "**")
        ?.trim();
      setAnswer(aiText || "No response from AI.");
    } catch (err) {
      console.error(err);
      setAnswer("⚠️ AI Service unreachable or token invalid.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        key="aiSidebar"
        initial={{ x: "100%", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: "100%", opacity: 0 }}
        transition={{ type: "spring", stiffness: 90, damping: 18 }}
        className={`fixed right-0 top-0 h-full w-full md:w-[430px] z-50 flex flex-col border-l shadow-2xl ${
          theme.cardBg
        } ${theme.border}`}
      >
        {/* Header */}
        <div
          className={`flex justify-between items-center px-5 py-3 border-b ${theme.border}`}
          style={{
            background: isDark
              ? "linear-gradient(90deg, #1e1e2f, #2c2c54)"
              : "linear-gradient(90deg, #e5ecff, #ffffff)",
          }}
        >
          <h2 className={`font-semibold text-lg ${theme.text.primary}`}>
            🤖 AI Companion
          </h2>
          <button
            onClick={onClose}
            className={`text-sm px-3 py-1 rounded-md ${theme.button} ${theme.text.secondary} border ${theme.buttonBorder}`}
          >
            ✕
          </button>
        </div>

        {/* Chat Section */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {!answer && !loading && (
            <div
              className={`text-sm ${theme.text.secondary} animate-fadeIn border border-dashed rounded-lg p-4 text-center ${theme.border}`}
            >
              💬 Ask anything about your project, like:  
              <br />
              <span className="italic opacity-80">
                “Explain the architecture of this project.”  
                <br />“Summarize the key modules.”
              </span>
            </div>
          )}

          {loading && (
            <div className="flex justify-center items-center gap-2 mt-8 animate-pulse text-sm">
              <div className="h-2 w-2 bg-blue-400 rounded-full animate-bounce"></div>
              <div className="h-2 w-2 bg-blue-400 rounded-full animate-bounce delay-150"></div>
              <div className="h-2 w-2 bg-blue-400 rounded-full animate-bounce delay-300"></div>
              <p className={`${theme.text.secondary} ml-3`}>Thinking...</p>
            </div>
          )}

          {displayedText && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`p-4 rounded-xl border ${theme.border} ${theme.cardBg}`}
            >
              <div
                className={`prose prose-sm max-w-none ${theme.text.primary}`}
                style={{ lineHeight: "1.6" }}
              >
                <ReactMarkdown children={displayedText} remarkPlugins={[remarkGfm]} />
              </div>
            </motion.div>
          )}
        </div>

        {/* Input Section + Privacy Notice */}
        <div className={`p-4 border-t ${theme.border} flex flex-col`}>
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            rows="2"
            placeholder="Ask about this project..."
            className={`w-full p-2 rounded-md text-sm border ${theme.searchBorder} ${theme.searchBg} ${theme.text.primary} focus:outline-none resize-none`}
          />

          <div className="flex justify-between items-center mt-2">
            <button
              onClick={handleAsk}
              disabled={loading}
              className={`px-5 py-2 rounded-md text-white text-sm ${theme.accent} ${theme.accentHover} shadow-md transition-all hover:scale-[1.02]`}
            >
              {loading ? "Analyzing..." : "Ask AI"}
            </button>
          </div>

          <hr className={`my-3 border-dashed ${theme.border}`} />

          <p
            className={`text-[11px] text-center leading-snug italic ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            🔒 This AI Companion relies solely on your uploaded PDF and project
            data to generate responses. We ensure your data remains protected and
            never shared externally.
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AiCompanionSidebar;
