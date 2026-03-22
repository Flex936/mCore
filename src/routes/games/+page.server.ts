import type { PageServerLoad } from './$types';
import { games } from '$lib/server/db/schema';
import { desc } from 'drizzle-orm';

export const load: PageServerLoad = async ({ locals }) => {
    const fetchedGames = await locals.db
        .select()
        .from(games)
        .orderBy(desc(games.createdAt));

    return {
        games: fetchedGames
    };
};