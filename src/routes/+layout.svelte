<script lang="ts">
	import "./layout.css";
	import favicon from "$lib/assets/favicon.svg";
	import { resolve } from "$app/paths";
	import { enhance } from "$app/forms";
	import { page } from "$app/state";

	let { children } = $props();
</script>

<div
	class="min-h-screen bg-gray-950 text-gray-100 font-sans selection:bg-blue-500 selection:text-white"
>
	<nav
		class="sticky top-0 z-50 bg-gray-900/80 backdrop-blur-md border-b border-gray-800 p-4"
	>
		<div class="max-w-6xl mx-auto flex justify-between items-center">
			<div class="flex gap-6 items-center">
				<a
					href={resolve("/")}
					class="text-xl font-black tracking-wider text-white flex items-center gap-2"
				>
					<span class="text-blue-500">m</span>Core
				</a>
				<a
					href={resolve("/games")}
					class="text-gray-400 hover:text-white transition font-medium"
					>Library</a
				>

				{#if page.data.user?.role === "admin"}
					<a
						href={resolve("/admin")}
						class="text-gray-400 hover:text-blue-400 transition font-medium"
						>Admin</a
					>
				{/if}
			</div>

			<div class="flex gap-4 items-center">
				{#if !page.data.user}
					<a
						href={resolve("/login")}
						class="text-gray-400 hover:text-white transition font-medium"
						>Login</a
					>
					<a
						href={resolve("/register")}
						class="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded-lg font-medium transition shadow-lg shadow-blue-500/20"
						>Sign Up</a
					>
				{:else}
					<span class="text-gray-400 text-sm hidden md:block"
						>Welcome, <span class="text-white font-semibold"
							>{page.data.user.name}</span
						></span
					>
					<form method="post" action="/logout" use:enhance>
						<button
							type="submit"
							class="bg-gray-800 hover:bg-red-500/10 hover:text-red-400 text-gray-300 border border-gray-700 hover:border-red-500/50 px-5 py-2 rounded-lg font-medium transition"
						>
							Logout
						</button>
					</form>
				{/if}
			</div>
		</div>
	</nav>

	<main class="max-w-6xl mx-auto p-4 py-8">
		{@render children()}
	</main>
</div>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>mCore Vault</title>
</svelte:head>
