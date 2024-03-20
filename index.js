import Anthropic from "@anthropic-ai/sdk";
import readline from "readline";

// import { messages, system } from "./prompts/worldsim.js";
const system = "";
const messages = [];

const anthropic = new Anthropic({
  apiKey: "get-your-own",
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let multilineMode = false;
let codeInput = "";
let userInput = "";

async function sendMessage(input) {
  if (input.trim() === "") {
    rl.prompt();
    return;
  }

  messages.push({
    role: "user",
    content: [{ type: "text", text: input }],
  });

  console.log("messages", JSON.stringify(messages, null, 2));

  const response = await anthropic.messages.create({
    model: "claude-3-opus-20240229",
    max_tokens: 4000,
    temperature: 0,
    system: system,
    messages: messages,
  });

  if (response.content) {
    console.log(response.content[0].text);
    messages.push({
      role: "assistant",
      content: response.content,
    });
  }

  userInput = "";
  rl.prompt();
}

console.log("Welcome to the Anthropic Claude CLI chat!");
console.log("Type your message and press Enter to send.");
console.log("Type 'exit' to quit the chat.");
console.log("Type '```' to enter/exit multiline input mode.");
console.log("Press Enter after '```' to send the message.\n");

rl.prompt();

rl.on("line", async (input) => {
  if (input.toLowerCase() === "exit") {
    console.log("Goodbye!");
    process.exit(0);
  } else if (input === "```") {
    multilineMode = !multilineMode;
    if (multilineMode) {
      console.log("Entered multiline input mode.");
    } else {
      console.log("Exited multiline input mode.");
      userInput += `<code>${codeInput}</code>`;
      codeInput = "";
    }
    rl.prompt();
  } else {
    if (multilineMode) {
      codeInput += input + "\n";
      rl.prompt();
    } else {
      userInput += input;
      if (input.endsWith("```")) {
        multilineMode = true;
        console.log("Entered multiline input mode.");
        rl.prompt();
      } else {
        await sendMessage(userInput);
      }
    }
  }
});
