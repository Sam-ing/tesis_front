import axios from 'axios'
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path:  path.join(__dirname, '../../.env') });
console.log(process.env.NEXT_PUBLIC_API_URL)
const api = axios.create({
    
    //baseURL: "https://tesisapi-production-15aa.up.railway.app",
    baseURL: process.env.NEXT_PUBLIC_API_URL,
})


api.interceptors.request.use((config) => {
    
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

export default api
