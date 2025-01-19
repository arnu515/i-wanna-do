import type { Handle } from '@sveltejs/kit'
import * as session from '$lib/util/session.server'

export const handle: Handle = async ({ event, resolve }) => {
	const sid = event.cookies.get(session.COOKIE_NAME)
	if (!sid) return await resolve(event)
	const user = await session.get(sid)
	if (!user) return await resolve(event)
	event.locals.user = user ?? undefined
	return await resolve(event)
}
