import React, {useState, useEffect} from 'react';
import Tasks from './Tasks';
import { v4 as uuidv4 } from 'uuid';

const LOCAL_STORAGE_KEY = 'todoApp.todos';

function App() {
  const [todos, setTodos] = useState([])
  const [selectedTask, setSelectedTask] = useState(null);
  const [inputText, setInputText] = useState('');
  
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedTodos) setTodos(storedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const toggleSubtask = (todoId, subtaskText) => {
    setSelectedTask({ id: todoId, subtasks: subtaskText });
  };

  const toggleTodo = (id) => {
    if (todos.find(todo => todo.id === id).subtasks.length > 0) {
      alert('You still have subtasks!');
      return;
    }else{
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
      }
  };

  

  const addTodo = () => {
    if (inputText.trim() !== '') {
      setTodos(prevTodos => [...prevTodos, { 
        id: uuidv4(), 
        text: inputText, 
        completed: false, 
        subtasks: [] 
      }
    ]
    );
      setInputText('');
    }
  };

  const addSubtask = (subtaskText) => {
    if (selectedTask && subtaskText.trim() !== '') {
      const updatedTodos = todos.map(todo =>
        todo.id === selectedTask.id
          ? {
              ...todo,
              subtasks: [...todo.subtasks, { id: uuidv4(), text: subtaskText, completed: false }]
            }
          : todo
      );
      setTodos(updatedTodos);
    }
  };

  const clearCompleted = () => {
    setTodos(prevTodos =>
      prevTodos.filter(todo =>
        !todo.completed || todo.subtasks.some(subtask => !subtask.completed)
      )
    );
    setSelectedTask(null);
  };

  const clearSubtask = () => {
  if (selectedTask) {
    const updatedTodos = todos.map(todo =>
      todo.id === selectedTask.id
        ? {
            ...todo,
            subtasks: todo.subtasks.filter(subtask => !subtask.completed)
          }
        : todo
    );
    setTodos(updatedTodos);
  }
};

  //The final 'S'
 //! let handleS= (todos.find(todo => todo.id === selectedTask.id)?.subtasks.filter(subtask=> !subtask.completed).length) > 1 ? 's' : '';

  return (
    <>
    <h1 className="flex justify-center font-bold text-4xl mb-12 mt-3">📋ToDo List📋</h1>
    <section className="Lists flex justify-center space-x-16">
      <div className="tasksList text-slate-100">
        <h2 className="mb-3 text-2xl">My Tasks 🚀</h2>
        {todos.length === 0 && <p className="text-xl">No tasks yet. Add a task to get started!</p>}
        {todos.map(todo => (
        <Tasks 
        key={todo.id}
        todo={todo}
        toggleTodo={toggleTodo}
        toggleSubtask={toggleSubtask}
        isSelected={selectedTask && selectedTask.id === todo.id}
        selectTask={()=> setSelectedTask({id:todo.id, subtasks: todo.subtasks})} />
        ))}
        <form>
          <button onClick={addTodo} className="text-lg text-inherit font-black hover:opacity-70 transition duration-200 ease-in">+</button>
          <input value={inputText} onChange={(e)=> setInputText(e.target.value)} type="text" placeholder='add Task...' className="ml-1 mt-5 bg-transparent placeholder:text-slate-100 text-inherit border-b outline-none cursor-pointer focus:border-b-2 focus:placeholder:opacity-40 transition duration-150 ease-in"/>
        </form>
      </div>
      <div className="wrapper">
        {selectedTask && (
          <form>
            <div className="sub-tasks rounded-xl bg-slate-500 max-w-sm">
              <div className="todo-header flex justify-between mb-4 bg-slate-600 rounded-tr-xl rounded-tl-xl p-3">
                <h2 className="text-2xl">{todos.find(todo => todo.id === selectedTask.id)?.text}</h2>
               <p className="font-thin">📈 {todos.find(todo => todo.id === selectedTask.id)?.subtasks.filter(subtask=> !subtask.complete).length} task remaining</p>
              </div>
              <ul>
                {todos.find(todo => todo.id === selectedTask.id)?.subtasks.map(subtask => (
                    <li key={subtask.id} className="pl-3 pr-3 pb-2 overflow-x-auto">
                      <label className="flex cursor-pointer">
                        <input
                          type="checkbox"
                          checked={subtask.completed}
                          onChange={() => {
                            const updatedTodos = todos.map(todo =>
                              todo.id === selectedTask.id
                                ? {
                                    ...todo,
                                    subtasks: todo.subtasks.map(st =>
                                      st.id === subtask.id ? { ...st, completed: !subtask.completed } : st
                                    )
                                  }
                                : todo
                            );
                            setTodos(updatedTodos);
                          }}
                        />
                        {subtask.text}
                      </label>
                      <hr className='mt-2'/>
                    </li>
                  ))}
                </ul>
              <form className="p-2">
                <button className="text-lg font-black hover:opacity-70 transition duration-200 ease-in">+</button>
                <input onKeyDown={(e) => { 
                      if (e.key === 'Enter') {
                        addSubtask(e.target.value); 
                        e.preventDefault();
                        e.target.value = '';
                      }
                    }} type="text" placeholder='add sub-Task...' className="ml-1 mt-4 bg-transparent placeholder:text-slate-100 text-inherit border-b outline-none cursor-pointer focus:border-b-2 focus:placeholder:opacity-40 transition duration-150 ease-in"/>
              </form>
            </div>
            <span className="space-x-4">
            <button onClick={clearSubtask} className="rounded-xl mt-1 p-1 bg-slate-100 hover:bg-slate-300 transition duration-150 ease-in">Clear completed tasks</button>
            <button onClick={clearCompleted} className="rounded-xl mt-1 p-1 bg-slate-100 hover:bg-slate-300 transition duration-150 ease-in">Delete list</button>
            </span>
          </form>
        )}
      </div>
    </section>
    <footer className="text-center font-serif mt-52">" 📜💡The only difference between success and failure is the the ability to take action.💡📜"</footer>
    </>
  );
}

export default App;
