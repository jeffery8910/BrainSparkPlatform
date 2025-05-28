
export interface NavItem {
  path: string;
  name: string;
  icon: React.ReactElement;
}

export interface ResearchTopic {
  id: string;
  title: string;
  brief?: string; // Optional brief description shown before fetching full explanation
  geminiPrompt: string; // Specific prompt for Gemini
}

// For Spot The Target Game
export interface GridItem {
  id: string;
  color: string;
  isTarget: boolean;
}

// For Sequence Memory Game
export enum GamePhase {
  ShowingSequence,
  WaitingForInput,
  Feedback,
  GameOver,
  NotStarted,
}

export interface IconProps {
  className?: string;
}
