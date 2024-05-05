import { call, delay, put, select, takeLatest } from 'redux-saga/effects'
import Swal from 'sweetalert2'
import { message } from 'antd'
import { ASSIGN_USER_PROJECT, DISPLAY_LOADING, GET_USER_SAGA, HIDE_LOADING, LOGIN_API, SIGN_UP } from '../constants/LoginConstants'
import { LoginService } from '../../services/LoginService'
import { STATUS_CODE, TOKEN, USER_LOGIN } from '../../util/constatnts/System';
import { _GET_USER } from '../actions/LoginActions';
import { PROJECT_MANAGEMENT_SAGA } from '../constants/ProjectConstant';

const error = (content) => {
    message.error(content);
}

function* LoginSagaApi(action) {
    try {
        let navigate = yield select(state => state.LoginReducer.navigate);
        let { data, status } = yield call(() => LoginService.signIn(action.data))
        if (status === STATUS_CODE.SUCCESS) {

            localStorage.setItem(TOKEN, data.content.accessToken);
            localStorage.setItem(USER_LOGIN, JSON.stringify(data.content));

            yield put({
                type: DISPLAY_LOADING
            });

            yield delay(700);

            yield put({
                type: HIDE_LOADING
            });
            navigate('/home');
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Đăng nhập thành công!',
                showConfirmButton: false,
                timer: 1500
            })
        } else if (status === 400) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `${data.message}`,
            })
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Có lỗi gì đó!!',
            })
        }
    } catch (err) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `${err.response.data.message}`,
        })
    }
}

export function* TheoDoiLoginSagaApi() {
    yield takeLatest(LOGIN_API, LoginSagaApi);
}

function* SignUpSagaApi(action) {
    try {
        yield put({
            type: DISPLAY_LOADING
        });
        yield delay(700);

        yield put({
            type: HIDE_LOADING
        });

        let { status } = yield call(() => LoginService.signUp(action.data));

        if (status === 200) {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Đăng ký thành công!',
                showConfirmButton: false,
                timer: 1500
            })
        }
        let navigate = yield select(state => state.LoginReducer.navigate);

        navigate('/');
    } catch (err) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `${err.response.data.message}`,
        })
    }
}

export function* TheoDoiSignUpSagaApi() {
    yield takeLatest(SIGN_UP, SignUpSagaApi);
}

function* getUserApi(action) {
    try {
        let { data, status } = yield call(() => LoginService.getUser(action.keyWord));
        if (status === STATUS_CODE.SUCCESS) {
            yield put(_GET_USER(data.content))
        }
    } catch (err) {
    }
}

export function* TheoDoiGetUserApi() {
    yield takeLatest(GET_USER_SAGA, getUserApi);
}

function* assignUserProject(action) {
    try {
        let { status } = yield call(() => LoginService.assignUserProject(action.data))
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: PROJECT_MANAGEMENT_SAGA
            })
        }
    } catch (err) {
        error(err.response.data.message);
    }
}

export function* TheoDoiAssignUserProject() {
    yield takeLatest(ASSIGN_USER_PROJECT, assignUserProject);
}

function* logOut() {
    let navigate = yield select(state => state.LoginReducer.navigate);
    yield put({
        type: DISPLAY_LOADING
    });
    yield delay(700);

    yield put({
        type: HIDE_LOADING
    });
    localStorage.clear();
    navigate('/');
}

export function* TheoDoiLogOut() {
    yield takeLatest('LOG_OUT', logOut);
}
