import PromptSuggestionButton from "./PromptSuggestionButton";

const PromptSuggestionRow = ({ onPromptClick }) => {
    const prompts = [
        "Who are we?",
        "What do we do?",
        "Who are our solutions for?",
        "How can we help you?",
    ]
    return (
        <div className='prompts-suggestion-row'>
            {prompts.map((prompt, index) => 
            <PromptSuggestionButton 
                key={`suggestion-${index}`} 
                text={prompt}
                onClick={() => onPromptClick(prompt)}
                    />)}
        </div>
    )
}

export default PromptSuggestionRow;