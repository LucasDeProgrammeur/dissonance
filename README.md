# dissonance
## This is boilerplate to quickly get a bot up and running
it contains a Help command and a /sayhello command, to have the bot say hello to you.

## How do I create a bot in the Discord developer portal?
Create a new Application at https://discord.com/developers/. Now you can move over to the "bot" section, and grab your Token. Just so you know, it can only be viewed once, and it needs to be regenerated if you need to view it again. The Application ID is also necessary. This is shown in the "General Information" tab and can always be seen.

## How do I get the bot inside a server?
In the OAuth2 section on the left, go to URL generator. You need the "bot" permission and "application.commands" permission, to use the slash commands. You can then specify bot-specific permissions. "Administrator" will grant all the permissions below.

## Remember the token we just copied?
Create an .env file in the root directory of this repository, and add variables like so:\
TOKEN=...\
APPLICATIONID=...\

## Prerequisites for running this bot boilerplate
* NodeJS

In a command terminal, cd the folder where you've cloned the repository, you can now run "npm install", and "npm start" thereafter.
