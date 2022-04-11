import { ASSIGN_USER_PROJECT, DISPLAY_LOADING, GET_USER, GET_USER_SAGA, HIDE_LOADING, LOGIN_API, SIGN_UP } from "../constants/LoginConstants";

export const _LOGIN_API = (data) => ({
    type: LOGIN_API,
    data: {
        email: data.email,
        passWord: data.passWord
    }
})

export const _SIGN_UP = (data) => ({
    type: SIGN_UP,
    data: data
})

export const _DISPLAY_LOADING = () => ({
    type: DISPLAY_LOADING
})

export const _HIDE_LOADING = () => ({
    type: HIDE_LOADING
})

export const _GET_USER_SAGA = (keyWord) => ({
    type: GET_USER_SAGA,
    keyWord: keyWord
})

export const _GET_USER = (content) => ({
    type: GET_USER,
    content: content
})

export const _ASSIGN_USER_PROJECT = (data) => ({
    type: ASSIGN_USER_PROJECT,
    data: data
})