import dayjs from "dayjs"
import React from "react"
import { RxPlus } from "react-icons/rx"
import Cookies from "js-cookie"

export default function AddTodo({ todo, setTodo, setTodos, todos }) {
  const todoAdd = () => {
    setTodos([
      ...todos,
      {
        id: todos.length + 1,
        todo: todo,
        completed: false,
        createdAt: dayjs(),
      },
    ])
  }

  React.useEffect(() => {
    Cookies.set("todos", JSON.stringify(todos))
  }, [todos])

  return (
    <div>
      <div className="mt-4 md:mt-8 relative">
        <input
          type="text"
          value={todo}
          onChange={(e) => setTodo(e.currentTarget.value)}
          id="first_name"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Add Todo"
          required
        />

        {todo && (
          <RxPlus
            onClick={todoAdd}
            className="text-xl absolute top-[12px] right-2 cursor-pointer text-gray-700"
          />
        )}
      </div>
    </div>
  )
}
