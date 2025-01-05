<script>
    import TodoApp from "$lib/components/TodoApp.svelte";
</script>

<svelte:head>
    <title>Home</title>
    <meta name='Svelte introduction' content='Svelte demo app'/>
</svelte:head>

<div class="flex flex-cols justify-center font-sans bg-indigo-50 p-6 shadow-lg w-[30%" mx-auto mt-16>
    <TodoApp />
</div>