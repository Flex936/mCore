<script lang="ts">
	import { enhance } from "$app/forms";
	import type { ActionData } from "./$types";
	import { resolve } from "$app/paths";

	let { form }: { form: ActionData } = $props();
	let email = $state("");
	let password = $state("");
</script>

<form method="post" action="?/signInEmail" use:enhance>
	<label>
		Email
		<input
			type="email"
			name="email"
			bind:value={email}
			class="mt-1 px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
		/>
	</label>
	<label>
		Password
		<input
			type="password"
			name="password"
			bind:value={password}
			class="mt-1 px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
		/>
	</label>
	<button
		class="bg-blue-600 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-blue-700 transition"
		>Login</button
	>
	<a
		href={resolve("/register")}
		class="text-blue-600 cursor-pointer hover:underline">Register</a
	>
</form>

<p class="text-red-500">{form?.message ?? ""}</p>
