import { useState, useCallback, useEffect } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

export interface Message {
    id: string;
    role: 'user' | 'model';
    text: string;
    timestamp: number;
}

const SYSTEM_PROMPT = `
You are Jernish's AI Portfolio Assistant. Your goal is to help visitors learn about Jernish, a Full Stack Developer and Electronics Engineer.

Key Information about Jernish:
- **Role:** Full Stack Developer & ECE Engineer.
- **Skills:** React, TypeScript, Node.js, Tailwind CSS, Framer Motion, IoT, Embedded Systems.
- **Background:** Electronics and Communication Engineering (ECE).
- **Projects:** 
    - **Portfolio:** This website (React, Framer Motion, 3D effects).
    - **IoT Systems:** Smart home automation projects.
    - **Web Apps:** Various full-stack applications.
- **Personality:** Passionate about bridging hardware and software, loves clean UI/UX, and enjoys solving complex problems.

**Guidelines:**
- Be friendly, professional, and concise.
- If asked about contact info, direct them to the Contact section or mention 'jernish@example.com'.
- If asked about specific projects, summarize them briefly.
- You can use emojis sparingly to keep the tone light.
- If you don't know something, admit it and suggest they contact Jernish directly.
`;

export const useGeminiChat = () => {
    const [messages, setMessages] = useState<Message[]>(() => {
        const saved = localStorage.getItem('gemini_chat_history');
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch (e) {
                console.error('Failed to parse chat history', e);
            }
        }
        return [{
            id: 'welcome',
            role: 'model',
            text: "Hi! I'm Jernish's AI assistant. Ask me anything about his skills, projects, or experience! 🤖",
            timestamp: Date.now(),
        }];
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Save to localStorage whenever messages change
    useEffect(() => {
        localStorage.setItem('gemini_chat_history', JSON.stringify(messages));
    }, [messages]);

    const sendMessage = useCallback(async (text: string) => {
        if (!text.trim()) return;

        const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

        if (!apiKey) {
            setError('API Key not found. Please add VITE_GEMINI_API_KEY to your .env file.');
            return;
        }

        // Add user message
        const userMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            text,
            timestamp: Date.now(),
        };
        setMessages((prev) => [...prev, userMessage]);
        setIsLoading(true);
        setError(null);

        try {
            const genAI = new GoogleGenerativeAI(apiKey);
            const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

            // Filter out welcome message and format history for API
            const history = messages
                .filter(m => m.id !== 'welcome')
                .map(m => ({
                    role: m.role,
                    parts: [{ text: m.text }]
                }));

            const chat = model.startChat({
                history: [
                    {
                        role: 'user',
                        parts: [{ text: SYSTEM_PROMPT }],
                    },
                    {
                        role: 'model',
                        parts: [{ text: "Understood. I am ready to answer questions about Jernish." }],
                    },
                    ...history
                ],
            });

            const result = await chat.sendMessage(text);
            const response = await result.response;
            const responseText = response.text();

            const botMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'model',
                text: responseText,
                timestamp: Date.now(),
            };

            setMessages((prev) => [...prev, botMessage]);
        } catch (err: unknown) {
            console.error('Gemini API Error:', err);
            setError('Failed to get response. Please try again later.');

            // Add error message to chat
            setMessages((prev) => [...prev, {
                id: (Date.now() + 1).toString(),
                role: 'model',
                text: "I'm having trouble connecting to my brain right now. Please try again later! 🧠💥",
                timestamp: Date.now(),
            }]);
        } finally {
            setIsLoading(false);
        }
    }, [messages]);

    const clearChat = useCallback(() => {
        setMessages([
            {
                id: 'welcome',
                role: 'model',
                text: "Hi! I'm Jernish's AI assistant. Ask me anything about his skills, projects, or experience! 🤖",
                timestamp: Date.now(),
            },
        ]);
        setError(null);
    }, []);

    const deleteHistory = useCallback(() => {
        localStorage.removeItem('gemini_chat_history');
        clearChat();
    }, [clearChat]);

    return {
        messages,
        isLoading,
        error,
        sendMessage,
        clearChat,
        deleteHistory
    };
};
