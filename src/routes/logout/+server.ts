import type { RequestHandler } from './$types'
import * as session from '$lib/util/session.server'

export const GET: RequestHandler = async ({ cookies, locals, url }) => {
	const sid = cookies.get(session.COOKIE_NAME)
	if (sid) session.del(sid)
	if (locals.user) delete locals.user
	return Response.redirect(url.origin, 302)
}
