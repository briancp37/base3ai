// require('dotenv').config();

import { config } from "dotenv";
config()
import { ChatOpenAI } from "@langchain/openai";
// import { ChatOpenAI } from "@langchain/chatmodels/openai";
import { PromptTemplate } from "@langchain/core/prompts";

// const llm = new OpenAI({ 
//   apiKey: process.env.OPENAI_API_KEY,
//   temperature: 0 
// });
console.log(process.env.OPENAI_API_KEY);

const model = new ChatOpenAI({ 
    apiKey: process.env.OPENAI_API_KEY,
    temperature: 0 
});

const promptTemplate = PromptTemplate.fromTemplate(
  "Tell me a joke about {topic}"
);

const chain = promptTemplate.pipe(model);

const result = await chain.invoke({ topic: "bears" });

console.log(result);

/*
  AIMessage {
    content: "Why don't bears wear shoes?\n\nBecause they have bear feet!",
  }
*/