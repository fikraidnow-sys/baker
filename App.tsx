
import React, { useState, useRef, useEffect } from 'react';
import { Message } from './types';
import { QUICK_ACTIONS, UNIVERSITY_COLORS } from './constants';
import { sendMessageToGemini } from './services/gemini';
import ChatMessage from './components/ChatMessage';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'model',
      text: 'مرحباً بك في مركز اللغات بجامعة مؤتة! أنا مساعدك الذكي. كيف يمكنني مساعدتك اليوم؟ يمكنك سؤالي عن امتحانات المستوى، الدورات، أو البرامج التي نقدمها.',
      timestamp: new Date(),
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (text: string = inputText) => {
    if (!text.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      text,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    const modelMessageId = (Date.now() + 1).toString();
    const initialModelMessage: Message = {
      id: modelMessageId,
      role: 'model',
      text: '',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, initialModelMessage]);

    try {
      await sendMessageToGemini(text, (chunk) => {
        setMessages(prev => 
          prev.map(msg => 
            msg.id === modelMessageId 
              ? { ...msg, text: msg.text + chunk } 
              : msg
          )
        );
      });
    } catch (error) {
      setMessages(prev => 
        prev.map(msg => 
          msg.id === modelMessageId 
            ? { ...msg, text: 'عذراً، حدث خطأ أثناء الاتصال. يرجى المحاولة لاحقاً.' } 
            : msg
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto bg-white shadow-2xl overflow-hidden md:my-4 md:h-[calc(100vh-2rem)] md:rounded-2xl">
      {/* Header */}
      <header className={`${UNIVERSITY_COLORS.primary} p-4 flex items-center justify-between text-white shadow-lg z-10`}>
        <div className="flex items-center space-x-3 space-x-reverse">
          <div className="w-12 h-12 bg-white rounded-full p-1 flex items-center justify-center overflow-hidden">
            <img 
              src="https://picsum.photos/seed/mutah/200/200" 
              alt="Mutah University Logo" 
              className="w-10 h-10 object-contain rounded-full"
            />
          </div>
          <div>
            <h1 className="font-bold text-lg leading-tight">مركز اللغات</h1>
            <p className="text-xs text-gray-200">جامعة مؤتة - السيف والقلم</p>
          </div>
        </div>
        <div className="flex items-center">
          <span className="flex h-3 w-3 relative ml-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
          <span className="text-xs font-medium">متصل الآن</span>
        </div>
      </header>

      {/* Main Chat Area */}
      <main className="flex-1 overflow-y-auto p-4 bg-slate-50 custom-scrollbar">
        <div className="flex flex-col space-y-2">
          {messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} />
          ))}
          {isLoading && messages[messages.length - 1].text === '' && (
            <div className="flex justify-start mb-4">
              <div className="bg-white px-4 py-3 rounded-2xl rounded-tr-none shadow-sm border border-gray-100">
                <div className="flex space-x-1 space-x-reverse">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* Quick Actions Bar */}
      {messages.length < 5 && (
        <div className="p-3 bg-white border-t flex flex-wrap gap-2 overflow-x-auto custom-scrollbar">
          {QUICK_ACTIONS.map((action, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(action.prompt)}
              className="flex items-center space-x-2 space-x-reverse bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-full text-xs transition-colors border border-gray-200 whitespace-nowrap"
            >
              <span className={UNIVERSITY_COLORS.text}>{action.icon}</span>
              <span>{action.label}</span>
            </button>
          ))}
        </div>
      )}

      {/* Input Form */}
      <footer className="p-4 bg-white border-t">
        <div className="relative flex items-center">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="اكتب سؤالك هنا..."
            className="w-full pl-12 pr-4 py-3 bg-gray-100 border-none rounded-2xl focus:ring-2 focus:ring-[#800000] focus:bg-white transition-all outline-none text-sm text-gray-800"
          />
          <button
            onClick={() => handleSend()}
            disabled={!inputText.trim() || isLoading}
            className={`absolute left-2 p-2 rounded-xl transition-all ${
              !inputText.trim() || isLoading 
                ? 'text-gray-400 bg-gray-200 cursor-not-allowed' 
                : `${UNIVERSITY_COLORS.primary} text-white shadow-md hover:scale-105 active:scale-95`
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
        <p className="text-[10px] text-center text-gray-400 mt-2">
          هذا المساعد يستخدم الذكاء الاصطناعي لتسهيل الوصول للمعلومات. قد تختلف المواعيد الدقيقة، يرجى مراجعة المركز للتأكيد.
        </p>
      </footer>
    </div>
  );
};

export default App;
