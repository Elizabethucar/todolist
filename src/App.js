import './App.css';
import React, { useEffect, useState } from 'react';

function App() {
  const [newItem, setNewItem] = useState('')
  const [todos, setTodos] = useState(() => {
    const localValue = localStorage.getItem('ITEMS')
    if (localValue == null) return []

    return JSON.parse(localValue)
  })

  useEffect(() => {
    localStorage.setItem('ITEMS', JSON.stringify(todos))
  }, [todos])

  function handleSubmit(e) {
    e.preventDefault()
    if (newItem === '') {
      alert('enter a valid todo')
      return
    }

    setTodos(currentTodos => {
      return [...currentTodos, { id: crypto.randomUUID(), title: newItem, completed: false }]
    })
    setNewItem('')
  }

  function toggleTodo(id, completed) {
    setTodos(currentTodos => {
      return currentTodos.map(todo => {
        if (todo.id === id) {
          return { ...todo, completed }
        }
        return todo
      })
    })
  }

  function deleteTodo(id) {
    setTodos(currentTodos => {
      return currentTodos.filter(todo => todo.id !== id)
    })
  }


  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='item'> New Item</label>
          <input type="text"
            id='item'
            value={newItem}
            onChange={e => setNewItem(e.target.value)} />
        </div>
        <button>Add</button>
      </form>
      <h1>Todo List</h1>
      <ul>
        {todos.length === 0 && 'No todos'}
        {todos.map(todo => {
          return (
            <li key={todo.id}>
              <label htmlFor="">
                <input type="checkbox"
                  checked={todo.completed}
                  onChange={e => toggleTodo(todo.id, e.target.checked)} />
                {todo.title}
              </label>
              <button onClick={() => deleteTodo(todo.id)}>Delete</button>
            </li>
          )
        })}
      </ul>
    </>
  );
}

export default App;
