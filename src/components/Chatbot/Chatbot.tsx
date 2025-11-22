import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRobot, FaPaperPlane, FaMinus, FaTrash, FaPlus } from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useGeminiChat } from '../../hooks/useGeminiChat';


const Chatbot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const { messages, isLoading, sendMessage, clearChat, deleteHistory } = useGeminiChat();

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Auto-scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isOpen]);

    // Focus input when opened
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 300);
        }
    }, [isOpen]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputValue.trim() || isLoading) return;

        sendMessage(inputValue);
        setInputValue('');
    };

    return (
        <>
            {/* Toggle Button - Bottom Right */}
            <AnimatePresence>
                {!isOpen && (
                    <motion.button
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setIsOpen(true)}
                        className="fixed bottom-6 right-6 z-[9998] bg-gradient-to-r from-primary to-accent text-white p-4 rounded-full shadow-lg shadow-primary/30 flex items-center justify-center group"
                        aria-label="Open AI Chat"
                    >
                        <FaRobot className="text-2xl group-hover:rotate-12 transition-transform duration-300" />
                        <span className="absolute right-full mr-3 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                            Ask AI Assistant
                        </span>
                    </motion.button>
                )}
            </AnimatePresence>

            {/* Chat Window - Bottom Right */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.9 }}
                        className="fixed bottom-6 right-6 z-[9999] w-[350px] max-w-[calc(100vw-48px)] h-[500px] max-h-[80vh] bg-bg-card border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden backdrop-blur-xl"
                    >
                        {/* Header */}
                        <div className="p-4 bg-primary/10 border-b border-border flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                                    <FaRobot className="text-white text-sm" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-text-main text-sm">AI Assistant</h3>
                                    <div className="flex items-center gap-1.5">
                                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                        <span className="text-[10px] text-text-muted">Online</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={clearChat}
                                    className="p-1.5 text-text-muted hover:text-primary transition-colors rounded-md hover:bg-white/5"
                                    title="New Chat"
                                >
                                    <FaPlus size={12} />
                                </button>
                                <button
                                    onClick={() => {
                                        if (window.confirm('Are you sure you want to delete all chat history?')) {
                                            deleteHistory();
                                        }
                                    }}
                                    className="p-1.5 text-text-muted hover:text-red-400 transition-colors rounded-md hover:bg-white/5"
                                    title="Delete History"
                                >
                                    <FaTrash size={12} />
                                </button>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-1.5 text-text-muted hover:text-text-main transition-colors rounded-md hover:bg-white/5"
                                >
                                    <FaMinus size={12} />
                                </button>
                            </div>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent">
                            {messages.map((msg) => (
                                <motion.div
                                    key={msg.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} `}
                                >
                                    <div
                                        className={`max-w-[85%] p-3 rounded-2xl text-sm ${msg.role === 'user'
                                            ? 'bg-primary text-white rounded-br-none'
                                            : 'bg-white/10 text-text-main rounded-bl-none border border-white/5'
                                            }`}
                                    >
                                        {msg.role === 'model' ? (
                                            <ReactMarkdown
                                                remarkPlugins={[remarkGfm]}

                                                components={{
                                                    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
                                                    a: ({ node, ...props }: any) => <a {...props} className="text-primary hover:underline" target="_blank" rel="noopener noreferrer" />,
                                                    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
                                                    code: ({ node, ...props }: any) => <code {...props} className="bg-black/30 px-1 py-0.5 rounded text-xs font-mono" />,
                                                }}
                                            >
                                                {msg.text}
                                            </ReactMarkdown>
                                        ) : (
                                            msg.text
                                        )}
                                    </div>
                                </motion.div>
                            ))}

                            {isLoading && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex justify-start"
                                >
                                    <div className="bg-white/10 p-3 rounded-2xl rounded-bl-none border border-white/5 flex gap-1">
                                        <span className="w-1.5 h-1.5 bg-text-muted rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                        <span className="w-1.5 h-1.5 bg-text-muted rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                        <span className="w-1.5 h-1.5 bg-text-muted rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                    </div>
                                </motion.div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <form onSubmit={handleSubmit} className="p-3 border-t border-border bg-bg-card/50">
                            <div className="relative flex items-center">
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    placeholder="Ask about Jernish..."
                                    className="w-full bg-white/5 border border-white/10 rounded-full py-2.5 pl-4 pr-12 text-sm text-text-main focus:outline-none focus:border-primary/50 transition-colors placeholder:text-text-muted/50"
                                    disabled={isLoading}
                                />
                                <button
                                    type="submit"
                                    disabled={!inputValue.trim() || isLoading}
                                    className="absolute right-1.5 p-2 bg-primary text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors"
                                >
                                    <FaPaperPlane size={12} />
                                </button>
                            </div>
                            <div className="text-[10px] text-center text-text-muted mt-2 opacity-50">
                                Powered by Google Gemini AI
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Chatbot;
