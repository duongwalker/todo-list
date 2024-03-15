import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import { InputField } from '../InputField/InputField'

interface ItemProps {
  id: number
  content: string
  removeTask: (id: number) => void
}

export function Item({ content, id, removeTask }: ItemProps) {

  const [isEditing, setIsEditing] = useState(false)

  return (
    <div className="text-white" key={id}>

      {!isEditing && (
        <div className='flex justify-between bg-black border rounded-none my-1 max-w-screen-md'>
          <span className='mx-2 self-center'>{content}</span>
          <div className='p-2 justify-items-center space-x-1'>
            <FontAwesomeIcon icon={faTrash} onClick={() => removeTask(id)} />
            <FontAwesomeIcon icon={faPenToSquare} onClick={() => setIsEditing(true)} />
          </div>
        </div>
      )}


      {isEditing &&
        <div>
          <InputField taskId={id} defaultValue={content} setIsEditing={setIsEditing} />
        </div>
      }

    </div>
  )
}
