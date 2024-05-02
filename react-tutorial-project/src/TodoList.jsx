import { TodoItem } from "./TodoItem"

export function TodoList({ todos, toggleTodo, deleteTodo }){
    return(
        <ul className="list">
            {
            todos.length === 0 && "No Todos" //short circuiting, the second part runs(evaluated) only when the first part of && is true
            }  
            {todos.map(todo => {  //{} runs the js code and place the return elements straight inside the code
            return (
                <TodoItem 
                    // id={todo.id} 
                    // completed={todo.completed} 
                    // title={todo.title}
                    {...todo}           //just spread out todo and it does the same thing
                    //key prop to distinguish each component 
                    key={todo.id}       // make sure each child in a list have a unique key prop
                    toggleTodo={toggleTodo}
                    deleteTodo={deleteTodo}
                />
            )
            })}
        </ul>
    )
}