// @ts-nocheck
import { writable } from 'svelte/store';
import { db } from '$lib/firebase/firebase.client';
import {
    addDoc,
    deleteDoc,
    updateDoc,
    getDoc,
    getDocs,
    collection,
    doc
} from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// Todo store state
export const todoStore = writable({
    isLoading: true,
    todos: [],
    currentTodo: null
});

// Handlers for todo-related operations
export const todoHandlers = {
    // Fetch all todos
    getTodos: async () => {
        try {
            const todosRef = collection(db, 'todos');
            const snapshot = await getDocs(todosRef);
            const todos = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            todoStore.set({ isLoading: false, todos });
        } catch (error) {
            console.error('Error fetching todos:', error);
        }
    },

    // Fetch a single todo by ID
    getTodo: async (todoId) => {
        try {
            const todoRef = doc(db, 'todos', todoId);
            const todoDoc = await getDoc(todoRef);
            if (todoDoc.exists()) {
                todoStore.update(state => ({
                    ...state,
                    isLoading: false,
                    currentTodo: { id: todoDoc.id, ...todoDoc.data() }
                }));
            } else {
                console.warn(`Todo with ID ${todoId} does not exist.`);
                todoStore.update(state => ({
                    ...state,
                    isLoading: false,
                    currentTodo: null
                }));
            }
        } catch (error) {
            console.error('Error fetching todo:', error);
        }
    },

    // Add a new todo
    createTodo: async (todoData) => {
        try {
            const todosRef = collection(db, 'todos');
            const newTodoRef = await addDoc(todosRef, {
                ...todoData,
            });
            return newTodoRef.id;
        } catch (error) {
            console.error('Error creating todo:', error);
            throw error;
        }
    },


    // Update an existing todo
    updateTodo: async (todoId, todoData) => {
        try {
            const todoRef = doc(db, 'todos', todoId);
            await updateDoc(todoRef, todoData);
            return todoId;
        } catch (error) {
            console.error('Error updating todo:', error);
            throw error;
        }
    },

    // Delete a todo
    deleteTodo: async (todoId) => {
        const confirmation = window.confirm('Are you sure you want to delete this todo?');
        if (confirmation) {
            try {
                const todoRef = doc(db, 'todos', todoId);
                await deleteDoc(todoRef);
                alert('Todo successfully deleted.');
            } catch (error) {
                console.error('Error deleting todo:', error);
            }
        }
    },


};