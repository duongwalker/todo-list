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
        <div className='flex justify-between bg-black border border-gray-400 hover:border-blue-300 rounded-sm my-1 max-w-screen-md'>
          <span className='mx-2 self-center'>{content}</span>
          <div className='p-2 justify-items-center space-x-2'>
            <FontAwesomeIcon icon={faTrash} onClick={() => removeTask(id)} className="hover:size-5"/>
            <FontAwesomeIcon icon={faPenToSquare} onClick={() => setIsEditing(true)} className="hover:size-5"/>
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
