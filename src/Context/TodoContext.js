import React, {createContext, useContext } from "react";

export  const TodoContext = React.createContext({
    todos:[{
        id:1,
        todo: "Todo Message",
        completed: false
    }
    ],
    addTodo: (todo)=>{},
    updateTodo : (id,todo)=>{},
    deleteTodo: (id)=>{},
    toggleComplete: (id)=>{}
})

export const TodoProvider = TodoContext.Provider;

export const useTodo = ()=>{
    return useContext(TodoContext);
} 
