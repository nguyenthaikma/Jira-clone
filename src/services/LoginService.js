import axios from 'axios'
import {DOMAIN, TOKEN} from '../util/constatnts/System'

export const LoginService = {
    signUp: (data) => {
        return axios({
            url: `${DOMAIN}/api/Users/signup`,
            method: 'POST',
            data: data
        })
    },
    signIn: (userLogin) => {
        return axios({
            url: `${DOMAIN}/api/Users/signin`,
            method: 'POST',
            data: userLogin
        })
    },
    getUser: (keyWord) => {
        return axios({
            url: `${DOMAIN}/api/Users/getUser?keyword=${keyWord}`,
            method: 'GET',
            headers: {'Authorization': 'Bearer ' + localStorage.getItem(TOKEN)}
        })
    },
    assignUserProject: (data) => {
        return axios({
            url: `${DOMAIN}/api/Project/assignUserProject`,
            method: 'POST',
            data: data,
            headers: {'Authorization': 'Bearer ' + localStorage.getItem(TOKEN)}
        })
    }
}