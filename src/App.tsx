import { useState, useEffect } from 'react'
import './App.css'
import './Todo.css'

function App() {

  const [list, setList] = useState<string[]>(() => {
    const saved = localStorage.getItem("list")
    return saved ? JSON.parse(saved) : []
  })

  const [text, setText] = useState("");


  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list))
  }, [list])

  return (
    <>
      <h1>Playground</h1>
      <h2>Todo List</h2>
      <div className="card">
        <div className="entryControls">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              const trimmed = text.trim()
              if (!trimmed) return
              setList([...list, trimmed])
              setText("")
            }}
          >
            <input
              placeholder="Add a todo"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <button type="submit">Add</button>
          </form>

        </div>
        <ul>
          {list.map((item, index) => (
            <li key={index}>{item}
              <button
                className="deleteItem"
                onClick={
                  () => {
                    const editedList = list.filter((_, i) => i !== index)
                    setList(editedList)
                  }
                }>X</button>
            </li>

          ))}
        </ul>
      </div>
    </>
  )
}

export default App
