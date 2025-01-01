<script>
    import { Button, Input, Label, Modal, Radio, Datepicker, Dropdown } from 'flowbite-svelte';
    import { onMount } from "svelte";
    import Header from './Header.svelte';
    
    import { useSelector, useDispatch } from "svelte-redux";
    import { addTodo } from '../store';


    let newTaskDescription = "";
    let selectedCategory = "Personal";

    // Modal settings
    let isModalOpen = false;
    const openModal = () => {
        isModalOpen = true;
    }

    const closeModal = () => {
        isModalOpen = false
    }

    // Calendar setting
    let selectedDate = null;
    let lastCalendarAction = '';
    const clearCalendar = () => {
        lastCalendarAction = 'Cleared';
    }

    const applyCalendar = (event) => {
        lastCalendarAction = 'Applied';
        selectedDate = event.detail;
    }

    const addTask = () => {
        if (newTaskDescription.trim()) {
            newTask = {
                name: newTaskDescription,
                deadline: selectedDate,
                category: selectedCategory,
            };
            dispatchEvent(addTodo(newTask));
        }
    }
</script>

<svelte:window onkeydown={keydown} />

<svelte:head>
	<title>New todo</title>
	<meta name="Add new todo" content="Add new todo" />
</svelte:head>

<h1 class="visually-hidden">New todo</h1>

<Modal show={isModalOpen} on:close={closeModal}>
    <Modal.Header>
        <Button on:click{closeModal} class="float-right text-xl font-bold">&times;</Button>
    </Modal.Header>

    <Modal.body>
        <div class="space-y-4">
            <Input bind:value={newTaskDescription} placeholder="Enter new task"/>
            <div class="flex gap-2">
                <Datepicker 
                    bind:value={selectedDate} 
                    showActionButtons
                    autohide={false}
                    on:clear={clearCalendar}
                    on:apply={applyCalendar}
                />
                <Dropdown>
                    <Dropdown.toggle>
                        <Button>Category</Button>
                    </Dropdown.toggle>
                    <Dropdown.items>
                        <Dropdown.item>Personal</Dropdown.item>
                        <Dropdown.item>School</Dropdown.item>
                        <Dropdown.item>Business</Dropdown.item>
                    </Dropdown.items>
                </Dropdown>
            </div>
        </div>
    </Modal.body>
</Modal>