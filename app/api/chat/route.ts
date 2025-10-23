import OpenAI from "openai";
import { streamText } from "ai";
import { DataAPIClient } from "@datastax/astra-db-ts";

export const runtime = "edge";

const { ASTRA_DB_API_ENDPOINT, ASTRA_DB_APPLICATION_TOKEN, OPENAI_API_KEY } = process.env;

// OpenAI client
const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

// Astra DB client
const client = new DataAPIClient(ASTRA_DB_APPLICATION_TOKEN!);
const db = client.db(ASTRA_DB_API_ENDPOINT!, { keyspace: "default_keyspace" });

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // Latest user message text
    const latestMessage = messages[messages.length - 1]?.parts?.[0]?.text || "";

    // Get embedding
    const embeddingRes = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: latestMessage,
    });

    const embedding = embeddingRes.data[0].embedding;

    // Query Astra DB
    let docContext = "";
    try {
      const collection = await db.collection("f1gpt");
      const cursor = collection.find({}, { sort: { $vector: embedding }, limit: 10 });
      const documents = await cursor.toArray();
      const docsMap = documents?.map((doc) => doc.text);
      docContext = JSON.stringify(docsMap);
    } catch (error) {
      console.error("Error querying Astra DB:", error);
      docContext = "";
    }

    // System prompt template
    const template = {
      role: "system" as const,
      parts: [
        {
          type: "text" as const,
          text: `
You are an AI assistant who knows everything about Formula One. Use the below context to augment your answers. 

----------------
QUESTION: ${latestMessage}
CONTEXT: ${docContext}
----------------
          `,
        },
      ],
    };

    // Stream response via AI SDK
    const result = await streamText({
      model: "gpt-4",
      messages: [template, ...messages],
    });

    return result.toTextStreamResponse()

  } catch (err) {
    console.error("Chat route error:", err);
    return new Response(JSON.stringify({ error: "Failed to generate response" }), { status: 500 });
  }
}
