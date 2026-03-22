import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';

export const actions: Actions = {
    default: async ({ request, locals }) => {
        try {
            await locals.auth.api.signOut({
                headers: request.headers,
            });
        } catch (error) {
            return fail(500, { message: 'Unexpected error during logout' });
        }

        return redirect(302, '/');
    },
};