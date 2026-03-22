import type { Actions, PageServerLoad } from './$types';
import { error, redirect } from '@sveltejs/kit';
import { games } from '$lib/server/db/schema';

export const load: PageServerLoad = async ({ request, locals }) => {
    const sessionData = await locals.auth.api.getSession({
        headers: request.headers,
    });

    if (!sessionData?.user) {
        return redirect(302, '/login');
    }

    if (sessionData.user.role !== 'admin') {
        return error(403, 'You do not have permission to view this page.');
    }

    return {
        user: sessionData.user
    };
};

export const actions: Actions = {
    uploadGame: async ({ request, locals }) => {
        const formData = await request.formData();

        const name = formData.get('name') as string;
        const size = Number(formData.get('size'));

        await locals.db.insert(games).values({
            name: name,
            size: size,
            compressedSize: size,
            path: 'https://via.placeholder.com/150',
            thumbnail: 'https://via.placeholder.com/150',
            createdAt: new Date(),
            updatedAt: new Date()
        });

        return { success: true };
    }
};