import type { Actions } from './$types';
import { auth } from '$lib/server/auth';
import { fail, redirect } from '@sveltejs/kit';

export const actions: Actions = {
    default: async (event) => {
        try {
            await auth.api.signOut({
                headers: event.request.headers,
            });
        } catch (error) {
            return fail(500, { message: 'Unexpected error during logout' });
        }

        return redirect(302, '/');
    },
};