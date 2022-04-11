import { all } from 'redux-saga/effects'
import * as LoginSaga from './LoginSaga'
import * as ProjectSaga from './ProjectSaga'
import * as TaskSaga from './TaskSaga'

export function * rootSaga() {
    yield all([
        LoginSaga.TheoDoiLoginSagaApi(),
        LoginSaga.TheoDoiSignUpSagaApi(),
        LoginSaga.TheoDoiGetUserApi(),
        LoginSaga.TheoDoiAssignUserProject(),
        LoginSaga.TheoDoiLogOut(),
        ProjectSaga.TheoDoiGetProjectApi(),
        ProjectSaga.TheoDoiCreateProjectApi(),
        ProjectSaga.TheoDoiProjectManagementApi(),
        ProjectSaga.TheoDoiEditProjectApi(),
        ProjectSaga.TheoDoiDeleteProject(),
        ProjectSaga.TheoDoiRemoveUserApi(),
        ProjectSaga.TheoDoiGetProjectDetailApi(),
        TaskSaga.TheoDoiGetAllTaskApi(),
        TaskSaga.TheoDoiGetPriority(),
        TaskSaga.TheoDoiGetAllUser(),
        TaskSaga.TheoDoiCreateTaskApi(),
        TaskSaga.TheoDoiGetStatus(),
        TaskSaga.TheoDoiGetTaskDetail(),
        TaskSaga.TheoDoiUpdateStatus(),
        TaskSaga.theoDoiHandleChangModalContent(),
        TaskSaga.TheoDoiGetAllComment(),
        TaskSaga.TheoDoiAddComment(),
        TaskSaga.TheoDoiDeleteComment(),
        TaskSaga.TheoDoiDeleteTask(),
        
    ])
    
}