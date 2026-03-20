<script lang="ts">
    let { data } = $props();
</script>

<div class="flex flex-col gap-4 max-w-2xl mx-auto p-4">
    {#each data.games as game (game.id)}
        <div
            class="border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col gap-2"
        >
            <img
                src={game.thumbnail}
                alt={game.name}
                class="w-full h-48 object-cover rounded"
            />

            <div class="flex justify-between items-center">
                <h2 class="text-xl font-bold">{game.name}</h2>
                <span class="text-sm text-gray-500">{game.size} bytes</span>
            </div>

            <div class="text-sm text-gray-400">
                <p>Uploaded: {new Date(game.createdAt).toLocaleDateString()}</p>
            </div>

            <a
                href={game.path}
                download={game.name}
                class="mt-4 w-full text-center bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded transition-colors"
            >
                Download Game
            </a>
        </div>
    {/each}
</div>
