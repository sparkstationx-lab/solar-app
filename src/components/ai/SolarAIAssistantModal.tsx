import React, { useState } from 'react';
import { BottomSheet } from '../common/BottomSheet';
import { askSolarAI } from '../../services/aiAssistant';
import { Sparkles, Send, Bot, User, Sun } from 'lucide-react';

interface SolarAIAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SolarAIAssistantModal: React.FC<SolarAIAssistantModalProps> = ({
  isOpen,
  onClose
}) => {
  const [inputQuery, setInputQuery] = useState('');
  const [messages, setMessages] = useState<{ sender: 'bot' | 'user'; text: string }[]>([
    {
      sender: 'bot',
      text: `Hello! I am SolarBot, your certified solar energy AI consultant. Ask me anything about rooftop panel selection, government subsidies (PM Surya Ghar), net-metering rules, or solar ROI calculations!`
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const quickPrompts = [
    'How do I claim PM Surya Ghar subsidy?',
    'Mono PERC vs Bifacial panels difference?',
    'What is net metering and how does it work?'
  ];

  const handleSend = async (queryText?: string) => {
    const textToSend = queryText || inputQuery;
    if (!textToSend.trim()) return;

    const userMsg = textToSend.trim();
    setMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    if (!queryText) setInputQuery('');
    setIsLoading(true);

    try {
      const responseText = await askSolarAI(userMsg);
      setMessages(prev => [...prev, { sender: 'bot', text: responseText }]);
    } catch (e) {
      setMessages(prev => [
        ...prev,
        {
          sender: 'bot',
          text: 'I am sorry, I encountered a temporary connection issue. Please check your internet or retry.'
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={onClose}
      title="SolarBot - AI Solar Advisory"
      subtitle="Instant guidance on solar panels, subsidies & ROI"
      maxHeight="max-h-[85vh]"
    >
      <div className="flex flex-col h-[60vh]">
        {/* Messages Scroll Area */}
        <div className="flex-1 overflow-y-auto space-y-3 pr-1 pb-2">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-2.5 text-xs ${
                msg.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {msg.sender === 'bot' && (
                <div className="w-7 h-7 rounded-full bg-slate-900 text-amber-400 flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`p-3 rounded-2xl max-w-[85%] leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-amber-500 text-slate-950 font-bold rounded-tr-none'
                    : 'bg-slate-100 text-slate-900 rounded-tl-none border border-slate-200'
                }`}
              >
                <div className="whitespace-pre-line">{msg.text}</div>
              </div>

              {msg.sender === 'user' && (
                <div className="w-7 h-7 rounded-full bg-slate-800 text-white flex items-center justify-center shrink-0">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-2 text-xs text-amber-600 font-bold p-2">
              <Sparkles className="w-4 h-4 animate-spin" />
              <span>SolarBot is analyzing solar specs...</span>
            </div>
          )}
        </div>

        {/* Quick Suggestion Chips */}
        <div className="py-2 border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {quickPrompts.map((prompt, i) => (
            <button
              key={i}
              onClick={() => handleSend(prompt)}
              className="px-2.5 py-1 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 rounded-full text-[10px] font-bold whitespace-nowrap shrink-0"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Query Input Bar */}
        <div className="pt-2 border-t border-slate-200 flex gap-2">
          <input
            type="text"
            placeholder="Ask anything about solar energy..."
            value={inputQuery}
            onChange={e => setInputQuery(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl px-3 py-2 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />

          <button
            onClick={() => handleSend()}
            disabled={isLoading || !inputQuery.trim()}
            className="p-2.5 bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold rounded-2xl transition disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </BottomSheet>
  );
};
