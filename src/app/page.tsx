"use client"

import {useState} from "react"

import type {ReactElement} from "react"

export default function App(): ReactElement | null {
	const [input, setInput] = useState(``)
	const [response, setResponse] = useState(``)
	const [streaming, setStreaming] = useState(false)
	const [error, setError] = useState(false)

	const sendRequest = async (prompt: string) => {
		setError(false)

		let res: Response
		try {
			res = await fetch(`/gpt`, {
				method: `POST`,
				headers: {
					"Content-Type": `application/json`,
				},
				body: JSON.stringify({prompt}),
			})
		} catch {
			setError(true)
			return
		}
		if (!res.ok || !res.body) {
			setError(true)
			return
		}

		setStreaming(true)

		const reader = res.body.getReader()
		const decoder = new TextDecoder()
		reader.read().then(function processStream({done, value}) {
			if (done) {
				setStreaming(false)
				return
			}

			const text = decoder.decode(value)
			setResponse((prev) => prev + text)
			reader.read().then(processStream)
		})
	}

	return (
		<div className="w-full h-full flex justify-center">
			<div className="h-[calc(100%-3rem)] w-full max-w-3xl gap-4 flex items-start justify-between my-6 max-h-[40rem] mx-auto">
				<form
					onSubmit={(e) => {
						e.preventDefault()
						setResponse(``)
						sendRequest(input)
					}}
					className="flex flex-col gap-4 self-center basis-72 shrink-0"
				>
					<label>
						<span className="text-neutral-500 text-sm">Enter prompt:</span>
						<br />
						<textarea
							rows={4}
							value={input}
							onChange={(e) => {
								setInput(e.target.value)
								setError(false)
							}}
							className="border rounded w-full resize-y"
						/>
					</label>
					<input
						type="submit"
						value="Submit"
						disabled={streaming}
						className="border bg-neutral-50 rounded disabled:text-neutral-300"
					/>
					{error && <p className="text-red-500 text-sm">An error occured. Please try again.</p>}
				</form>
				<div className="grow overflow-auto">
					<p className="whitespace-pre-line">{response}</p>
				</div>
			</div>
		</div>
	)
}
