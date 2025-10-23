import PromptSuggestionButton from "./PromptSuggestionButton";

type PromptSuggestionRowProps = {
  onPromptClick: (prompt: string) => void;
};

const PromptSuggestionRow = ({ onPromptClick }: PromptSuggestionRowProps) => {
  const prompts = [
    "Who are we?",
    "What do we do?",
    "Who are our solutions for?",
    "How can we help you?",
  ];

  return (
    <div className="prompts-suggestion-row">
      {prompts.map((prompt, index) => (
        <PromptSuggestionButton
          key={`suggestion-${index}`}
          text={prompt}
          onClick={() => onPromptClick(prompt)}
        />
      ))}
    </div>
  );
};

export default PromptSuggestionRow;
