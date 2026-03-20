<script lang="ts">
	import "./layout.css";
	import favicon from "$lib/assets/favicon.svg";
	import { resolve } from "$app/paths";
	import { enhance } from "$app/forms";
	import { page } from "$app/state";

	let { children } = $props();
</script>

<nav class="flex gap-4 p-2">
	<a
		href={resolve("/")}
		class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded cursor-pointer"
	>
		Home
	</a>
	{#if !page.data.user}
		<a
			href={resolve("/login")}
			class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded cursor-pointer"
		>
			Login
		</a>
	{:else}
		<form method="post" action="/logout" use:enhance>
			<button
				type="submit"
				class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded cursor-pointer"
			>
				Logout
			</button>
		</form>
	{/if}
</nav>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>mCore</title>
</svelte:head>
{@render children()}
