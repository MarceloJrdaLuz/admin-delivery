import axios from "axios";

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL_BASE
})

const recuperarToken = localStorage.getItem('token')

if(recuperarToken) {
    api.defaults.headers.post['Authorization'] = `Bearer ${recuperarToken.replace(/"/g, '')}`
}

export default api