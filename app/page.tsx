"use client";

import { useState } from "react";
import Image from "next/image";
import f1GPTLogo from "./assets/f1GPTLogo.png";
import { useChat } from "@ai-sdk/react";
import Bubble from "./components/Bubble";
import PromptSuggestionRow from "./components/PromptSuggestionRow";
import LoadingBubble from "./components/LoadingBubble";

export default function Home() {
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);

  const { messages, sendMessage } = useChat({
    onFinish: () => setIsStreaming(false),
    onError: () => setIsStreaming(false),
  });

  const noMessages = !messages || messages.length === 0;

  const handlePrompt = (promptText: string) => {
    setIsStreaming(true);
    sendMessage({role: "user", parts: [{ type: "text", text: promptText }]});
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;
    setIsStreaming(true);
    sendMessage({ role:"user", parts: [{ type: "text", text: input }]});
    setInput("");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <main className="flex flex-col items-center justify-center p-4">
      <Image src={f1GPTLogo} width={250} alt="F1GPT Logo" />

      <section className={`w-full mt-4 ${noMessages ? "" : "populated"}`}>
        {noMessages ? (
          <>
            <p className="starter-text text-center max-w-2xl">
              Aquae AI creates intelligent, fully-customized chatbots designed
              to automate your entire client communication—so you can save time,
              reduce errors, and deliver instant, 24/7 support.
            </p>
            <br />
            <PromptSuggestionRow onPromptClick={handlePrompt} />
          </>
        ) : (
          <>
            {messages.map((message, index) => (
              <Bubble key={`message-${index}`} message={message} />
            ))}
            {isStreaming && <LoadingBubble />}
          </>
        )}
      </section>

      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-2xl gap-2 mt-6"
      >
        <input
          className="question-box grow p-2 border rounded-xl"
          onChange={handleInputChange}
          value={input}
          placeholder="Ask me something..."
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-xl"
        >
          Send
        </button>
      </form>
    </main>
  );
}
