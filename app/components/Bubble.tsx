import type { UIMessage } from '@ai-sdk/react';

type BubbleProps = {
  message: UIMessage;
};

const Bubble = ({ message }: BubbleProps) => {
  const { parts, role } = message;

  return (
    <div className={`bubble ${role}`}>
      {parts.map((part, index) => {
        if (part.type === 'text') {
          return <p key={index}>{part.text}</p>;
        } else if (part.type === 'dynamic-tool') {
          return (
            <p key={index} className="tool-output">
              [Tool: {part.toolName}]
            </p>
          );
        } else {
          return null; // ignore unknown types
        }
      })}
    </div>
  );
};

export default Bubble;
