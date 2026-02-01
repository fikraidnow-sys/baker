
// Fix: Added React import to provide the React namespace
import React from 'react';

export interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface QuickAction {
  label: string;
  prompt: string;
  icon: React.ReactNode;
}
