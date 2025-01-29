<template>
    <div>
      <h2>Lista de Tarefas</h2>
      <TodoForm />
  
      <div class="filters">
        <button @click="filter = 'all'">Todas</button>
        <button @click="filter = 'pending'">Pendentes</button>
        <button @click="filter = 'completed'">Concluídas</button>
      </div>
  
      <ul>
        <li v-for="todo in filteredTodos" :key="todo.id">
          <input type="checkbox" v-model="todo.completed" @change="toggleTodo(todo.id)" />
          <span :class="{ done: todo.completed }">{{ todo.text }}</span>
          <button @click="removeTodo(todo.id)">❌</button>
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  import { useTodoStore } from '@/store/todoStore';
  import { storeToRefs } from 'pinia';
  import { computed, ref } from 'vue';
  import TodoForm from './TodoForm.vue';
  
  const store = useTodoStore();
  const { todos } = storeToRefs(store);
  const { toggleTodo, removeTodo } = store;
  
  const filter = ref('all');
  
  const filteredTodos = computed(() => {
    if (filter.value === 'pending') return todos.value.filter(t => !t.completed);
    if (filter.value === 'completed') return todos.value.filter(t => t.completed);
    return todos.value; // 'all'
  });
  </script>
  
  <style scoped>
  .done {
    text-decoration: line-through;
    color: gray;
  }
  .filters {
    margin-bottom: 10px;
  }
  .filters button {
    margin-right: 5px;
    cursor: pointer;
  }
  </style>
  