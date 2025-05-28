import { ResearchTopic } from './types';

export const APP_NAME = "腦力火花";

export const APP_ROUTES = {
  HOME: '/home',
  ATTENTION_GAME: '/attention-game',
  LEARNING_GAME: '/learning-game',
  RESEARCH_INFO: '/research',
};

export const RESEARCH_TOPICS: ResearchTopic[] = [
  { 
    id: 'selective-attention', 
    title: '選擇性注意力', 
    brief: '了解您的大腦如何專注於重要的事情。',
    geminiPrompt: 'Explain "Selective Attention" in simple terms for a general audience, focusing on its importance in daily life. Keep it concise, under 100 words.'
  },
  { 
    id: 'working-memory', 
    title: '工作記憶',
    brief: '探索大腦的臨時「便利貼」。',
    geminiPrompt: 'Describe "Working Memory" and its role in learning and problem-solving, in an easy-to-understand way. Maximum 100 words.'
  },
  { 
    id: 'neuroplasticity', 
    title: '神經可塑性與學習',
    brief: '您的大腦在學習過程中如何變化和適應。',
    geminiPrompt: 'What is "Neuroplasticity" and how does it relate to learning new skills? Explain for a non-expert audience, within 100 words.'
  },
  { 
    id: 'spaced-repetition', 
    title: '間隔重複',
    brief: '一種增強長期記憶的強大技巧。',
    geminiPrompt: 'Explain the "Spaced Repetition" learning technique and why it is effective for memory retention. Provide a simple example. Max 100 words.'
  },
  {
    id: 'stroop-effect',
    title: '斯特魯普效應',
    brief: '體驗經典的認知現象。',
    geminiPrompt: 'Describe the "Stroop Effect" and what it reveals about cognitive processing and attention. Keep it under 100 words.'
  }
];

export const GEMINI_TEXT_MODEL = "gemini-2.5-flash-preview-04-17";

// Spot The Target Game Constants
export const TARGET_COLOR = 'bg-red-600'; // Changed from bg-red-500
export const DISTRACTOR_COLORS = ['bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500', 'bg-pink-500'];
export const INITIAL_GRID_SIZE = 3; // 3x3
export const INITIAL_TIME_LIMIT = 10; // seconds

// Sequence Memory Game Constants
export const SEQUENCE_ITEM_COLORS = ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500', 'bg-orange-500'];
export const INITIAL_SEQUENCE_LENGTH = 3;
export const MAX_LIVES = 3;