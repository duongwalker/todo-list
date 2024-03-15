import axios from 'axios'

const baseUrl = 'http://localhost:8080/api/task'

interface Task {
    id: number
    content: string
}


export const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

export const createNew = async (task: string) => {
    const object = { content: task }
    const response = await axios.post(baseUrl, object)
    return response.data
}

export const update = async (updatedTask: Task) => {
    const response = await axios.put(`${baseUrl}/${updatedTask.id}`, updatedTask)
    return response.data
}

export const remove = async (id: number) => {
    const response = await axios.delete(`${baseUrl}/${id}`)
    console.log(response)
    return response.data
}
