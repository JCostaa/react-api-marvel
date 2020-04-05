import axios from 'axios'

import {url} from './keymarvel'

const api = axios.create({
    baseURL:'http://gateway.marvel.com/v1/public'
})

export default api;