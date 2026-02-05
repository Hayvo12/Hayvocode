import React, { useState } from 'react';
import { AlertTriangle, X, Search, Globe, Send, ChevronLeft } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { Button } from '../components/ui/Button';

// Mock Data
const CONVERSATIONS = [
    { id: 1, name: 'Sarah Connor', avatar: 'S', lastMsg: 'Did you see the new design trends?', time: '2m' },
    { id: 2, name: 'Faisal', avatar: 'F', lastMsg: 'Let\'s meet for coffee soon.', time: '1h' },
];

const MESSAGES = [
    { id: 1, text: 'Hey! How are you?', sender: 'them' },
    { id: 2, text: 'I am doing great, just working on the new app.', sender: 'me' },
    { id: 3, text: 'That sounds amazing. Is it built with React?', sender: 'them' },
];

export const Messages = () => {
  const [activeChat, setActiveChat] = useState<number | null>(null);

  if (activeChat) {
      return <ChatView onBack={() => setActiveChat(null)} name={CONVERSATIONS.find(c => c.id === activeChat)?.name || 'User'} />;
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="p-4 border-b border-gray-100 sticky top-0 bg-white z-10">
        <h1 className="text-xl font-bold mb-4">Messages</h1>
        <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
                type="text" 
                placeholder="Search DMs" 
                className="w-full bg-gray-100 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none"
            />
        </div>
      </div>

      <div className="divide-y divide-gray-50">
          {CONVERSATIONS.map(chat => (
              <div key={chat.id} onClick={() => setActiveChat(chat.id)} className="p-4 flex gap-3 hover:bg-gray-50 cursor-pointer transition-colors">
                  <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-600">
                      {chat.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-baseline mb-1">
                          <span className="font-bold text-sm">{chat.name}</span>
                          <span className="text-xs text-gray-400">{chat.time}</span>
                      </div>
                      <p className="text-sm text-gray-500 truncate">{chat.lastMsg}</p>
                  </div>
              </div>
          ))}
      </div>
    </div>
  );
};

const ChatView = ({ onBack, name }: { onBack: () => void, name: string }) => {
    const [msgText, setMsgText] = useState('');
    const [messages, setMessages] = useState(MESSAGES);

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        if(!msgText.trim()) return;
        setMessages([...messages, { id: Date.now(), text: msgText, sender: 'me' }]);
        setMsgText('');
    };

    return (
        <div className="flex flex-col h-[calc(100vh-80px)] md:h-screen bg-white">
            <div className="p-4 border-b border-gray-100 flex items-center gap-3 sticky top-0 bg-white z-10">
                <button onClick={onBack}><ChevronLeft className="w-6 h-6" /></button>
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold">
                    {name[0]}
                </div>
                <span className="font-bold">{name}</span>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map(msg => (
                    <MessageBubble key={msg.id} msg={msg} />
                ))}
            </div>

            <form onSubmit={handleSend} className="p-3 border-t border-gray-100 flex gap-2">
                <input 
                    value={msgText}
                    onChange={(e) => setMsgText(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm focus:outline-none"
                />
                <button type="submit" className="p-2 bg-black text-white rounded-full">
                    <Send className="w-4 h-4" />
                </button>
            </form>
        </div>
    );
};

const MessageBubble = ({ msg }: { msg: any }) => {
    const [translated, setTranslated] = useState(false);
    const isMe = msg.sender === 'me';

    return (
        <div className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
            <div className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm ${isMe ? 'bg-black text-white rounded-br-none' : 'bg-gray-100 text-gray-900 rounded-bl-none'}`}>
                {translated ? `[Translated] ${msg.text}` : msg.text}
            </div>
            {!isMe && (
                <button onClick={() => setTranslated(!translated)} className="flex items-center gap-1 text-[10px] text-gray-400 mt-1 ml-1">
                    <Globe className="w-3 h-3" />
                    {translated ? 'Original' : 'Translate'}
                </button>
            )}
        </div>
    );
};
