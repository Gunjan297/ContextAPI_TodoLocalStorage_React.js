import React, {useState} from 'react'
import { useTodo } from '../Context/TodoContext'

function TodoForm() {
    const [todo, setTodo] = useState("")
    const {addTodo} = useTodo()

    const add = (e)=>{
        e .preventDefault();
        if(!todo) return

        addTodo({todo, completed:false}) //id is getting added in app.jsx
        setTodo("") //to reset todo
    }

  return (
    <form onSubmit={add} className="flex">
      <input
        type="text"
        value={todo}
        placeholder="Enter todo..."
        className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
        onChange={(e) => setTodo(e.target.value)}
      />
      <button
        type="submit"
        className="rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0"
      >Add</button>
    </form>
  );
}

export default TodoForm