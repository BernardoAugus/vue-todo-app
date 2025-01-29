<template>
    <form @submit.prevent="addNewTodo">
      <input v-model="newTodo" placeholder="Digite uma nova tarefa" />
      <button type="submit">Adicionar</button>
    </form>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useTodoStore } from '@/store/todoStore';
  
  const store = useTodoStore();
  const newTodo = ref('');
  
  const addNewTodo = () => {
    if (newTodo.value.trim()) {
      store.addTodo(newTodo.value.trim());
      newTodo.value = ''; // Limpa o campo após adicionar
    }
  };
  </script>
  
  <style scoped>
  form {
    display: flex;
    gap: 10px;
    margin-bottom: 15px;
  }
  input {
    flex: 1;
    padding: 5px;
  }
  button {
    padding: 5px 10px;
    cursor: pointer;
  }
  </style>
  