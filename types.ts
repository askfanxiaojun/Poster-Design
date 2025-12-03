export interface StyleProfile {
  id: string;
  name: string;
  name_zh: string;
  description: string;
  description_zh: string;
  previewColor: string;
  promptInstruction: string;
  icon: string;
}

export interface GenerationResult {
  id: string;
  styleId: string;
  imageUrl: string;
  prompt: string;
  timestamp: number;
}

export interface GenerationState {
  isGenerating: boolean;
  currentStyle?: string;
  progress: number; // 0 to 100
  error?: string;
}

export interface UserInput {
  prompt: string;
  baseImage: File | null;
}

export type Language = 'en' | 'zh';
export type Theme = 'dark' | 'light';