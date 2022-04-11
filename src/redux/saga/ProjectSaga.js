import { call, delay, put, select, takeLatest } from 'redux-saga/effects'
import { CREATE_PROJECT_SAGA, DELETE_PROJECT_SAGA, EDIT_PROJECT_SAGA, GET_CATEGORY, GET_PROJECT_DETAIL_SAGA, PROJECT_MANAGEMENT, PROJECT_MANAGEMENT_SAGA, REMOVE_USER_SAGA, SET_CATEGORY } from '../constants/ProjectConstant'
import { DISPLAY_LOADING, HIDE_LOADING } from '../constants/LoginConstants'
import { ProjectService } from '../../services/ProjectService'
import Swal from 'sweetalert2';
import { message } from 'antd';
import { STATUS_CODE } from '../../util/constatnts/System';
import { _GET_PROJECT_DETAIL } from '../actions/ProjectAction';

const success = (content) => {
    message.success(content);
};

const error = (content) => {
    message.error(content);
}


function* getProjectApi(action) {

    try {
        let { data } = yield call(ProjectService.getCategory)
        yield put({
            type: SET_CATEGORY,
            data: data.content
        })
    } catch (err) {
        console.log(err);
    }
}

export function* TheoDoiGetProjectApi() {
    yield takeLatest(GET_CATEGORY, getProjectApi)
}

function* projectManagementApi() {

    try {
        let { data, status } = yield call(ProjectService.projectManagament);

        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: PROJECT_MANAGEMENT,
                data: data.content
            })
        }
    } catch (err) {
        let navigate = yield select(state => state.LoginReducer.navigate);
        if (err.response.status === 401) {
            navigate('/');
        }
    }
}

export function* TheoDoiProjectManagementApi() {
    yield takeLatest(PROJECT_MANAGEMENT_SAGA, projectManagementApi)
}

function* createProjectApi(action) {
    let navigate = yield select(state => state.LoginReducer.navigate);
    try {
        yield put({
            type: DISPLAY_LOADING
        })
        yield delay(700);

        yield put({
            type: HIDE_LOADING
        })
        let { data, status } = yield call(() => ProjectService.createProjectAuthorization(action.data));

        if (status === 200) {
            navigate('/home');
            success('Tạo thành công');
            yield put({
                type: PROJECT_MANAGEMENT_SAGA
            })
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `${data.message}`,
            })
        }

    } catch (err) {
        if (err.response.status === 401) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Bạn chưa đăng nhập, vui lòng đăng nhập để tiếp tục !',
            })
            navigate('/');
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `${err.response.data.message}`,
            })
        }
    }
}

export function* TheoDoiCreateProjectApi() {
    yield takeLatest(CREATE_PROJECT_SAGA, createProjectApi)
}



function* editProjectApi(action) {
    try {
        let { status } = yield call(() => { return ProjectService.editProject(action.data) });

        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: PROJECT_MANAGEMENT_SAGA
            })
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Xử lý thành công!',
                showConfirmButton: false,
                timer: 1500
            })
            yield put({
                type: 'CLOSE_DRAWER'
            })
        }
    } catch (err) {
        console.log(err)
    }
}

export function* TheoDoiEditProjectApi() {
    yield takeLatest(EDIT_PROJECT_SAGA, editProjectApi)
}

function* deleteProject(action) {
    try {

        let { data, status } = yield call(() => ProjectService.deleteProject(action.data));

        if (status === STATUS_CODE.SUCCESS) {
            success(data.message);
            yield put({
                type: PROJECT_MANAGEMENT_SAGA
            })
        }
    } catch (err) {
        console.log(err.response);
    }
}

export function* TheoDoiDeleteProject() {
    yield takeLatest(DELETE_PROJECT_SAGA, deleteProject)
}

function* removeUserApi(action) {
    try {
        let { data, status } = yield call(() => ProjectService.removeUser(action.data));
        if (status === 200) {
            yield put({
                type: PROJECT_MANAGEMENT_SAGA
            })
            success(data.message);
        }
    } catch (err) {
        console.log(err.response)
        error(err.response.data.message);
    }
}

export function* TheoDoiRemoveUserApi() {
    yield takeLatest(REMOVE_USER_SAGA, removeUserApi);
}

function* getProjectDetailApi(action) {
    try {
        let { data, status } = yield call(() => ProjectService.getProjectDetailApi(action.projectId));
        if (status === STATUS_CODE.SUCCESS) {
            yield put(_GET_PROJECT_DETAIL(data.content));
        }
    } catch (err) {
        console.log(err.response);
    }
}

export function* TheoDoiGetProjectDetailApi() {
    yield takeLatest(GET_PROJECT_DETAIL_SAGA, getProjectDetailApi)
}