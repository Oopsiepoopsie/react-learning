
//a hook is a special function that lets you "hook into" React features such as 
//state management and lifecycle features from within a functional component.

import { useEffect, useState } from "react"
import "./styles.css"
import { NewTodoForm } from "./NewTodoForm"
import { TodoList } from "./TodoList"

//the components seem always follow the similar structure:
//hooks -> helper functions -> return JSX

export default function App(){
  
  //always put hooks at the top of the file
  
  //another piece of state
  //the default value is the return value of the function that gets the info from storage
  //when we refresh(restart), the default value is the info from the storage
  const [todos, setTodos] = useState(() => {
    const localValue = localStorage.getItem("ITEMS")
    if(localValue == null) return []  //default to empty array if not exist

    //parse the string into array of objects as the default value
    return JSON.parse(localValue)
  })

  //we want store items in local storage (persist after refresh)
  //every time "todos" change we run the first function
  //useEffect hook, update data when it's updated
  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(todos))
  }, [todos])

  function addTodo(title) {
    //adding new todo item
    //state set function is passed in a function instead of a value!!
    //so that it changes based on the current value
    setTodos(currentTodos => {
      return [
        ...currentTodos,      //array destructuring and spread!
        { id: crypto.randomUUID(), title, completed: false },
      ]
    })


    //this is not how you should set the state variable
    //because it only takes into account the todos(state variable) from the previous render
    //it doesn't take into account the CURRENT value of the state variable which might be changed before this function call
    /*
    setTodos([
      ...todos,
      { id: crypto.randomUUID(), title: newItem, completed: false },
    ])
    */
  }
  

  function toggleTodo(id, completed){
    setTodos(currentTodos => {
      return currentTodos.map(todo => {
        if(todo.id === id){
          //any time we deal with state variable we can not change it
          //so we should create a brand new state object
          return {...todo, completed }
          //todo.completed = completed doesn't work!! because it is mutating the state variable which is immutable
        }
        return todo
      })
    })
  }

  function deleteTodo(id){
    setTodos(currentTodos => {
      return currentTodos.filter( todo => todo.id !== id )  //filter out the exact id
    })
  }

  //you can only ever return one element in the component
  //if we want to return multiple elements in the component 
  // we need to wrap them using a fragment <></> 
  return( 
    <>
      <NewTodoForm customProp={addTodo} //use props to pass the function to the component!! super important!!
      />

      <h1 className="header">Todo List</h1>
      <TodoList 
        todos={todos} //use props to pass into the components
        toggleTodo={toggleTodo}
        deleteTodo={deleteTodo}
      /> 
    </>
  )
}