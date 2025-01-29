import { defineStore } from 'pinia';
import { ref, watch } from 'vue';

export const useTodoStore = defineStore('todo', () => {
  const todos = ref(JSON.parse(localStorage.getItem('todos')) || []);

  const addTodo = (text) => {
    todos.value.push({ id: Date.now(), text, completed: false });
  };

  const toggleTodo = (id) => {
    const todo = todos.value.find(t => t.id === id);
    if (todo) todo.completed = !todo.completed;
  };

  const removeTodo = (id) => {
    todos.value = todos.value.filter(t => t.id !== id);
  };

  // 🚀 **Salvar no LocalStorage sempre que as tarefas mudarem**
  watch(todos, (newTodos) => {
    localStorage.setItem('todos', JSON.stringify(newTodos));
  }, { deep: true });

  return { todos, addTodo, toggleTodo, removeTodo };
});
