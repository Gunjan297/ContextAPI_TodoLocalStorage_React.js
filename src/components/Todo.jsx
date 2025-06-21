import React,{useState} from 'react'
import { useTodo } from '../Context/TodoContext'

function Todo({todo}) 
{   
    const [isTodoEditable, setIsTodoEditable] = useState(false)
    const [todoMsg, setTodoMsg] = useState(todo.todo);
    const {updateTodo,deleteTodo,toggleComplete} = useTodo()

    const edit = ()=>{
        updateTodo(todo.id,{...todo, todo:todoMsg})
        setIsTodoEditable(false)
    }

    const toggleCompletedd = ()=>{
        toggleComplete(todo.id)
    }
  return (
    <div
      className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300  text-black ${
        todo.completed ? "bg-[#c6e9a7]" : "bg-[#ccbed7]"
      }`}
    >
      <input
        type="checkbox"
        className="cursor-pointer"
        checked={todo.completed}
        onChange={toggleCompletedd}
      />
      <input
        type="text"
        className={`border outline-none w-full bg-transparent rounded-lg ${
          isTodoEditable ? "border-black/10 px-2" : "border-transparent"
        }`}
        placeholder="Enter text"
        value={todoMsg}
        onChange={(e) => setTodoMsg(e.target.value)}
        readOnly={!isTodoEditable}
      />
      <button className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
      onClick={()=>{
        if (todo.completed) return;

        //when we have this ✏️ icon (currently not editable),by clicking this we'll set it to editable, readOnly mode of text input goes away, we can write todomsg then when we click on 📁 btn, isTodoEditable is currently set to true and we'll call edit function to update the changes
        if (!isTodoEditable) setIsTodoEditable((prev)=> !prev);
        else if (isTodoEditable) edit();
      }}
      disabled= {todo.completed}>
        {isTodoEditable ? "📁" : "✏️"}
      </button>

      <button className='inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0'
      onClick={()=>deleteTodo(todo.id)}> ❌</button>
    </div>
  );
}

export default Todo