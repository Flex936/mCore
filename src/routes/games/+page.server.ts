import type { PageServerLoad } from './$types';
import { games } from '$lib/server/db/schema';
import { desc } from 'drizzle-orm';

export const load: PageServerLoad = async ({ locals }) => {
    if (!locals.db) {
        console.error("CRITICAL: Database binding 'DB' is missing from the environment!");
        return {
            games: []
        };
    }

    try {
        const fetchedGames = await locals.db
            .select()
            .from(games)
            .orderBy(desc(games.createdAt));

        return {
            games: fetchedGames
        };
    } catch (error) {
        console.error("Failed to fetch games:", error);
        return {
            games: []
        };
    }
};