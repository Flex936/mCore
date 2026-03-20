import type { LayoutServerLoad } from './$types';
import { auth } from '$lib/server/auth';

export const load: LayoutServerLoad = async ({ request }) => {
    const sessionData = await auth.api.getSession({
        headers: request.headers,
    });

    return {
        user: sessionData?.user || null,
        session: sessionData?.session || null,
    };
};