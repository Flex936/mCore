import type { Handle } from '@sveltejs/kit';
import { building } from '$app/environment';
import { svelteKitHandler } from 'better-auth/svelte-kit';
import { getAuth } from '$lib/server/auth';
import { getDb } from '$lib/server/db/index';

export const handle: Handle = async ({ event, resolve }) => {
	if (building) {
		return resolve(event);
	}

	// 2. Ensure Cloudflare bindings are injected before trying to connect
	if (event.platform?.env?.DB) {
		// Initialize DB and Auth dynamically for this specific web request
		event.locals.db = getDb(event.platform.env);
		event.locals.auth = getAuth(event.platform.env);

		// 3. Fetch the session using our newly created dynamic auth instance
		const sessionData = await event.locals.auth.api.getSession({
			headers: event.request.headers
		});

		if (sessionData) {
			event.locals.session = sessionData.session;
			event.locals.user = sessionData.user;
		} else {
			event.locals.session = null;
			event.locals.user = null;
		}

		// 4. Pass the dynamic auth instance into Better Auth's handler
		return svelteKitHandler({
			event,
			resolve,
			auth: event.locals.auth,
			building
		});
	}

	// Fallback just in case bindings are missing (like during testing)
	return resolve(event);
};