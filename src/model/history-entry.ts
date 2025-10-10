export interface HistoryEntry {
  type: 'command' | 'output';
  content: React.ReactNode;
  user?: string;
}
