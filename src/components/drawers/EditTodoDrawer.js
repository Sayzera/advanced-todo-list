import React from "react"
import { AiOutlineExclamation } from "react-icons/ai"
import { AiOutlineClose } from "react-icons/ai"
import { useForm } from "react-hook-form"
import dayjs from "dayjs"

export default function EditTodoDrawer({ currentTodo, tempTodos, setTodos }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm()

  React.useEffect(() => {
    setValue("todo", currentTodo.todo)
    setValue(
      "createdAt",
      dayjs(currentTodo.createdAt).format("YYYY-MM-DDThh:mm")
    )
    setValue("completed", currentTodo.completed == true ? "1" : "0")
  }, [currentTodo])
  const onSubmit = (data) => {
    let result = tempTodos.filter((todo) => {
      if (todo.id == currentTodo.id) {
        todo.todo = data.todo
        todo.createdAt = data.createdAt
        todo.completed = data.completed == "1" ? true : false
        todo.deadline = data.deadline
      }

      return todo
    })

    setTodos(result)
  }
  return (
    <div>
      <div
        id="drawer-right-example"
        className="fixed z-40 h-screen p-4 overflow-y-auto bg-white w-80 dark:bg-gray-800 transition-transform right-0 top-0 translate-x-full"
        tabIndex="-1"
        aria-labelledby="drawer-right-label"
      >
        <h5
          id="drawer-right-label"
          className="inline-flex items-center mb-4 text-base font-semibold text-gray-500 dark:text-gray-400"
        >
          <AiOutlineExclamation className="text-2xl mr-2" />
          Edit todo
        </h5>
        <AiOutlineClose
          data-drawer-hide="drawer-right-example"
          aria-controls="drawer-right-example"
          className="text-2xl absolute top-4 right-4 text-gray-500 cursor-pointer"
        />

        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <div className="my-2">
              <label
                htmlFor="first_name"
                className="block mb-2 text-sm font-medium text-gray-700 dark:text-white"
              >
                Todo Name
              </label>
              <input
                {...register("todo", {
                  required: "This is required",
                  maxLength: {
                    value: 20,
                    message: "Max length is 20",
                  },
                  minLength: {
                    value: 3,
                    message: "Min length is 3",
                  },
                })}
                type="text"
                id="first_name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              {errors.todo && (
                <p className="text-red-500 text-xs italic">
                  {errors.todo.message}
                </p>
              )}
            </div>

            <div className="my-2">
              <label
                htmlFor="first_name"
                className="block mb-2 text-sm font-medium text-gray-700 dark:text-white"
              >
                Created At
              </label>
              <input
                {...register("createdAt", { required: "This is required" })}
                type="datetime-local"
                id="first_name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              {errors.createdAt && (
                <p className="text-red-500 text-xs italic">
                  {errors.createdAt.message}
                </p>
              )}
            </div>
            <div className="my-2">
              <label
                htmlFor="first_name"
                className="block mb-2 text-sm font-medium text-gray-700 dark:text-white"
              >
                Deadline
              </label>
              <input
                {...register("deadline")}
                type="datetime-local"
                id="first_name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>

            <div className="my-2">
              <label
                htmlFor="first_name"
                className="block mb-2 text-sm font-medium text-gray-700 dark:text-white"
              >
                Completed
              </label>
              <select
                {...register("completed")}
                id="countries"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="0">Not Completed</option>
                <option value="1">Completed</option>
              </select>
            </div>

            <div className="my-2">
              <button
                type="submit"
                className="focus:outline-none text-white w-full bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              >
                Edit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
