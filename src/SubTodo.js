import React from 'react'

export default function SubTodo({subtodo, toggleSubTodo}) {
    function handleSubTodoclick(){
        toggleSubTodo(subtodo.id)
    }
    
  return (
    <div class="pl-3 pr-3 pb-2 overflow-x-auto">
        <label class="flex">
            <input type="checkbox" checked={subtodo.complete} onChange={handleSubTodoclick} class="mr-1 cursor-pointer"/>
            {subtodo.name}
        </label>
        <hr/>
    </div>
  )
}
