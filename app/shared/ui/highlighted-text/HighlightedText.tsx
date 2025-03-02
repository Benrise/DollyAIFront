export interface HighlightedTextProps {
    children: React.ReactNode;
  }
  
export const HighlightedText: React.FC<HighlightedTextProps> = ({ children }) => (
  <span className="font-semibold text-indigo-500">{children}</span>
);