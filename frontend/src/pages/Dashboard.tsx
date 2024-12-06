import React, { useEffect, useState } from 'react';
import { getTodos, createTodo, deleteTodo } from '../services/api';

interface Todo {
  _id: string;
  title: string;
  description?: string;
  completed: boolean;
}

const Dashboard: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoTitle, setNewTodoTitle] = useState<string>('');
  const [newTodoDescription, setNewTodoDescription] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const fetchedTodos = await getTodos();
        setTodos(fetchedTodos);
      } catch (err) {
        setError('Failed to fetch todos. Please try again later.');
      }
    };

    fetchTodos();
  }, []);

  const handleAddTodo = async () => {
    if (!newTodoTitle.trim()) {
      setError('Title is required.');
      return;
    }

    try {
      const newTodo = await createTodo(newTodoTitle, newTodoDescription);
      setTodos((prevTodos) => [...prevTodos, newTodo]);
      setNewTodoTitle('');
      setNewTodoDescription('');
      setError(null);
    } catch (err) {
      setError('Failed to add todo. Please try again later.');
    }
  };

  const handleDeleteTodo = async (id: string) => {
    try {
      await deleteTodo(id);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
    } catch (err) {
      setError('Failed to delete todo. Please try again later.');
    }
  };

  return (
    <div>
      <h1>Dashboard</h1>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div>
        <h3>Add New Todo</h3>
        <input
          type="text"
          placeholder="Todo Title"
          value={newTodoTitle}
          onChange={(e) => setNewTodoTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Todo Description"
          value={newTodoDescription}
          onChange={(e) => setNewTodoDescription(e.target.value)}
        />
        <button onClick={handleAddTodo}>Add Todo</button>
      </div>

      <div>
        <h3>Your Todos</h3>
        {todos.length > 0 ? (
          <ul>
            {todos.map((todo) => (
              <li key={todo._id}>
                <span>
                  <strong>{todo.title}</strong> - {todo.description || 'No description'}
                </span>
                <button onClick={() => handleDeleteTodo(todo._id)}>Delete</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No todos available.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
