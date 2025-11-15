import { useState, useEffect, useRef } from "react";
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
  const messagesEndRef = useRef(null);

  const isDark = useDarkMode();
  const theme = getTheme(isDark);
  const AI_URL = import.meta.env.VITE_AI_SERVICE_URL;

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

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [displayedText, loading]);

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
      const aiText = res.data.answer?.replace(/\\n/g, "\n")?.trim();
      setAnswer(aiText || "No response from AI.");
    } catch (err) {
      console.error(err);
      setAnswer("⚠️ Unable to reach AI service or invalid token.");
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
        className={`fixed right-0 top-0 h-full w-full md:w-[430px] z-50 flex flex-col
                    border-l backdrop-blur-md shadow-2xl
                    ${theme.cardBg} ${theme.border}`}
        style={{
          background: isDark
            ? "rgba(24, 24, 30, 0.65)"
            : "rgba(240, 240, 245, 0.92)", // Softer glass white
          color: isDark ? "#E5E7EB" : "#1F2937", // Ensures readable text
        }}
      >
        {/* Header */}
        <div
          className={`flex justify-between items-center px-5 py-3 border-b ${theme.border}`}
          style={{
            background: isDark
              ? "linear-gradient(90deg, rgba(25,25,35,0.8), rgba(45,45,70,0.5))"
              : "linear-gradient(90deg, rgba(235,240,255,0.8), rgba(255,255,255,0.6))",
          }}
        >
          <h2 className={`font-medium text-[15px] tracking-wide ${theme.text.primary}`}>
            AI Companion
          </h2>
          <button
            onClick={onClose}
            className={`px-2 py-1 text-xs rounded-md border ${theme.buttonBorder} ${theme.text.secondary} hover:opacity-80 transition`}
          >
            Close
          </button>
        </div>

        {/* Chat Section */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {!answer && !loading && (
            <div
              className={`text-sm text-center p-4 rounded-lg border border-dashed ${
                isDark ? "text-gray-400 border-gray-600" : "text-gray-700 border-gray-300 bg-white/70"
              }`}
            >
              Type a question related to this project, e.g.  
              <span className="italic block mt-1 opacity-80">
                “Explain the architecture of this project.”
              </span>
            </div>
          )}

          {loading && (
            <div className="flex justify-center items-center mt-6 gap-2 text-sm">
              <div className="h-2 w-2 bg-blue-400 rounded-full animate-bounce"></div>
              <div className="h-2 w-2 bg-blue-400 rounded-full animate-bounce delay-150"></div>
              <div className="h-2 w-2 bg-blue-400 rounded-full animate-bounce delay-300"></div>
              <span className={`${theme.text.secondary} ml-3`}>Analyzing...</span>
            </div>
          )}

          {displayedText && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`p-4 rounded-xl border ${theme.border} ${theme.cardBg} shadow-sm`}
            >
              <div className={isDark ? "text-gray-200" : "text-gray-800"}>
                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                    h3: ({ node, ...props }) => (
                      <h3 className="text-md font-semibold mt-3 mb-1" {...props} />
                    ),
                    p: ({ node, ...props }) => (
                      <p className="text-sm leading-relaxed mb-2" {...props} />
                    ),
                    li: ({ node, ...props }) => (
                      <li className="ml-4 list-disc text-sm" {...props} />
                    ),
                  }}
                >
                  {displayedText}
                </ReactMarkdown>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Section + Privacy Notice */}
        <div className={`p-4 border-t ${theme.border} flex flex-col`}>
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            rows="2"
            placeholder="Ask about this project..."
            className={`w-full p-2 rounded-md text-sm border ${
              isDark ? "text-gray-200 bg-[#1e1e25]" : "text-gray-800 bg-white"
            } focus:outline-none resize-none`}
          />
          <div className="flex justify-between items-center mt-2">
            <button
              onClick={handleAsk}
              disabled={loading}
              className={`px-5 py-2 rounded-md text-white text-sm font-medium shadow-md transition-all
                         hover:scale-[1.02] ${theme.accent} ${theme.accentHover}`}
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
            🔒 This AI Companion relies solely on your uploaded PDF and project data
            to generate responses. Your information is processed securely and never
            shared externally.
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AiCompanionSidebar;
