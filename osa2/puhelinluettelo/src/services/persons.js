import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
    return axios.get(baseUrl)
}
  
const create = newObject => {
    return axios.post(baseUrl, newObject)
}

const deleting = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
}

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
}

export default { 
    getAll: getAll, 
    create: create,
    deleting: deleting,
    update: update
}