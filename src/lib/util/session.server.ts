import sql, { type Session, type User } from '$lib/db'
import { ulid } from 'ulid'

export const COOKIE_NAME = 'session_id'

export const COOKIE_OPTS = {
	path: '/',
	httpOnly: true,
	sameSite: 'strict',
	maxAge: 2592000 /* 1 mo */
} as const

export async function get(sessionId: string): Promise<User | null> {
	const [session] = await sql<Session[]>`SELECT * FROM sessions WHERE id = ${sessionId}`
	if (session && session.expires_at > new Date()) {
		const [user] = await sql<User[]>`SELECT * FROM users WHERE id = ${session.user_id}`
		return user ?? null
	}
	return null
}

export async function save(userId: string, exp?: Date): Promise<Session['id']> {
	const sessionId = ulid()
	await sql`INSERT INTO sessions (id, user_id, expires_at) VALUES (${sessionId}, ${userId}, ${exp || sql`NOW() + INTERVAL '1 day'`})`
	return sessionId
}

export async function del(sessionId: string): Promise<void> {
	await sql`DELETE FROM sessions WHERE id = ${sessionId}`
}
