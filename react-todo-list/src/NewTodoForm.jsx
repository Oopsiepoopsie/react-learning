import { useState } from "react"

// export function NewTodoForm(props) {
//we destructure the "props"!
export function NewTodoForm({ customProp }) {
    // props.customProp
    const [newItem, setNewItem] = useState("")

    function handleSubmit(e){
        //prevent the page from refreshing when submitted
        e.preventDefault()
    
        if(newItem === "") return
        //add todo
        //props.customProp(newItem) //we use "props" to get the function "addTodo" into the component
        customProp(newItem)     //destructured   

        //set the input to empty again
        setNewItem("")
    }

    return (
      <form onSubmit={handleSubmit} className="new-item-form">
        <div className="form-row">
          <label htmlFor="item">New Item</label>
          <input 
            value={newItem}
            onChange={e => setNewItem(e.target.value)} //it's a function inside that calls setNewItem with a value passed in
            type="text" 
            id="item"
          />
        </div>
        <button className="btn">Add</button>
      </form>
    )
}