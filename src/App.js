import React, {useState, useRef, useEffect} from 'react';
import Tasks from './Tasks';
import SubTasks from './SubTasks';
import { v4 as uuidv4 } from 'uuid';
import todo from './todo';

const LOCAL_STORAGE_KEY1 = 'todoApp.todos';
const LOCAL_STORAGE_KEY2 = 'todoApp.subTodos';

function App() {
  const [todos, setTodos] = useState([])
  const [subTodos, setsubTodos] = useState([])
  const todoNameRef= useRef();
  const subTodoNameRef= useRef();
  const [activeTaskId, setActiveTaskId] = useState(null);
  
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY1));
    if (storedTodos) setTodos(storedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY1, JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    const storedSubTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY2));
    if (storedSubTodos) setsubTodos(storedSubTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY2, JSON.stringify(subTodos));
  }, [subTodos]);

  function toggleSubTodo(subTodoId){
    const newSubTodos= [...subTodos];
    const subtodo= newSubTodos.find(subtodo=> subtodo.id === subTodoId)
    subtodo.complete = !subtodo.complete;
    setsubTodos(newSubTodos);
  }

  function toggleTodo (todoId){
    const newTodos= [...todos];
    const todo= newTodos.find(todo=> todo.id === todoId)
    todo.complete = !todo.complete;
    setTodos(newTodos);
  }

  //The final 'S'
  let handleS= (subTodos.filter(subtodo=> !subtodo.complete).length) > 1 ? 's' : '';

  function handleSelectTask(e){
    e.preventDefault();
    const todoId= e.target.id;
    const todo= todos.find(todo=> todo.id === todoId);
    setActiveTaskId(todoId);
    setsubTodos(todo.subTodos);
  }

  function handleAddTodo(e){
    e.preventDefault();
   const name= todoNameRef.current.value;
   if (name==='') return;
   console.log(name);
   setTodos(prevTodos => {
      return [...prevTodos, {
        id: uuidv4(),
        name: name,
        complete: false
      }]
   });
   todoNameRef.current.value=null;
  }

  function handleSubTodo(e){
    e.preventDefault();
    const name= subTodoNameRef.current.value;
    if (name==='') return;
    setsubTodos(prevSubTodos => {
      return [...prevSubTodos, {
        id: uuidv4(),
        name: name,
        complete: false,
        parentTaskId: activeTaskId
      }]
    });
    subTodoNameRef.current.value=null;
   }

   function handleClearSubTodos(){
    const newSubTodos= subTodos.filter(subtodo => !subtodo.complete);
    setsubTodos(newSubTodos);
    if (activeTaskId) {
      setsubTodos([]);
      setActiveTaskId(null);
    }
   }

   function handleClearTodos(){
    const newTodos= todos.filter(todo => !todo.complete);
    setTodos(newTodos);
   }

  return (
    <>
    <h1 className="flex justify-center font-bold text-4xl mb-12 mt-3">📋ToDo List📋</h1>
    <section className="Lists flex justify-center space-x-16">
      <div className="tasksList text-slate-100 ">
        <h2 className="mb-3 text-2xl">My Tasks 🚀</h2>
        <Tasks todoList={todos} toggleTodo={toggleTodo} onClick={handleSelectTask} setActiveTaskId={setActiveTaskId} />
        <form>
          <button onClick={handleAddTodo} className="text-lg text-inherit font-black hover:opacity-70 transition duration-200 ease-in">+</button>
          <input ref={todoNameRef} type="text" placeholder='add Task...' className="ml-1 mt-5 bg-transparent placeholder:text-slate-100 text-inherit border-b outline-none cursor-pointer focus:border-b-2 focus:placeholder:opacity-40 transition duration-150 ease-in"/>
        </form>
      </div>
      <div className="wrapper">
        <div className="sub-tasks rounded-xl bg-slate-500 max-w-sm">
          <div className="todo-header flex justify-between mb-4 bg-slate-600 rounded-tr-xl rounded-tl-xl p-3">
            <h2 className="text-2xl">Todo1</h2>
            <p className="font-thin">📈 {subTodos.filter(subtodo=> !subtodo.complete).length} task{handleS} remaining</p>
          </div>
          <SubTasks subTodoList={subTodos} toggleSubTodo={toggleSubTodo} activeTaskId={activeTaskId} />
          <form className="p-2">
            <button onClick={handleSubTodo} className="text-lg font-black hover:opacity-70 transition duration-200 ease-in">+</button>
            <input ref={subTodoNameRef} type="text" placeholder='add sub-Task...' className="ml-1 mt-4 bg-transparent placeholder:text-slate-100 text-inherit border-b outline-none cursor-pointer focus:border-b-2 focus:placeholder:opacity-40 transition duration-150 ease-in"/>
          </form>
        </div>
        <span className="space-x-4">
        <button className="rounded-xl mt-1 p-1 bg-slate-100 hover:bg-slate-300 transition duration-150 ease-in" onClick={handleClearSubTodos}>Clear completed tasks</button>
        <button className="rounded-xl mt-1 p-1 bg-slate-100 hover:bg-slate-300 transition duration-150 ease-in" onClick={handleClearTodos}>Delete list</button>
        </span>
      </div>
    </section>
    <footer className="text-center font-serif mt-52">" 📜💡The only difference between success and failure is the the ability to take action.💡📜"</footer>
    </>
  );
}

export default App;
