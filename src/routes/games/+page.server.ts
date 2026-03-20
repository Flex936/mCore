import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { games } from '$lib/server/db/schema';
import { desc } from 'drizzle-orm';

export const load: PageServerLoad = async () => {
    const fetchedGames = await db
        .select()
        .from(games)
        .orderBy(desc(games.createdAt));

    return {
        games: fetchedGames
    };
};