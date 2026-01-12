'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, AlertTriangle, ShieldCheck, Sparkles } from 'lucide-react';
import { processUserMessage, AIResponse } from '@/lib/ai-logic';
import Link from 'next/link';

type Message = {
    role: 'user' | 'ai';
    content: string | AIResponse;
};

// --- Sub-Components ---

const AnalysisCard = ({ analysis }: { analysis: NonNullable<AIResponse['analysis']> }) => {
    const urgencyColor = analysis.urgency === 'High' ? 'var(--urgency-high)'
        : analysis.urgency === 'Medium' ? 'var(--urgency-medium)'
            : 'var(--urgency-low)';

    return (
        <div className="analysis-card">
            <div style={{ marginBottom: '12px', fontWeight: 600, color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sparkles size={16} /> Analysis Result
            </div>

            <div style={{ marginBottom: '8px' }}>
                <strong style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.05em' }}>Possible Causes</strong>
                <ul style={{ paddingLeft: '20px', margin: '4px 0', color: 'var(--text-main)' }}>
                    {analysis.causes.map((c: string) => <li key={c}>{c}</li>)}
                </ul>
            </div>

            <div style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <strong style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.05em' }}>Urgency</strong>
                <span className="urgency-badge" style={{ background: urgencyColor }}>
                    {analysis.urgency}
                </span>
            </div>

            <div style={{ marginBottom: '12px' }}>
                <strong style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.05em' }}>Recommendation</strong>
                <p>{analysis.checkupType}</p>
            </div>

            {analysis.immediateAction && (
                <div style={{ margin: '12px 0', padding: '12px', background: '#FEF2F2', color: '#991B1B', borderRadius: '8px', display: 'flex', gap: '10px', fontSize: '0.9rem', alignItems: 'start' }}>
                    <AlertTriangle size={18} style={{ marginTop: '2px', flexShrink: 0 }} />
                    <div>{analysis.immediateAction}</div>
                </div>
            )}

            <div style={{ marginTop: '16px' }}>
                <Link href={`/book?treatment=consultation`} className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '0.9rem', width: '100%' }}>
                    Book Appointment Now
                </Link>
            </div>

            <div style={{ marginTop: '12px', fontSize: '0.75rem', color: '#94a3b8', textAlign: 'center', paddingTop: '8px', borderTop: '1px solid #f1f5f9' }}>
                Educational aid only. Consult a doctor for medical advice.
            </div>
        </div>
    );
};

const ChatMessage = ({ msg }: { msg: Message }) => {
    const isUser = msg.role === 'user';

    if (typeof msg.content === 'object' && msg.content.type === 'analysis' && msg.content.analysis) {
        return <AnalysisCard analysis={msg.content.analysis} />;
    }

    const textContent = typeof msg.content === 'string' ? msg.content : msg.content.message;

    return (
        <div className={`chat-message ${isUser ? 'user' : 'ai'}`}>
            {textContent}
        </div>
    );
};

// --- Main Component ---

export default function SkinAssistant() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { role: 'ai', content: { type: 'chat', message: "Hello! I'm your Skin Health Assistant. Describe your symptoms (e.g., 'itchy red patch') and I'll help you assess the urgency. Note: I cannot provide a medical diagnosis." } }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userText = input;
        setMessages(prev => [...prev, { role: 'user', content: userText }]);
        setInput('');
        setIsTyping(true);

        // Simulate AI "Thinking" Delay locally
        setTimeout(() => {
            const response = processUserMessage(userText);
            setMessages(prev => [...prev, { role: 'ai', content: response }]);
            setIsTyping(false);
        }, 800);
    };

    return (
        <>
            {/* Toggle Button */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="chat-toggle animate-fade-in"
                    aria-label="Open skin assistant chat"
                >
                    <MessageCircle size={24} />
                    <span>AI Skin Assistant</span>
                </button>
            )}

            {/* Chat Window */}
            {isOpen && (
                <div className="chat-window animate-fade-in">
                    {/* Header */}
                    <div className="chat-header">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontWeight: 600, fontSize: '1.1rem' }}>
                            <div style={{ background: 'rgba(255,255,255,0.2)', padding: '8px', borderRadius: '50%' }}>
                                <ShieldCheck size={20} />
                            </div>
                            <div>
                                <div>Skin Assistant</div>
                                <div style={{ fontSize: '0.75rem', fontWeight: 400, opacity: 0.9 }}>Always here to help</div>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            aria-label="Close chat"
                            style={{ background: 'transparent', color: 'white', padding: '4px', borderRadius: '50%', display: 'flex' }}
                            className="hover:bg-white/10"
                        >
                            <X size={24} />
                        </button>
                    </div>

                    {/* Messages Area */}
                    <div className="chat-body">
                        {messages.map((m, i) => (
                            <div key={i} style={{ alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start', maxWidth: '100%', display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
                                <ChatMessage msg={m} />
                            </div>
                        ))}

                        {isTyping && (
                            <div className="chat-message ai">
                                <div className="dot-typing" style={{ marginLeft: '12px' }}></div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <div className="chat-input-area">
                        <input
                            type="text"
                            placeholder="Describe your symptoms..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                            style={{
                                flex: 1, padding: '12px 16px', borderRadius: '24px', border: '1px solid #e2e8f0',
                                outline: 'none', fontSize: '0.95rem', background: '#f8fafc', color: 'var(--text-main)'
                            }}
                            aria-label="Type your symptoms"
                        />
                        <button
                            onClick={handleSend}
                            disabled={!input.trim()}
                            aria-label="Send message"
                            style={{
                                width: '46px', height: '46px', borderRadius: '50%',
                                background: input.trim() ? 'var(--primary)' : '#cbd5e1', color: 'white',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                transition: 'all 0.2s'
                            }}
                        >
                            <Send size={20} />
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
