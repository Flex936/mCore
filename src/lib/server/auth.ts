import { betterAuth } from 'better-auth';
import { admin } from 'better-auth/plugins';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { env as privateEnv } from '$env/dynamic/private';
import * as schema from './db/schema';
import { getDb } from './db/index';

export function getAuth(env: App.Platform['env']) {
	const db = getDb(env);

	return betterAuth({
		baseURL: privateEnv.ORIGIN || 'http://localhost:5173',
		secret: privateEnv.BETTER_AUTH_SECRET,
		database: drizzleAdapter(db, {
			provider: 'sqlite',
			schema: schema
		}),
		emailAndPassword: { enabled: true },
		plugins: [
			admin()
		]
	});
}