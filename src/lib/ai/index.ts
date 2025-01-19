import { env } from '$env/dynamic/private'

/** In order of preference */
export const ALLOWED_MODELS = [
	'gpt-4o',
	'Meta-Llama-3.1-70B-Instruct',
	'Mistral-large',
	'gpt-4o-mini',
	'Meta-Llama-3-8B-Instruct',
	'Mistral-small'
] as const

export type Message = {
	role: 'user' | 'system' | 'assistant'
	content: string
}

export type DoChatR =
	| {
			error: undefined
			messages: Message[]
	  }
	| {
			error: 'ratelimit'
			/** in seconds */
			timeRemaining: number
			type: 'minute' | 'day'
	  }
	| {
			error: 'other'
			status: number
			message: string
	  }

export async function doChat(
	model: (typeof ALLOWED_MODELS)[number],
	messages: Message[]
): Promise<DoChatR> {
	try {
		const res = await fetch(env.AI_COMPLETIONS_URL, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${env.GITHUB_TOKEN}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				messages,
				model
			})
		})
		if (res.status === 429) {
			const timeRemaining = Number(res.headers.get('retry-after'))
			const rateLimitType = res.headers.get('x-ratelimit-type') ?? 'minute'
			return {
				error: 'ratelimit',
				timeRemaining,
				type: rateLimitType.includes('minute') ? 'minute' : 'day'
			}
		}
		const data = await res.json()
		console.log(data)
		if (!res.ok) {
			console.error(res.status, data)
			return {
				error: 'other',
				status: res.status,
				message: data.error?.message || data.message || data.error || 'Unknown error'
			}
		}
		return {
			error: undefined,
			messages: data.choices.map(
				({
					message: { content, role }
				}: {
					message: { role: 'assistant' | 'user'; content: string }
				}) => ({ role, content })
			)
		}
	} catch (e) {
		console.error(e)
		if (e instanceof Error)
			return {
				error: 'other',
				message: e.message,
				status: 500
			}
		return { error: 'other', message: 'Unknown error', status: 500 }
	}
}
