<template>
  <form @submit.prevent="addNewTodo" class="todo-form">
    <input v-model="newTodo" type="text" placeholder="Nova tarefa..." required />
    
    <div class="date-picker">
      <label>
        <span>Data e Hora (opcional):</span>
        <input v-model="dueDate" type="datetime-local" />
      </label>
    </div>

    <button type="submit">Adicionar</button>
  </form>
</template>

<script setup>
import { ref } from 'vue';
import { useTodoStore } from '@/store/todoStore';

const store = useTodoStore();
const newTodo = ref('');
const dueDate = ref('');

const addNewTodo = () => {
  if (!newTodo.value.trim()) return;

  store.addTodo({
    text: newTodo.value,
    completed: false,
    dueDate: dueDate.value || null, // Se não escolher data, salva como null
  });

  newTodo.value = '';
  dueDate.value = '';
};
</script>

<style scoped>
.todo-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

input[type="text"], input[type="datetime-local"] {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

button {
  padding: 8px 12px;
  border: none;
  background: #007bff;
  color: white;
  cursor: pointer;
  border-radius: 5px;
}

button:hover {
  background: #0056b3;
}
</style>
