import dayjs from "dayjs"
import React, { useState } from "react"
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai"
import { toast } from "react-toastify"
import DeleteModal from "./DeleteModal"
import EditTodoDrawer from "./drawers/EditTodoDrawer"

export default function Todos({
  tempTodos,
  todos,
  setTempTodos,
  setTodos,
  offset,
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [currentId, setCurrentId] = useState()
  const [currentTodo, setCurrentTodo] = useState({})

  const todoOrderByCreateAt = (order) => {
    if (order == "asc") {
      setTempTodos(
        [...tempTodos].sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        )
      )
    } else {
      setTempTodos(
        [...tempTodos].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        )
      )
    }
  }

  const deleteTodo = () => {
    // currentId
    let todos = tempTodos.filter((todo) => todo.id != currentId)
    setTodos(todos)
    setIsOpen(false)
    toast.success("Todo deleted succesfully")
  }

  const closeModal = () => {
    setIsOpen(false)
  }

  const openModal = (id) => {
    setCurrentId(id)
    setIsOpen(true)
  }

  const searchTodo = (e) => {
    let result = todos.filter((todo) =>
      todo.todo.toLowerCase().includes(e.target.value.toLowerCase())
    )

    setTempTodos(result)
  }

  const handleExpiredOrNot = (val) => {
    if (val) {
      let _case = val == "1" ? true : false

      let result = todos.filter((todo) => {
        if (todo.deadline && !_case && dayjs(todo.deadline).isBefore(dayjs())) {
          return true
        } else if (
          todo.deadline &&
          _case &&
          dayjs(todo.deadline).isAfter(dayjs())
        ) {
          return true
        }

        return false
      })
      setTempTodos(result)
    } else {
      setTempTodos(todos)
    }
  }
  // Edit Drawer

  return (
    <div>
      <EditTodoDrawer
        currentTodo={currentTodo}
        tempTodos={tempTodos}
        setTodos={setTodos}
      />
      <DeleteModal isOpen={isOpen} setIsOpen={setIsOpen} title={"Delete Todo"}>
        <div className="mt-2">
          <p className="text-sm text-gray-500">
            Silmek istediğinize emin misiniz ?
          </p>
        </div>

        <div className="mt-4">
          <button
            type="button"
            className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            onClick={deleteTodo}
          >
            Yes
          </button>

          <button
            type="button"
            className="ml-2 inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            onClick={closeModal}
          >
            No
          </button>
        </div>
      </DeleteModal>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <select
            onChange={(e) => todoOrderByCreateAt(e.currentTarget.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value={"asc"}>ASC</option>
            <option value={"desc"}>DESC</option>
          </select>

          <select
            onChange={(e) => handleExpiredOrNot(e.currentTarget.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value=""></option>
            <option value={"0"}>Expired</option>
            <option value={"1"}>Not Expired </option>
          </select>

          <input
            onChange={searchTodo}
            type="text"
            id="search"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="search"
            required
          />
        </div>

        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Todo
              </th>
              <th scope="col" className="px-6 py-3">
                Completed
              </th>
              <th scope="col" className="px-6 py-3">
                CreatedAt
              </th>
              <th scope="col" className="px-6 py-3">
                Deadline
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {tempTodos.length > 0 && (
              <>
                {tempTodos.slice(0, offset).map((todo, index) => (
                  <tr
                    key={index}
                    className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {todo.todo}
                    </th>
                    <td className="px-6 py-4">
                      {todo.completed == true ? (
                        <span className="text-green-500">YES</span>
                      ) : (
                        <span className="text-red-500">NO</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {dayjs(todo.createdAt).format("DD-MM-YYYY HH:mm:ss")}
                    </td>
                    <td>
                      {todo.deadline ? (
                        <>
                          <span>
                            {dayjs(todo.deadline).format("DD-MM-YYYY HH:mm:ss")}
                          </span>

                          <div>
                            {dayjs(todo.deadline).isBefore(dayjs()) ? (
                              <span className="text-red-500"> (Expired)</span>
                            ) : (
                              <span className="text-green-500">
                                {dayjs(todo.deadline).diff(dayjs(), "days")} gün
                                kaldı
                              </span>
                            )}
                          </div>
                        </>
                      ) : (
                        "No Deadline"
                      )}
                    </td>
                    <td className="px-6 py-4 flex space-x-3 items-center">
                      <AiOutlineEdit
                        onClick={() => {
                          setCurrentTodo(todo)
                        }}
                        data-drawer-target="drawer-right-example"
                        data-drawer-show="drawer-right-example"
                        data-drawer-placement="right"
                        aria-controls="drawer-right-example"
                        data-drawer-backdrop="false"
                        className="text-xl cursor-pointer"
                      />
                      <AiOutlineDelete
                        onClick={() => openModal(todo.id)}
                        className="text-xl cursor-pointer"
                      />
                    </td>
                  </tr>
                ))}
              </>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
