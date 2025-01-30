import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useTodoStore = defineStore('todoStore', () => {
  const todos = ref([]);

  const addTodo = (todo) => {
    todos.value.push({
      id: Date.now(),
      text: todo.text,
      completed: false,
      dueDate: todo.dueDate, // Salvar a data opcionalmente
    });

    sortTodos();
  };

  const toggleTodo = (id) => {
    const todo = todos.value.find(t => t.id === id);
    if (todo) todo.completed = !todo.completed;
  };

  const removeTodo = (id) => {
    todos.value = todos.value.filter(todo => todo.id !== id);
  };

  // Ordena por data (tarefas sem data ficam no final)
  const sortTodos = () => {
    todos.value.sort((a, b) => {
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;
      return new Date(a.dueDate) - new Date(b.dueDate);
    });
  };

  return { todos, addTodo, toggleTodo, removeTodo };
});
