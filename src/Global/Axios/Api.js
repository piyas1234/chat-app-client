import axios from 'axios'


export const Api = axios.create({
    baseURL:'http://192.168.43.71:1000/api/'
})

