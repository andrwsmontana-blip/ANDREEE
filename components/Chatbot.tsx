import React, { useState, useRef, useEffect, useCallback } from 'react';
import { GoogleGenAI } from '@google/genai';
import { Bot, User, Send, X, Compass, Search as SearchIcon, Globe } from 'lucide-react';

interface Message {
  sender: 'user' | 'bot';
  text: string;
  sources?: any[];
}

const Chatbot: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'bot', text: "¡Hola! Soy tu asistente de MGP. ¿Cómo puedo ayudarte con tu onboarding?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = useCallback(async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      let responseText = '';
      let sources: any[] = [];
      const lowerInput = input.toLowerCase();

      // Simple routing based on keywords
      if (lowerInput.includes('busca en la web') || lowerInput.includes('noticias')) {
         // Search Grounding
        const model = 'gemini-2.5-flash';
        const response = await ai.models.generateContent({
            model,
            contents: [{ parts: [{ text: input }] }],
            config: { tools: [{googleSearch: {}}] },
        });
        responseText = response.text;
        sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
      } else if (lowerInput.includes('cerca de mí') || lowerInput.includes('restaurantes') || lowerInput.includes('dirección')) {
        // Maps Grounding
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });
        const { latitude, longitude } = position.coords;

        const model = 'gemini-2.5-flash';
        const response = await ai.models.generateContent({
            model,
            contents: [{ parts: [{ text: input }] }],
            config: { 
                tools: [{googleMaps: {}}],
                toolConfig: { retrievalConfig: { latLng: { latitude, longitude } } }
            },
        });
        responseText = response.text;
        sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
      } else if(input.length < 15) {
        // Low-latency for short queries
        const model = 'gemini-flash-lite-latest';
        const response = await ai.models.generateContent({ model, contents: [{ parts: [{ text: input }] }]});
        responseText = response.text;
      } else {
        // Standard chat
        const model = 'gemini-2.5-flash';
        const response = await ai.models.generateContent({ model, contents: [{ parts: [{ text: input }] }]});
        responseText = response.text;
      }

      setMessages(prev => [...prev, { sender: 'bot', text: responseText, sources }]);
    } catch (error) {
      console.error('Gemini API error:', error);
      setMessages(prev => [...prev, { sender: 'bot', text: 'Lo siento, ocurrió un error. Por favor, intenta de nuevo.' }]);
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading, ai.models]);

  const renderSource = (source: any, index: number) => {
    if (source.web) {
      return (
        <a href={source.web.uri} target="_blank" rel="noopener noreferrer" key={`web-${index}`} className="flex items-center space-x-2 text-xs bg-gray-700 p-2 rounded-lg hover:bg-gray-600">
          <Globe className="h-4 w-4 text-blue-500" />
          <span className="truncate">{source.web.title || 'Fuente Web'}</span>
        </a>
      );
    }
    if (source.maps) {
      return (
        <a href={source.maps.uri} target="_blank" rel="noopener noreferrer" key={`map-${index}`} className="flex items-center space-x-2 text-xs bg-gray-700 p-2 rounded-lg hover:bg-gray-600">
          <Compass className="h-4 w-4 text-green-500" />
          <span className="truncate">{source.maps.title || 'Ubicación en Mapa'}</span>
        </a>
      );
    }
    return null;
  }

  return (
    <div className="w-96 h-[32rem] bg-gray-800 rounded-2xl shadow-2xl flex flex-col animate-fade-in-up mb-4">
      <header className="flex items-center justify-between p-4 border-b border-gray-700">
        <div className="flex items-center space-x-2">
          <Bot className="h-7 w-7 text-red-500" />
          <h2 className="text-lg font-bold">Asistente MGP</h2>
        </div>
        <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-700">
          <X className="h-5 w-5 text-gray-500" />
        </button>
      </header>
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map((msg, index) => (
          <div key={index} className={`flex items-start gap-3 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
            {msg.sender === 'bot' && <Bot className="h-6 w-6 text-red-500 flex-shrink-0 mt-1" />}
            <div className={`max-w-xs px-4 py-2 rounded-2xl ${msg.sender === 'user' ? 'bg-red-800 text-white rounded-br-none' : 'bg-gray-700 text-gray-200 rounded-bl-none'}`}>
              <p className="text-sm" dangerouslySetInnerHTML={{ __html: msg.text.replace(/\n/g, '<br />') }} />
              {msg.sources && msg.sources.length > 0 && (
                <div className="mt-3 pt-2 border-t border-gray-600 space-y-2">
                  <h4 className="text-xs font-semibold">Fuentes:</h4>
                  {msg.sources.map(renderSource)}
                </div>
              )}
            </div>
            {msg.sender === 'user' && <User className="h-6 w-6 bg-gray-300 text-gray-600 p-1 rounded-full flex-shrink-0 mt-1" />}
          </div>
        ))}
        {isLoading && (
          <div className="flex items-start gap-3">
            <Bot className="h-6 w-6 text-red-500 flex-shrink-0 mt-1" />
            <div className="max-w-xs px-4 py-3 rounded-2xl bg-gray-700 rounded-bl-none">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce delay-150"></div>
                <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce delay-300"></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-4 border-t border-gray-700">
        <div className="flex items-center bg-gray-700 rounded-full px-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Escribe tu pregunta..."
            className="flex-1 bg-transparent p-3 text-sm focus:outline-none"
            disabled={isLoading}
          />
          <button onClick={handleSend} disabled={isLoading || !input.trim()} className="bg-red-800 text-white p-2 rounded-full disabled:bg-gray-500 disabled:cursor-not-allowed hover:bg-red-900 transition-colors">
            <Send className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;