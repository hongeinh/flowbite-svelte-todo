// @ts-nocheck
import { writable } from 'svelte/store';
import { db } from '$lib/firebase/firebase.client';
import { addDoc, deleteDoc, updateDoc, getDoc, getDocs, collection, doc } from 'firebase/firestore';

export const userStore = writable({
    isLoading: true,
    users: [], // Store user data as an array
    currentUser: null,
});

// write up a userObject params

// CRUD operations for users
export const userHandlers = {
    getUsers: async () => {
        try {
            const usersRef = collection(db, 'users');
            const snapshot = await getDocs(usersRef);
            const users = [];
            snapshot.forEach((doc) => {
                users.push({ id: doc.id, ...doc.data() });
            });
            userStore.set({ isLoading: false, users });
            console.log('Users fetched successfully');
        } catch (error) {
            console.error('Error fetching users:', error);
            userStore.set({ isLoading: false, users: [] });
        }
    },

    getUser: async (userId) => {
        try {
            if (!userId) {
                throw new Error('Invalid userId');
            }
            const userRef = doc(db, 'users', userId);
            const userDoc = await getDoc(userRef);

            if (userDoc.exists()) {
                const userData = userDoc.data();
                userStore.set({ currentUser: { id: userDoc.id, ...userData } });
                console.log('User fetched successfully:', userData);
            } else {
                throw new Error('User not found');
            }
        } catch (error) {
            console.error('Error fetching user:', error);
            userStore.set({ currentUser: null });
        }
    },

    createUser: async (userData) => {
        try {
            const usersRef = collection(db, 'users');
            const newUserRef = await addDoc(usersRef, userData);
            console.log('User created successfully with ID:', newUserRef.id);
            return newUserRef.id;
        } catch (error) {
            console.error('Error creating user:', error);
            return null;
        }
    },

    updateUser: async (userId, userData) => {
        try {
            const userRef = doc(db, 'users', userId);
            console.log('userRef', userRef);
            console.log('userData', userData)
            await updateDoc(userRef, userData);
            console.log('User updated successfully');

            userStore.update((storeData) => { console.log("storeData", storeData); return { ...storeData, currentUser: { ...storeData.currentUser, ...userData } } });
        } catch (error) {
            console.error('Error updating user:', error);
        }
    },


    deleteUser: async (userId) => {
        try {
            const userRef = doc(db, 'users', userId);
            await deleteDoc(userRef);
            console.log('User deleted successfully');
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    },
};