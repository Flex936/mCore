import { createAuthClient } from "better-auth/client";

export const authClient = createAuthClient({
    // It automatically detects your base URL, so this works locally and in production!
});