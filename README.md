# Cluddite

No-frills CLI to talk to Claude. Mostly so I can feed it code.

## Usage

### Start a session

`$ npm start`

### Send code

Cluddite allows multiline input, and will wrap the input in `<code></code>` tags, as [recommended by Anthropic's Prompt Engineering guide](https://docs.anthropic.com/claude/docs/use-xml-tags).
To do so, just end your line with \``` and press "Enter".
Once you're done with multiline, just press \``` and hit "Enter" again.

For example:

````
> node index.js

Welcome to the Anthropic Claude CLI chat!
Type your message and press Enter to send.
Type 'exit' to quit the chat.
Type '```' to enter/exit multiline input mode.
Press Enter after '```' to send the message.

> hey, check out this code ```
Entered multiline input mode.
> console.log("hello")
> console.log("cluddite")
> ```
Exited multiline input mode.
> what do you think ?
messages [
  {
    "role": "user",
    "content": [
      {
        "type": "text",
        "text": "hey, check out this code ```<code>console.log(\"hello\")\nconsole.log(\"cluddite\")\n</code>what do you think ?"
      }
    ]
  }
]
````
