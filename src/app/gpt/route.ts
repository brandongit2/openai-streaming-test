import {OpenAIStream, StreamingTextResponse} from "ai"
import OpenAI from "openai"

const openAi = new OpenAI()

export async function POST(request: Request): Promise<Response> {
	const {prompt} = await request.json()
	const response = await openAi.chat.completions.create({
		model: `gpt-4`,
		messages: [{role: `user`, content: prompt}],
		stream: true,
	})

	const stream = OpenAIStream(response)
	return new StreamingTextResponse(stream)
}
