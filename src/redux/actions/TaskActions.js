import { ADD_COMMENT_SAGA, CREATE_TASK_SAGA, DELETE_COMMENT_SAGA, DELETE_TASK_SAGA, GET_ALL_COMMENT, GET_ALL_COMMENT_SAGA, GET_ALL_TASK, GET_ALL_TASK_SAGA, GET_ALL_USER, GET_ALL_USER_SAGA, GET_PRIORITY, GET_PRIORITY_SAGA, GET_STATUS, GET_STATUS_SAGA, GET_TASK_DETAIL, GET_TASK_DETAIL_SAGA, UPDATE_STATUS, UPDATE_STATUS_SAGA } from "../constants/TaskConstant";

export const _GET_ALL_TASK_SAGA = () => ({
    type: GET_ALL_TASK_SAGA
})

export const _GET_ALL_TASK = (data) => ({
    type: GET_ALL_TASK,
    data: data
})

export const _GET_PRIORITY_SAGA = () => ({
    type: GET_PRIORITY_SAGA
})

export const _GET_PRIORITY = (data) => ({
    type: GET_PRIORITY,
    data: data
})

export const _GET_ALL_USER_SAGA = (id) => ({
    type: GET_ALL_USER_SAGA,
    id: id
})

export const _GET_ALL_USER = (data) => ({
    type: GET_ALL_USER,
    data: data
})

export const _CREATE_TASK_SAGA = (data) => ({
    type: CREATE_TASK_SAGA,
    data: data
})

export const _GET_STATUS_SAGA = () => ({
    type: GET_STATUS_SAGA
})

export const _GET_STATUS = (data) => ({
    type: GET_STATUS,
    data: data
})

export const _GET_TASK_DETAIL_SAGA = (id) => ({
    type: GET_TASK_DETAIL_SAGA,
    id: id
})

export const _GET_TASK_DETAIL = (data) => ({
    type: GET_TASK_DETAIL,
    data: data
})

export const _UPDATE_STATUS_SAGA = (data) => ({
    type: UPDATE_STATUS_SAGA,
    data: data.content,
    projectId: data.projectId
})

export const _GET_ALL_COMMENT_SAGA = (taskId) => ({
    type: GET_ALL_COMMENT_SAGA,
    id: taskId,
})

export const _GET_ALL_COMMENT = (data) => ({
    type: GET_ALL_COMMENT,
    data: data,
})

export const _ADD_COMMENT_SAGA = (data) => ({
    type: ADD_COMMENT_SAGA,
    data: data
})

export const _DELETE_COMMENT_SAGA = (data) => ({
    type: DELETE_COMMENT_SAGA,
    data: data
})


export const _DELETE_TASK_SAGA = (taskId) => ({
    type: DELETE_TASK_SAGA,
    id: taskId,
})

