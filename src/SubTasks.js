import React from 'react'
import SubTodo from './SubTodo'

export default function Tasks({subTodoList, toggleSubTodo, activeTaskId}) {
  const filteredSubtasks = subTodoList.filter(subtodo => subtodo.parentTaskId === activeTaskId);
  return (
    <ul>
    {filteredSubtasks.map(subtodo=> {
        return <SubTodo key={subtodo.id} toggleSubTodo={()=>toggleSubTodo(subtodo.id)} subtodo={subtodo}/>
        })}
    </ul>
  );
}
