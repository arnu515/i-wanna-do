import postgres from 'postgres'
import { env } from '$env/dynamic/private'

const sql = postgres(env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/i-wanna-do')

export default sql

export type Provider = 'password' | 'github' | 'gitlab' | 'discord'

export type SafeUser = {
	id: string
	username: string
	email: string
	created_at: Date
}

export type User = SafeUser &
	(
		| {
				provider: 'password'
				password: string
				provider_id: null
		  }
		| {
				provider: Omit<Provider, 'password'>
				provider_id: string
				password: null
		  }
	)

export type Session = {
	id: string
	user_id: User['id']
	created_at: Date
	expires_at: Date
}
