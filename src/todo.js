import React from 'react'

export default function todo({todo, toggleTodo, setActiveTaskId}) {
  function handleTodoclick(){
     toggleTodo(todo.id)
  }
  function handleSelectTask(){
    console.log(setActiveTaskId(todo.id));
  }
  return (
    <div class="pl-5">
        <li onClic={handleSelectTask} class="mt-1 cursor-pointer focus:font-bold focus:text-white">
            {todo.name}
        </li>
    </div>
  )
}
