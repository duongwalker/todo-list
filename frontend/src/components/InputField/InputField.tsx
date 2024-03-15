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
      <input defaultValue={defaultValue} className=" text-black" {...register("exampleRequired", { required: true })} />
      {/* errors will return when field validation fails  */}
      {errors.exampleRequired && <span>This field is required</span>}

      <button className="text-white bg-[#3A3A3E] border rounded-sm border-hidden px-3" type="submit">Add task</button>
    </form>
  )
}
