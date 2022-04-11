import axios from 'axios'
import { DOMAIN, TOKEN } from '../util/constatnts/System'

export const TaskService = {
    getAllTask: () => {
        return axios({
            url: `${DOMAIN}/api/TaskType/getAll`,
            method: 'GET'
        })
    },
    getPriority: () => {
        return axios({
            url: `${DOMAIN}/api/Priority/getAll?id=0`,
            method: 'GET'
        })
    },
    getAllUser: (id) => {
        return axios({
            url: `${DOMAIN}/api/Users/getUserByProjectId?idProject=${id}`,
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
        })
    },
    getStatus: () => {
        return axios({
            url: `${DOMAIN}/api/Status/getAll`,
            method: 'GET'
        })
    },
    createTask: (data) => {
        return axios({
            url: `${DOMAIN}/api/Project/createTask`,
            method: 'POST',
            data: data,
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
        })
    },
    getTaskDetail: (id) => {
        return axios({
            url: `${DOMAIN}/api/Project/getTaskDetail?taskId=${id}`,
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
        })
    },
    updateStatus: (data) => {
        return axios({
            url: `${DOMAIN}/api/Project/updateStatus`,
            method: 'PUT',
            data: data,
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
        })
    },
    handleUpdateTask: (data) => {
        return axios({
            url: `${DOMAIN}/api/Project/updateTask`,
            method: 'POST',
            data: data,
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
        })
    },
    getAllComment: (id) => {
        return axios({
            url: `${DOMAIN}/api/Comment/getAll?taskId=${id}`,
            method: 'GET',
        })
    },
    addComment: (data) => {
        return axios({
            url: `${DOMAIN}/api/Comment/insertComment`,
            method: 'POST',
            data: data,
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
        })
    },
    deleteComment: (id) => {
        return axios({
            url: `${DOMAIN}/api/Comment/deleteComment?idComment=${id}`,
            method: 'DELETE',
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
        })
    },
    deleteTask: (id) => {
        return axios({
            url: `${DOMAIN}/api/Project/removeTask?taskId=${id}`,
            method: 'DELETE',
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
        })
    }
}