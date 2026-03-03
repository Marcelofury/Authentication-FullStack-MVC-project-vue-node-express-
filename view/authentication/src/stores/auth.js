import {defineStore} from 'pinia'
import axios from 'axios'

export const useAuthStore = defineStore('auth',{
        state: ()=> ({
            user:null
    ,
    token: localStorage.getItem('token')    }),
   

    actions: {
        async login(data){
    const res = await axios.post('api/auth/login', data)
    this.token = res.data.token
    this.user = res.data.user
    localStorage.setItem('token', this.token)
        }
    },
     logout(){
        this.user = null
        this.token = null
        localStorage.removeItem('token')
     }
    }
    );