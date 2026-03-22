<script lang="ts">
    let { data } = $props();

    // Quick helper to make 1048576 bytes look like "1.00 MB"
    function formatBytes(bytes: number) {
        if (bytes === 0) return "0 Bytes";
        const k = 1024;
        const sizes = ["Bytes", "KB", "MB", "GB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
    }
</script>

<div class="mb-8">
    <h1 class="text-3xl font-bold text-white mb-2">Game Library</h1>
    <p class="text-gray-400">Download games and save files.</p>
</div>

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {#each data.games as game (game.id)}
        <div
            class="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden hover:border-blue-500/50 transition-colors group flex flex-col"
        >
            <div
                class="aspect-video w-full bg-gray-800 overflow-hidden relative"
            >
                {#if game.thumbnail}
                    <img
                        src={game.thumbnail}
                        alt={game.name}
                        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                {:else}
                    <div
                        class="flex items-center justify-center w-full h-full text-gray-600 font-bold text-2xl"
                    >
                        NO IMAGE
                    </div>
                {/if}
            </div>

            <div class="p-5 flex flex-col grow">
                <h2
                    class="text-xl font-bold text-white mb-1 truncate"
                    title={game.name}
                >
                    {game.name}
                </h2>
                <div
                    class="flex justify-between items-center text-sm text-gray-400 mb-4"
                >
                    <span>{formatBytes(game.size)}</span>
                    <span>{new Date(game.createdAt).toLocaleDateString()}</span>
                </div>

                <div class="mt-auto flex flex-col gap-2">
                    <a
                        href={game.path}
                        download
                        class="w-full text-center bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2.5 px-4 rounded-lg transition shadow-lg shadow-blue-500/20"
                    >
                        Download Game
                    </a>

                    {#if game.savePath}
                        <a
                            href={game.savePath}
                            download
                            class="w-full text-center bg-gray-800 hover:bg-gray-700 text-gray-300 font-medium py-2 px-4 rounded-lg border border-gray-700 transition"
                        >
                            Download Save File
                        </a>
                    {/if}
                </div>
            </div>
        </div>
    {/each}
</div>

{#if data.games.length === 0}
    <div
        class="text-center py-20 bg-gray-900 border border-gray-800 rounded-xl"
    >
        <h3 class="text-xl font-bold text-gray-300 mb-2">The vault is empty</h3>
        <p class="text-gray-500">
            Log into the admin panel to upload your first game.
        </p>
    </div>
{/if}
