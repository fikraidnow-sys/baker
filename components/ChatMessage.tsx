
import React from 'react';
import { Message } from '../types';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isModel = message.role === 'model';

  return (
    <div className={`flex w-full mb-4 ${isModel ? 'justify-start' : 'justify-end'}`}>
      <div className={`flex max-w-[85%] sm:max-w-[70%] ${isModel ? 'flex-row' : 'flex-row-reverse'}`}>
        <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center mt-1 shadow-sm
          ${isModel ? 'bg-[#800000] text-white' : 'bg-gray-200 text-gray-600'}`}>
          {isModel ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          )}
        </div>
        
        <div className={`mx-3 px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm
          ${isModel 
            ? 'bg-white text-gray-800 border border-gray-100 rounded-tr-none' 
            : 'bg-[#800000] text-white rounded-tl-none'}`}>
          <div className="whitespace-pre-wrap">{message.text}</div>
          <div className={`text-[10px] mt-1 opacity-60 ${isModel ? 'text-gray-400' : 'text-gray-100'}`}>
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
