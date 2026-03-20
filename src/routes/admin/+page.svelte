<script lang="ts">
    import { enhance } from "$app/forms";
    let { data, form } = $props();
</script>

<div
    class="max-w-xl mx-auto mt-10 p-6 bg-white border border-gray-200 rounded-lg shadow"
>
    <h1 class="text-2xl font-bold mb-2">Admin Dashboard</h1>
    <p class="text-gray-600 mb-6">
        Welcome back, {data.user.name}. Upload a new game below.
    </p>

    {#if form?.success}
        <div
            class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4"
        >
            Game successfully added to the database!
        </div>
    {/if}

    <form
        method="POST"
        action="?/uploadGame"
        use:enhance
        class="flex flex-col gap-4"
    >
        <div>
            <label for="name" class="block text-sm font-medium text-gray-700"
                >Game Name</label
            >
            <input
                type="text"
                id="name"
                name="name"
                required
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2"
                placeholder="e.g. Super Awesome Game"
            />
        </div>

        <div>
            <label for="size" class="block text-sm font-medium text-gray-700"
                >File Size (bytes)</label
            >
            <input
                type="number"
                id="size"
                name="size"
                required
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2"
                placeholder="1048576"
            />
        </div>

        <button
            type="submit"
            class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
        >
            Save Game Metadata
        </button>
    </form>
</div>
