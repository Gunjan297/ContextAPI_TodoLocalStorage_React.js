import { useState,useEffect } from 'react'
import './App.css'
import { TodoProvider } from './Context/TodoContext'
import {TodoForm,Todo} from './components/index.js';

function App() {
  const [todos, setTodos] = useState([]); //todos ia an array of objects

  const addTodo = (todo) => {
    //todo argument is an object you're passing in that contains the user-entered todo data.example:{
    //   todo: "Learn Context API",
    //   completed: false
    // }
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev]);
  };
  //     ...todo: This spreads the fields from the input into the new object.

  // ...prev : This creates a new array:
  // First item: the new todo with a generated ID
  // Remaining items: the previous todos

  const updateTodo = (id,todo) => {
    setTodos((prev)=> prev.map((prevTodo)=> (prevTodo.id===todo.id ? todo : prevTodo ) ))
  };

  const deleteTodo = (id) => {
    setTodos((prev)=> prev.filter((prevTodo)=> prevTodo.id !==id))
  };

  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((prevTodo) => (prevTodo.id === id ? {...prevTodo, completed: !prevTodo.completed } : prevTodo))
    );
  };

  useEffect(() => {
    const todos =JSON.parse(localStorage.getItem("todos"))
    if(todos && todos.length>0){
      setTodos(todos)
    }
  }, []) //as soon the page loads, query the local storage, get all the data, and push all the data in setTodos
  
  useEffect(() => {
    localStorage.setItem("todos",JSON.stringify(todos));
  }, [todos])
  

  return (
    <TodoProvider
      value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}
    >
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">
            Manage Your Todos
          </h1>
          <div className="mb-4">
            <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {todos.map((todo) => (
              <div key={todo.id} className="w-full">
                <Todo todo={todo} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </TodoProvider>
  );
}

export default App
