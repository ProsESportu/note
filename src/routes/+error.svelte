<script lang="ts">
    import { page } from '$app/stores';
</script>

<h1>{$page.status}: {$page.error?.message}</h1>
<a href="/" class="anchor">Go to home</a>