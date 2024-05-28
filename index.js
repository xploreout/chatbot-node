import dotenv from 'dotenv'
import './config/.env'
import OpenAI from 'openai'

dotenv.config()

// const secretKey = process.env.OPENAI_KEY

// const configuration = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// })

const openAi = new OpenAI()

async function main() {
  // const chat2 = OpenAI(configuration)
  const chatComplete = await openAi.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'user',
        content: 'what is capital of china?',
      },
    ],
  })
  console.log(chatComplete.choices[0].message)
}

main()
