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
      alert('Enter a valid todo')
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
    <div className='h-screen w-screen p-4 bg-gray-400'>
      <form className='flex justify-between' onSubmit={handleSubmit}>
        <div className='bg-slate-100 max-w[500px] w-full m-auto rounded-md shadow-xl p-4'>
          <label htmlFor='item'> New Item</label>
          <input className='border p-2 w-full text-xl' type="text"
            id='item'
            value={newItem}
            onChange={e => setNewItem(e.target.value)} />
        </div>
        <button className='border p-4 ml-2 bg-pink-600 text-slate-100 rounded-md'>Add</button>
      </form>
      <h1 className='text-3xl font-bold text-center text-gray-800 p-2'>Todo List</h1>
      <ul className='text-center '>
        {todos.length === 0 && 'No todos'}
        {todos.map(todo => {
          return (
            <li key={todo.id} className='flex justify-between bg-slate-200 p-4 capitalize rounded-md mb-4'>
              <label htmlFor="" className={todo.completed ? 'ml-2 mt-1 cursor-pointer line-through ' : 'ml-2 mt-1 cursor-pointer'}>
                <input type="checkbox"
                  checked={todo.completed}
                  onChange={e => toggleTodo(todo.id, e.target.checked)} />
                {todo.title}
              </label>
              <button
                className='cursor-pointer flex items-center border ml-2 p-1 bg-red-600 text-slate-100 rounded-md'
                onClick={() => deleteTodo(todo.id)}>Delete</button>
            </li>
          )
        })}
      </ul>
    </div>
  );
}

export default App;
