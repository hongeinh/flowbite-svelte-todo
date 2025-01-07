<script>
	// @ts-nocheck
	import '../app.css';
	import { onMount } from 'svelte';
	import { auth, db } from '$lib/firebase/firebase.client';
	// import { authStore, isLoggedIn } from '$lib/stores/authStore';
	import { authStore } from '$lib/stores/authStore';
	import { getDoc, setDoc, doc } from 'firebase/firestore';


	// $: {
	// 	if ($isLoggedIn) {
	// 		console.log("I'm logged in");
	// 	} else {
	// 		console.log("I'm not logged in");
	// 	}
	// }

	let displayBugBanner = true;

	let loginOrRegister = 'sign-in';
	let showLoginModal = false;
	let register = false;
	let displayLoginValidator = false;
	let forgotPassword = false;
	let registerStep = 1;

	const nonAuthRoutes = [
		'/'
	];

	// onMount(async () => {

	// 	const unsubscribe = auth.onAuthStateChanged(async (user) => {
	// 		const currentPath = window.location.pathname;

	// 		if (!user && !nonAuthRoutes.includes(currentPath)) {
	// 			window.location.href = '/';
	// 			return;
	// 		}

	// 		if (!user) {
	// 			return;
	// 		}

	// 		if (user) {
	// 			let dataToSetToStore;
	// 			const docRef = doc(db, 'users', user.uid);
	// 			const docSnap = await getDoc(docRef);
	// 			if (!docSnap.exists()) {
	// 				console.log('Creating/initializing first time User');
	// 				const userRef = doc(db, 'users', user.uid);
	// 				dataToSetToStore = {
	// 					email: user.email,
	// 					profileImage:'',
	// 					displayName: user.displayName,
	// 					uid: user.uid,
	// 					phoneNumber: '',
	// 					admin: false,
	// 					address: { streetAddress: '', unitNumber: '', state: '', city: '', zipCode: '' }
	// 				};
	// 				await setDoc(userRef, dataToSetToStore, {
	// 					merge: true
	// 				});
	// 			} else {
	// 				// console.log('Fetching User');
	// 				const userData = docSnap.data();
	// 				dataToSetToStore = userData;
	// 			}

	// 			authStore.update((curr) => {
	// 				return { ...curr, currentUser: user, data: dataToSetToStore, isLoading: false };
	// 			});
	// 		}
	// 	});
	// 	return unsubscribe;
	// });
</script>

<svelte:head>
	<title>Hongs todo app</title>

	<meta name="description" content="Hongs todo app" />
</svelte:head>

<div class="app bg-indigo-100 relative">
	<main>
		<slot />
	</main>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
		box-sizing: border-box;
		justify-items: center;
	}
</style>