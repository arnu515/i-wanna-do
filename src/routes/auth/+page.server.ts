import { fail, redirect } from '@sveltejs/kit'
import type { Actions } from './$types'
import * as v from 'valibot'
import sql, { type User } from '$lib/db'
import { ulid } from 'ulid'
import * as session from '$lib/util/session.server'

export const actions: Actions = {
	default: async ({ request, cookies, locals }) => {
		const fd = await request.formData()
		const signUpStr = fd.get('signup')
		const signUp = signUpStr === 'true' ? true : signUpStr === 'false' ? false : undefined
		const res = v.safeParse(
			v.pipe(
				v.string('Email must be a string'),
				v.email('Email is not valid'),
				v.trim(),
				v.minLength(8, 'Email must be atleast 8 characters long'),
				v.maxLength(511, 'Email must be atmost 511 characters long')
			),
			fd.get('email')
		)
		if (!res.success) return fail(400, { errors: res.issues.map(i => i.message) })
		const email = res.output

		if (typeof signUp === 'undefined')
			try {
				const [user] = await sql<User[]>`SELECT * FROM users WHERE email = ${email}`
				if (!user) return { signUp: true, email }
				if (user.provider === 'password') return { signUp: false, email }
				return fail(502, { errors: ['Not implemented'] })
			} catch (e) {
				if (e instanceof Error) return fail(500, { email, errors: [e.message] })
				else return fail(500, { email, errors: ['An unknown error occured'] })
			}

		const pwRes = v.safeParse(
			v.pipe(
				v.string('Password must be a string'),
				v.minLength(8, 'Password must be atleast 8 characters long'),
				v.maxLength(511, 'Password must be atmost 511 characters long')
			),
			fd.get('password')
		)
		if (!pwRes.success)
			return fail(400, { signUp, email, errors: pwRes.issues.map(i => i.message) })
		if (signUp) {
			try {
				const userId = ulid()
				const username = res.output.split('@')[0]
				const pwHash = await Bun.password.hash(pwRes.output)
				const [user] = await sql<
					User[]
				>`INSERT INTO users ${sql({ id: userId, email: res.output, password: pwHash, provider: 'password', provider_id: null, username })} RETURNING *`
				if (!user) return fail(400, { errors: 'DB did not return user', email })
				const sid = await session.save(user.id)
				cookies.set(session.COOKIE_NAME, sid, session.COOKIE_OPTS)
				locals.user = user
			} catch (e) {
				console.error(e)
				if (e instanceof Error) return fail(500, { email, signUp, errors: [e.message] })
				else return fail(500, { email, signUp, errors: ['An unknown error occured'] })
			}
		} else {
			try {
				const [user] = await sql<User[]>`SELECT * FROM users WHERE email = ${res.output}`
				if (!user) return fail(400, { email, errors: ['Invalid email'] })
				if (user.provider !== 'password')
					return fail(400, {
						errors: `You cannot login with a password. You must login using ${user.provider}`,
						email
					})
				if (!(await Bun.password.verify(pwRes.output, user.password!)))
					return fail(400, { errors: 'Invalid password', email, signUp })
				const sid = await session.save(user.id)
				cookies.set(session.COOKIE_NAME, sid, session.COOKIE_OPTS)
				locals.user = user
			} catch (e) {
				if (e instanceof Error) return fail(500, { email, signUp, errors: [e.message] })
				else return fail(500, { email, signUp, errors: ['An unknown error occured'] })
			}
		}
		redirect(302, '/')
	}
}
