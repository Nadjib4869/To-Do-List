import React from 'react';

export default function Tasks({ todo, toggleTodo, toggleSubtask, isSelected, selectTask }) {
  return (
    <div className='mb-2'>
    <li className={`cursor-pointer ${isSelected ? 'text-black bg-slate-300 rounded-lg p-1' : ''}`}
    onClick={() => selectTask()}>
      <label class="mt-1 cursor-pointer focus:font-bold focus:text-white">
      <input1
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleTodo(todo.id)}
        />
        {todo.text}
      </label>
    </li>
    </div>
  )
}
