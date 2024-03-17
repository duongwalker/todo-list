import { useForm, SubmitHandler } from "react-hook-form"
import { useContext } from "react"
import { TodoContext } from "../List/List"

type Inputs = {
  exampleRequired: string
}

interface InputFieldProps {
  taskId?: number
  defaultValue?: string
  addTask?: (task: string) => void
  setIsEditing?: (arg0: boolean) => void
}

export function InputField({ taskId, defaultValue, addTask, setIsEditing }: InputFieldProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>()

  const { updateTask } = useContext(TodoContext)

  const onSubmit: SubmitHandler<Inputs> = () => {
    if (addTask) {
      addTask(watch("exampleRequired"))
    }
    else if (taskId && setIsEditing) {
      updateTask({
        id: taskId,
        content: watch("exampleRequired")
      })
      setIsEditing(false)
    }

  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* include validation with required or other standard HTML validation rules */}
      <div className="flex space-x-1 ">
      <div className="flex flex-col">
        <input defaultValue={defaultValue} className="border m-[1px] rounded-sm min-w-72 max-h-6 outline-none hover:border-blue-300 focus:border-blue-800 focus:shadow-border-like text-black" {...register("exampleRequired", { required: true })} />
        {/* errors will return when field validation fails  */}
        {errors.exampleRequired && <p className="text-left ">The task is required</p>}
      </div>

      <button className="text-white bg-[#3A3A3E] border border-gray-400 rounded-sm px-3 max-h-6 hover:border-blue-300" type="submit">Add task</button>
      </div>
    </form>
  )
}
