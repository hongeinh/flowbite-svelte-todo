<!-- TODO -->
<script>
    let name = "";
    let email = "";
    let password = "";

    async function handleSubmit(event) {
        event.preventDefault();

        if (name && email && password) {
            const newUser = {
                name: name,
                email: email,
                password: password
            }
        } else {
            alert("Please fill in all information!");
        }
        
    }
</script>

<div>
    <h1>Get Started Now</h1>
    <form onsubmit={handleSubmit}>
        <label for="name">Name</label>
        <input id="name" bind:value={name} placeholder="Enter your name">
        <label for="email">Email address</label>     
        <input id="email" bind:value={email} placeholder="Enter your email">
        <label for="password">Password</label>     
        <input id="password" bind:value={password} placeholder="Enter your password">
        <button type="submit" class="px-4 py-2 rounded-lg bg-indigo-500 text-white">Register</button>
    </form>
</div>