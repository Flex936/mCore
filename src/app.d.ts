import type { DrizzleD1Database } from 'drizzle-orm/d1';
import type * as schema from '$lib/server/db/schema';
import type { User, Session } from 'better-auth';
import type { getAuth } from '$lib/server/auth';

// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		interface Platform {
			env: {
				DB: D1Database;
				// BUCKET: R2Bucket; // We will uncomment this later for file uploads!
			};
			ctx: ExecutionContext;
			caches: CacheStorage;
			cf?: IncomingRequestCfProperties;
		}

		interface Locals {
			// Session tracking for Better Auth
			user: User | null;
			session: Session | null;

			// Cloudflare injected tools
			db: DrizzleD1Database<typeof schema>;
			auth: ReturnType<typeof getAuth>;
		}

		// interface Error {}
		// interface PageData {}
		// interface PageState {}
	}
}