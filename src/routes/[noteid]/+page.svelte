<script lang="ts">
    import { onMount } from "svelte";
    import type { PageData } from "./$types";
    import { parse } from "marked";
    import { page } from "$app/stores";
    export let data: PageData;
    let isRendered = true;
    onMount(() => {
        document.addEventListener("keydown", (e) => {
            if (e.ctrlKey && e.key === "e") {
                isRendered = !isRendered;
            }
        });
    });
    let saveStaus: Promise<Response>;
    const timeouts: NodeJS.Timeout[] = [];
    $: {
        timeouts.forEach((id) => clearTimeout(id));
        timeouts.push(
            setTimeout(() => {
                saveStaus = fetch($page.url.href, {
                    method: "put",
                    body: data.note.text,
                });
            }, 800)
        );
    }
</script>

<svelte:head>
    <title>{data.note.title}</title>
</svelte:head>
<p>
    {#await saveStaus}
        saving...
    {:then res}
        saved
    {/await}
</p>
<main class="h-full overflow-scroll">
    {#if isRendered}
        {@html parse(data.note.text || "# Press ctrl+e to edit")}
    {:else}
        <textarea
            class="textarea h-full"
            placeholder="edit"
            bind:value={data.note.text}
        />
    {/if}
</main>
<div>
    <style lang="scss">
        main {
            h1 {
                @apply h1;
            }
            h2 {
                @apply h2;
            }
            h3 {
                @apply h3;
            }
            h4 {
                @apply h4;
            }
            h5 {
                @apply h5;
            }
            h6 {
                @apply h6;
            }
            a {
                @apply anchor;
            }
            blockquote {
                @apply blockquote;
            }
            code {
                @apply code;
            }
            ul {
                @apply list;
            }
            ol {
                @apply list;
            }
        }
    </style>
</div>
