import React from 'react'
import Todo from './todo'

export default function Tasks({todoList, setActiveTaskId}) {
  return (
    todoList.map(todo=> {
      return <Todo key={todo.id} onclick={()=>setActiveTaskId(todo.id)}  todo={todo}/>
    })
  )
}
