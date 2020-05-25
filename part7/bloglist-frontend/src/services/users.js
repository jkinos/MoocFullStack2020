import axios from 'axios'
const baseUrl = '/api/users'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const create = async newObject => {
    const response = await axios.post(baseUrl, newObject)
    return response.data
}

const update = (id, newObject) => {
    const request = axios.put(`${ baseUrl }/${id}`, newObject)
    console.log('id',id)
    return request.then(response => response.data)
}

const remove = async id => {
    const response = await axios.delete(`${ baseUrl }/${id}`)
    return response.data
}


export default { getAll ,create, update, remove }