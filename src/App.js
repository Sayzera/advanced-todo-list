import React, { useState } from "react"
import "./App.css"
import AddTodo from "./components/AddTodo"
import Cookies from "js-cookie"
import Todos from "./components/Todos"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import HandleScroll from "./components/HandleScroll"

function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState(
    Cookies.get("todos") ? JSON.parse(Cookies.get("todos")) : []
  )
  const [tempTodos, setTempTodos] = useState([])
  const [offset, setOffset] = useState(20)
  React.useEffect(() => {
    setTempTodos(todos)
  }, [todos])

  return (
    <div className="container px-4">
      <HandleScroll setOffset={setOffset} />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <AddTodo
        todo={todo}
        setTodo={setTodo}
        todos={todos}
        setTodos={setTodos}
      />

      <div className="mt-4  border-t pt-2 ">
        <Todos
          offset={offset}
          todos={todos}
          tempTodos={tempTodos}
          setTempTodos={setTempTodos}
          setTodos={setTodos}
        />
      </div>
    </div>
  )
}

export default App
