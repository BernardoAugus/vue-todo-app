<template>
  <div class="todo-container">
    <h2>Lista de Tarefas</h2>
    <TodoForm />

    <ul class="todo-list">
      <li v-for="todo in todos" :key="todo.id" class="todo-item">
        <input type="checkbox" :checked="todo.completed" @change="toggleTodo(todo.id)" class="custom-checkbox" />
        
        <div class="task-details">
          <span :class="{ done: todo.completed }">{{ todo.text }}</span>
          <small v-if="todo.dueDate" class="due-date">📅 {{ formatDate(todo.dueDate) }}</small>
        </div>

        <button @click="removeTodo(todo.id)" class="delete-btn">❌</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useTodoStore } from '@/store/todoStore';
import { storeToRefs } from 'pinia';
import TodoForm from './TodoForm.vue';

const store = useTodoStore();
const { todos } = storeToRefs(store);
const { toggleTodo, removeTodo } = store;

const formatDate = (date) => {
  return new Date(date).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' });
};
</script>

<style scoped>
.todo-item {
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ddd;
  transition: background 0.3s;
}

.task-details {
  display: flex;
  flex-direction: column;
}

.due-date {
  font-size: 12px;
  color: gray;
}

/* Checkbox customizado */
.custom-checkbox {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  accent-color: #007bff;
  cursor: pointer;
}

/* Tarefas concluídas */
.done {
  text-decoration: line-through;
  color: gray;
}

/* Botão "❌" escondido até passar o mouse */
.delete-btn {
  background: none;
  border: none;
  color: red;
  font-size: 16px;
  cursor: pointer;
  display: none;
  left: 100%;
}

.todo-item:hover .delete-btn {
  display: block;
}
</style>
