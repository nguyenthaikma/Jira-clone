import axios from 'axios'
import { DOMAIN, TOKEN } from '../util/constatnts/System'

export const ProjectService = {
    getCategory: () => {
        return axios({
            url: `${DOMAIN}/api/ProjectCategory`,
            method: 'GET'
        })
    },
    createProject: (data) => {
        return axios({
            url: `${DOMAIN}/api/Project/createProject`,
            method: 'POST',
            data: data
        })
    },
    createProjectAuthorization: (data) => {
        return axios({
            url: `${DOMAIN}/api/Project/createProjectAuthorize`,
            method: 'POST',
            data: data,
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
        })
    },
    projectManagament: () => {
        return axios({
            url: `${DOMAIN}/api/Project/getAllProject`,
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
        })
    },
    editProject: (data) => {
        return axios({
            url: `${DOMAIN}/api/Project/updateProject?projectId=${data.id}`,
            method: 'PUT',
            data: data,
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
        })
    },
    deleteProject: (data) => {
        return axios({
            url: `${DOMAIN}/api/Project/deleteProject?projectId=${data.id}`,
            method: 'DELETE',
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
        })
    },
    removeUser: (data) => {
        return axios({
            url: `${DOMAIN}/api/Project/removeUserFromProject`,
            method: 'POST',
            data: data,
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
        })
    },
    getProjectDetailApi: (projectId) => {
        return axios({
            url: `${DOMAIN}/api/Project/getProjectDetail?id=${projectId}`,
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
        })
    }
}