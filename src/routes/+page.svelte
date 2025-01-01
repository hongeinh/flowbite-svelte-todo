<script>
    import TodoApp from "$lib/components/TodoApp.svelte";
    import { Provider } from "svelte-redux";
    import { store } from "../lib/store";
</script>

<svelte:head>
    <title>Home</title>
    <meta name='Svelte introduction' content='Svelte demo app'/>
</svelte:head>

<Provider store={store}>
    <TodoApp />
</Provider>