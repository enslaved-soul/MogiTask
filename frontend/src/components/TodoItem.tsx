import React from 'react';

interface TodoItemProps {
  title: string;
  description?: string;
  completed: boolean;
}

const TodoItem: React.FC<TodoItemProps> = ({ title, description, completed }) => {
  return (
    <div>
      <h3>{title}</h3>
      <p>{description}</p>
      <p>{completed ? 'Completed' : 'Not Completed'}</p>
    </div>
  );
};

export default TodoItem;
