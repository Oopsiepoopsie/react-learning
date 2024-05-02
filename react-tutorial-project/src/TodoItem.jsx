//destructure all the props
export function TodoItem({completed, id, title, toggleTodo, deleteTodo}){
    return(
        // make sure each child in a list have a unique key prop
        <li>
            <label>
            <input type="checkbox" checked={completed}
                //toggle the check box, e.target.checked is the above checked property of the input element
                onChange={e => toggleTodo(id, e.target.checked)}
            /> 
            {title}
            </label>
            <button 
                onClick={() => deleteTodo(id)} 
                className="btn btn-danger"
            >
                Delete
            </button>
        </li>
    )
}