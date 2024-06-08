// import { config } from "dotenv";
// config();
require('dotenv').config();

const { SimpleSequentialChain, LLMChain } = require("langchain/chains");
const { Configuration, OpenAI } = require("@langchain/openai");
const { PromptTemplate } = require("@langchain/core/prompts");

// const LLMChain = require("langchain/chains");
// const OpenAI = require("langchain/llms/openai");
// const PromptTemplate = require("langchain/prompts");

// import { SimpleSequentialChain, LLMChain } from "langchain/chains";
// import { OpenAI } from "langchain/llms/openai";
// import { PromptTemplate } from "langchain/prompts";

// const configuration = new Configuration({
//     apiKey: process.env.API_KEY,
// });
const llm = new OpenAI({ 
    apiKey: process.env.OPENAI_API_KEY,
    temperature: 0 
});

const responseTemplate1 = `
You are a helpful bot that creates a 'thank you' response text.
If customers are unsatisfied, offer them a real world assistant to talk to.
You will get a sentiment and subject as input and evaluate.

text: {input}
`;

const responseTemplate2 = `
You are an assistant bot. Your job is to make the customer feel heard and understood.
Reflect on the input you receive.

text: {input}
`;

const reviewPromptTemplate1 = new PromptTemplate({
  template: responseTemplate1,
  inputVariables: ["input"],
});

const reviewPromptTemplate2 = new PromptTemplate({
  template: responseTemplate2,
  inputVariables: ["input"],
});

const reviewChain1 = new LLMChain({ llm, prompt: reviewPromptTemplate1 });
const reviewChain2 = new LLMChain({ llm, prompt: reviewPromptTemplate2 });

const overallChain = new SimpleSequentialChain({
  chains: [reviewChain1, reviewChain2],
  verbose: true,
});

async function runChain() {
    const result = await overallChain.run({
        input: "I ordered Pizza Salami and it was awful!",
    });
    console.log(result);
}

runChain();  

// const result = await overallChain.run({
//   input: "I ordered Pizza Salami and it was awful!",
// });
// console.log(result);