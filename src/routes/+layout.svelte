<script lang="ts">
    import "../app.css";
    import {
        AppShell,
        LightSwitch,
        AppBar,
        Avatar,
        Modal,
    } from "@skeletonlabs/skeleton";
    import { signIn, signOut } from "@auth/sveltekit/client";
    import { page } from "$app/stores";
    import { initializeStores, getModalStore } from "@skeletonlabs/skeleton";
    initializeStores();
    const modalStore = getModalStore();
    export let data;
</script>

<Modal />
<AppShell>
    <slot />
    <AppBar slot="header">
        <p slot="lead">Notes</p>
        <svelte:fragment slot="trail">
            <LightSwitch />
            {#if $page.data.session?.user}
                <!-- <p>Signed in as {$page.data.session.user.email}</p> -->
                <button
                    type="button"
                    class="btn variant-outline"
                    on:click={signOut}>Sign out</button
                >
                <Avatar src={$page.data.session?.user?.image || undefined} />
            {:else}
                <p>Not signed in.</p>
                <button
                    on:click={() => signIn("github")}
                    type="button"
                    class="btn variant-filled">Sign in</button
                >
            {/if}
        </svelte:fragment>
    </AppBar>
    <svelte:fragment slot="sidebarLeft">
        <!-- Insert the list: -->
        <nav class="list-nav">
            <ul>
                <li class="list-item">
                    <button
                        type="button"
                        class="btn variant-outline list-item"
                        on:click={() =>
                            modalStore.trigger({
                                type: "prompt",
                                title: "create a new note",
                                value: "note name",
                                response: async (r) => {
                                    if (r) {
                                        const res = await fetch("/", {
                                            method: "post",
                                            body: r,
                                        });
                                        const json = await res.json();
                                        data.notes.push({
                                            id: json.id,
                                            title: json.title,
                                        });
                                        data = data;
                                    }
                                },
                                valueAttr: { type: "text", required: true },
                            })}
                        ><svg
                            class="w-6 h-6 text-gray-800 dark:text-white"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 18 18"
                        >
                            <path
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M9 1v16M1 9h16"
                            />
                        </svg></button
                    >
                </li>
                {#each data.notes as note}
                    <li class="list-item">
                        <a href={note.id}>{note.title}</a>
                    </li>
                {/each}
            </ul>
        </nav>
        <!-- --- -->
    </svelte:fragment>
</AppShell>
