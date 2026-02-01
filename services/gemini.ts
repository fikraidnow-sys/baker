
import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";

let chatInstance: Chat | null = null;

export const getChatSession = () => {
  if (!chatInstance) {
    // Fix: Initialize with the correct object structure and use process.env.API_KEY directly
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    chatInstance = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });
  }
  return chatInstance;
};

export const sendMessageToGemini = async (message: string, onChunk: (chunk: string) => void) => {
  try {
    const chat = getChatSession();
    const stream = await chat.sendMessageStream({ message });
    
    let fullResponse = "";
    for await (const chunk of stream) {
      // Fix: Directly access the .text property of GenerateContentResponse
      const text = (chunk as GenerateContentResponse).text;
      if (text) {
        fullResponse += text;
        onChunk(text);
      }
    }
    return fullResponse;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
