import { call, delay, put, select, takeLatest } from 'redux-saga/effects'
import { message } from 'antd';
import { TaskService } from '../../services/TaskService';
import { STATUS_CODE } from '../../util/constatnts/System';
import { _GET_ALL_TASK, _GET_ALL_USER, _GET_PRIORITY, _GET_STATUS, _GET_TASK_DETAIL, _GET_TASK_DETAIL_SAGA, _UPDATE_STATUS } from '../actions/TaskActions';
import { ADD_COMMENT_SAGA, CHANG_MODAL_CONTENT_SAGA, CREATE_TASK_SAGA, DELETE_COMMENT_SAGA, DELETE_TASK_SAGA, GET_ALL_COMMENT, GET_ALL_COMMENT_SAGA, GET_ALL_TASK_SAGA, GET_ALL_USER_SAGA, GET_PRIORITY, GET_PRIORITY_SAGA, GET_STATUS_SAGA, GET_TASK_DETAIL_SAGA, UPDATE_STATUS_SAGA } from "../constants/TaskConstant";
import { GET_PROJECT_DETAIL_SAGA } from '../constants/ProjectConstant';

const success = (content) => {
    message.success(content);
}

const error = (content) => {
    message.error(content);
}


function* getAllTaskApi(action) {
    try {
        const { data, status } = yield call(() => TaskService.getAllTask())
        if (status === STATUS_CODE.SUCCESS) {
            yield put(_GET_ALL_TASK(data.content))
        }
    } catch (err) {
        console.log(err.response)
        error(err.response)
    }
}

export function* TheoDoiGetAllTaskApi() {
    yield takeLatest(GET_ALL_TASK_SAGA, getAllTaskApi)
}

function* getPriority() {
    try {
        const { data, status } = yield call(() => TaskService.getPriority());
        if (status === STATUS_CODE.SUCCESS) {
            yield put(_GET_PRIORITY(data.content))
        }

    } catch (err) {
        console.log(err.response)
        error(err.response)
    }
}

export function* TheoDoiGetPriority() {
    yield takeLatest(GET_PRIORITY_SAGA, getPriority)
}

function* getAllUser(action) {
    try {
        const { data, status } = yield call(() => TaskService.getAllUser(action.id));
        if (status === STATUS_CODE.SUCCESS) {
            yield put(_GET_ALL_USER(data.content))
        }

    } catch (err) {
        console.log(err.response)
        error(err.response)
    }
}

export function* TheoDoiGetAllUser() {
    yield takeLatest(GET_ALL_USER_SAGA, getAllUser)
}

function* createTaskApi(action) {
    console.log(action)
    try {
        const { data, status } = yield call(() => TaskService.createTask(action.data))
        if (status === STATUS_CODE.SUCCESS) {
            success(data.message)
            yield put({
                type: 'CLOSE_DRAWER'
            })
            yield put({
                type: GET_PROJECT_DETAIL_SAGA,
                projectId: action.data.projectId
            })
        }
    } catch (err) {
        console.log(err)
        error(err?.response);
    }
}

export function* TheoDoiCreateTaskApi() {
    yield takeLatest(CREATE_TASK_SAGA, createTaskApi)
}

function* getStatus() {
    try {
        const { data, status } = yield call(() => TaskService.getStatus());
        if (status === STATUS_CODE.SUCCESS) {
            yield put(_GET_STATUS(data.content));
        }
    } catch (err) {
        console.log(err.response)
    }
}

export function* TheoDoiGetStatus() {
    yield takeLatest(GET_STATUS_SAGA, getStatus);
}

function* getTaskDetail(action) {
    try {
        const { data, status } = yield call(() => TaskService.getTaskDetail(action.id));
        if (status === STATUS_CODE.SUCCESS) {
            yield put(_GET_TASK_DETAIL(data.content));
        }
    } catch (err) {
        console.log(err.response)
    }
}

export function* TheoDoiGetTaskDetail() {
    yield takeLatest(GET_TASK_DETAIL_SAGA, getTaskDetail);
}


function* updateStatus(action) {
    try {
        const { status } = yield call(() => TaskService.updateStatus(action.data));
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_PROJECT_DETAIL_SAGA,
                projectId: action.projectId
            });
        }
    } catch (err) {
        console.log(err.response)
    }
}

export function* TheoDoiUpdateStatus() {
    yield takeLatest(UPDATE_STATUS_SAGA, updateStatus);
}

function* getAllComment(action) {
    try {
        const { data, status } = yield call(() => TaskService.getAllComment(action.id));
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_ALL_COMMENT,
                data: data.content
            });
        }
    } catch (err) {
        console.log(err.response)
    }
}

export function* TheoDoiGetAllComment() {
    yield takeLatest(GET_ALL_COMMENT_SAGA, getAllComment);
}

function* addComment(action) {
    try {
        const { status } = yield call(() => TaskService.addComment(action.data));
        if (status === STATUS_CODE.SUCCESS) {
            yield put(_GET_TASK_DETAIL_SAGA(action.data.taskId));
        }
    } catch (err) {
        console.log(err.response)
    }
}

export function* TheoDoiAddComment() {
    yield takeLatest(ADD_COMMENT_SAGA, addComment);
}

function* deleteComment(action) {
    try {
        const { status } = yield call(() => TaskService.deleteComment(action.data.id));
        if (status === STATUS_CODE.SUCCESS) {
            yield put(_GET_TASK_DETAIL_SAGA(action.data.taskId));
        }
    } catch (err) {
        console.log(err.response)
    }
}

export function* TheoDoiDeleteComment() {
    yield takeLatest(DELETE_COMMENT_SAGA, deleteComment);
}

function* deleteTask(action) {
    try {
        const { status } = yield call(() => TaskService.deleteTask(action.id.id));
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_PROJECT_DETAIL_SAGA,
                projectId: action.id.projectId
            });
        }
    } catch (err) {
        console.log(err)
    }
}

export function* TheoDoiDeleteTask() {
    yield takeLatest(DELETE_TASK_SAGA, deleteTask);
}



function* handleChangModalContent(action) {
    switch (action.actionType) {
        case 'REMOVE_ASSIGN': {
            yield put({
                type: 'REMOVE_ASSIGN',
                id: action.id
            })
            break;
        }
        case 'ADD_ASSIGN': {
            yield put({
                type: 'ADD_ASSIGN',
                data: action.data
            })
            break;
        }
        case 'UPDATE_DESC': {
            yield put({
                type: 'UPDATE_DESC',
                data: action.data
            })
            break;
        }
        case 'CHANGE_PRIORITY': {
            yield put({
                type: 'CHANGE_PRIORITY',
                id: action.id
            })
            break;
        }
        case 'CHANGE_EST': {
            yield put({
                type: 'CHANGE_EST',
                data: action.data
            })
            break;
        }
        case 'CHANGE_TYPE': {
            yield put({
                type: 'CHANGE_TYPE',
                value: action.value
            })
            break;
        }
        case 'CHANGE_SPENT': {
            yield put({
                type: 'CHANGE_SPENT',
                value: action.value
            })
            break;
        }
        case 'CHANGE_REMAINING': {
            yield put({
                type: 'CHANGE_REMAINING',
                value: action.value
            })
            break;
        }
        case 'CHANGE_TASK_NAME': {
            yield put({
                type: 'CHANGE_TASK_NAME',
                value: action.value
            })
            break;
        }
        default: return;
    }


    let modalContent = yield select(state => state.TaskReducer.modalContent);
    const listUserAsignUpdate = modalContent.assigness?.map((item, index) => {
        return item.id;
    })
    let modalContentUpdate = { ...modalContent, listUserAsign: listUserAsignUpdate }

    try {
        const { status } = yield call(() => TaskService.handleUpdateTask(modalContentUpdate));
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_PROJECT_DETAIL_SAGA,
                projectId: modalContentUpdate.projectId
            });
        }
    } catch (err) {
        console.log(err?.response);
        console.log(err)
    }
}

export function* theoDoiHandleChangModalContent() {
    yield takeLatest(CHANG_MODAL_CONTENT_SAGA, handleChangModalContent)
}