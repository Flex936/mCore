<script lang="ts">
    import { authClient } from "$lib/auth-client";
    import { resolve } from "$app/paths";

    let name = $state("");
    let email = $state("");
    let password = $state("");
    let errorMessage = $state("");
    let loading = $state(false);

    async function handleRegister(e: Event) {
        e.preventDefault();
        loading = true;
        errorMessage = "";

        const { error } = await authClient.signUp.email({
            email,
            password,
            name,
        });

        if (error) {
            errorMessage = error.message || "Failed to register.";
            loading = false;
        } else {
            window.location.href = "/";
        }
    }
</script>

<div
    class="max-w-md mx-auto mt-20 p-8 bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl shadow-black/50"
>
    <div class="text-center mb-8">
        <h1 class="text-3xl font-black text-white tracking-wider mb-2">
            Join the Vault
        </h1>
        <p class="text-gray-400">
            Create an account to download games and saves.
        </p>
    </div>

    <form onsubmit={handleRegister} class="flex flex-col gap-5">
        <div>
            <label
                for="name"
                class="block text-sm font-medium text-gray-400 mb-1"
                >Display Name</label
            >
            <input
                id="name"
                type="text"
                bind:value={name}
                required
                class="w-full px-4 py-3 bg-gray-950 border border-gray-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder-gray-600"
                placeholder="Master Chief"
            />
        </div>

        <div>
            <label
                for="email"
                class="block text-sm font-medium text-gray-400 mb-1"
                >Email Address</label
            >
            <input
                id="email"
                type="email"
                bind:value={email}
                required
                class="w-full px-4 py-3 bg-gray-950 border border-gray-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder-gray-600"
                placeholder="chief@unsc.gov"
            />
        </div>

        <div>
            <label
                for="password"
                class="block text-sm font-medium text-gray-400 mb-1"
                >Password</label
            >
            <input
                id="password"
                type="password"
                bind:value={password}
                required
                class="w-full px-4 py-3 bg-gray-950 border border-gray-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder-gray-600"
                placeholder="••••••••"
            />
        </div>

        {#if errorMessage}
            <div
                class="bg-red-500/10 border border-red-500/50 text-red-400 p-3 rounded-lg text-sm text-center"
            >
                {errorMessage}
            </div>
        {/if}

        <button
            type="submit"
            disabled={loading}
            class="mt-2 w-full bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition-all shadow-lg shadow-blue-500/20"
        >
            {loading ? "Creating Account..." : "Register"}
        </button>

        <p class="text-center text-gray-500 mt-4 text-sm">
            Already have an account?
            <a
                href={resolve("/login")}
                class="text-blue-500 hover:text-blue-400 transition font-medium"
                >Log in</a
            >
        </p>
    </form>
</div>
