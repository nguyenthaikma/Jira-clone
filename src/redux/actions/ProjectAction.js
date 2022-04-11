import {CREATE_PROJECT, CREATE_PROJECT_SAGA, DELETE_PROJECT_SAGA, EDIT_PROJECT_SAGA, GET_CATEGORY, GET_PROJECT_DETAIL, GET_PROJECT_DETAIL_SAGA, PROJECT_MANAGEMENT_SAGA, REMOVE_USER_SAGA} from '../constants/ProjectConstant'

export const _GET_CATEGORY = () => ({
    type: GET_CATEGORY
})

export const _CREATE_PROJECT_SAGA = (data) => ({
    type: CREATE_PROJECT_SAGA,
    data: data
})

export const _CREATE_PROJECT = () => ({
    type: CREATE_PROJECT,
    
})

export const _PROJECT_MANAGEMENT_SAGA = () => ({
    type: PROJECT_MANAGEMENT_SAGA
})

export const _EDIT_PROJECT_SAGA = (data) => ({
    type: EDIT_PROJECT_SAGA,
    data: data
})

export const _DELETE_PROJECT_SAGA = (data) => ({
    type: DELETE_PROJECT_SAGA,
    data: data
})

export const _REMOVE_USER_SAGA = (data) => ({
    type: REMOVE_USER_SAGA,
    data: data
})

export const _GET_PROJECT_DETAIL_SAGA = (projectId) => ({
    type: GET_PROJECT_DETAIL_SAGA,
    projectId: projectId
})

export const _GET_PROJECT_DETAIL = (content) => ({
    type: GET_PROJECT_DETAIL,
    content: content
})