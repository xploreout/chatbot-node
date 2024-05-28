import OpenAI from 'openai'
import colors from 'colors'
import readLineSync from 'readline-sync'

const openAi = new OpenAI()

async function main() {
  console.log(colors.bold.green('Here is the chat-bot...'))
  console.log(colors.bold.green('You can start chatting..'))

  const chatHistory = []

  const userName = readLineSync.question('May I have your name, please  ')
  console.log(`Hi ${userName}, how can I help?`)

  while (true) {
    const userInput = readLineSync.question(colors.yellow(`${userName}:  `))
    const messages = chatHistory.map(([role, content]) => ({ role, content }))
    messages.push({ role: 'user', content: userInput })
    try {
      const chatComplete = await openAi.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: messages,
      })
      if (userInput.toLowerCase() === 'exit') {
        console.log(
          colors.green('Bot:  ') + chatComplete.choices[0].message.content
        )
        return
      }
      console.log(
        colors.green('Bot:  ') + chatComplete.choices[0].message.content
      )
      chatHistory.push(['user', userInput])
      chatHistory.push(['assistant', chatComplete.choices[0].message.content])
    } catch (error) {
      console.error(colors.red(error))
    }
  }
}

main()
