import React from 'react';
import TodoItem from './TodoItem';

interface TodoListProps {
  todos: { title: string; description: string; completed: boolean }[];
}

const TodoList: React.FC<TodoListProps> = ({ todos }) => {
  return (
    <div>
      {todos.map((todo, index) => (
        <TodoItem key={index} {...todo} />
      ))}
    </div>
  );
};

export default TodoList;
