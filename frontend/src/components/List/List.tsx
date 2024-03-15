import { useEffect, useState, createContext } from "react"
import { Item } from "../Item/Item"
import { InputField } from "../InputField/InputField"
import { createNew, getAll, remove, update } from "../../services/requests"

interface Todo {
  id: number
  content: string
}

interface TodoContextType {
  updateTask: (newTask: Todo) => Promise<void>
}

export const TodoContext = createContext<TodoContextType>({
  updateTask: async () => { }
});

export function List() {
  const [todos, setTodos] = useState<Todo[]>([])

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const todoList = await getAll()
        setTodos(todoList)
      }
      catch (error) {
        console.error("Error fetching todos:", error)
      }
    };
    console.log("Run only once pls")
    fetchTodos()
  }, []);

  const addTask = async (task: string) => {
    const addedTask = await createNew(task);
    const updatedTodos = [...todos];
    updatedTodos.push(addedTask);
    setTodos(updatedTodos);
  }

  const removeTask = async (id: number) => {
    const removedTask = await remove(id)
    const filteredTodos = todos.filter(todo => todo.id !== id)
    setTodos(filteredTodos)
    console.log(`Removed ${removedTask}`)
  }

  const updateTask = async (newTask: Todo) => {
    const response = await update(newTask)
    if (response) {
      const index = todos.findIndex(todo => todo.id === newTask.id);
      if (index !== -1) {
        const updatedTodos = [...todos];
        updatedTodos[index] = newTask;

        setTodos(updatedTodos)
      }
    }
  }

  return (
    <TodoContext.Provider value={{ updateTask }}>
      <div className="flex flex-col p-4 border rounded-xl max-w-xl shadow-lg min-h-96 min-w-80">
        <h1 className='font-black text-white my-0.5'>GET THE THINGS DONE</h1>
        <InputField addTask={addTask} />
        {todos.map((todo, index) => (
          <Item content={todo.content} key={index} id={todo.id} removeTask={removeTask} />
        ))}
      </div>
    </TodoContext.Provider>

  )
}