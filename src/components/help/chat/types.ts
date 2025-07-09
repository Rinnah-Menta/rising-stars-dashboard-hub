
export interface Message {
  id: string;
  type: 'user' | 'bot' | 'options';
  content: string;
  timestamp: Date;
  options?: Array<{
    id: string;
    text: string;
    nextFlow: string;
  }>;
}

export interface ChatFlow {
  [key: string]: {
    message: string;
    options?: Array<{
      id: string;
      text: string;
      nextFlow: string;
    }>;
    isEnd?: boolean;
  };
}
