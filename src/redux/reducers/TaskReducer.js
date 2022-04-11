import { GET_ALL_COMMENT, GET_ALL_TASK, GET_ALL_USER, GET_PRIORITY, GET_STATUS, GET_TASK_DETAIL, UPDATE_STATUS } from "../constants/TaskConstant";

const stateDefault = {
    type: [],
    priority: [],
    allUser: [],
    status: [],
    modalContent: {
        alias: "fix-bug-creat",
        assigness: [{ 
            id: 984, 
            avatar: 'https://ui-avatars.com/api/?name=Đạt Phan Hoàng', 
            name: 'Đạt Phan Hoàng', 
            alias: 'dat' 
        }],
        description: "<p>I can't submit!</p>",
        lstComment: [
            {
                idUser: 6,
                name: 'Thai',
                avatar: 'https://ui-avatars.com/api/?name=Đạt Phan Hoàng',
                commentContent: 'Very good!'
            },
            {
                idUser: 7,
                name: 'Thanh',
                avatar: 'https://ui-avatars.com/api/?name=Đạt Phan Hoàng',
                commentContent: 'Very goodasa!'
            }
        ],
        originalEstimate: 1,
        priorityId: 3,
        priorityTask: { priorityId: 3, priority: 'Low' },
        projectId: 4040,
        statusId: "3",
        taskId: 3395,
        taskName: "Fix bug Creat",
        taskTypeDetail: { id: 2, taskType: 'new task' },
        timeTrackingRemaining: 1,
        timeTrackingSpent: 2,
        typeId: 1,
    },
    isSetDesc: true,
    isEditName: true,
}

const TaskReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case GET_ALL_TASK: {
            state.type = action.data;
            return { ...state }
        }
        case GET_PRIORITY: {
            state.priority = action.data;
            return { ...state }
        }
        case GET_ALL_USER: {
            state.allUser = action.data;
            return { ...state }
        }
        case GET_STATUS: {
            state.status = action.data;
            return { ...state }
        }
        case GET_TASK_DETAIL: {
            state.modalContent = action.data;
            return {...state}
        }
        case GET_ALL_COMMENT: {
            state.modalContent.lstComment = action.data;
            return {...state}
        }
        case 'CHANGE_PRIORITY': {
            state.modalContent.priorityId = action.id;
            return { ...state }
        }
        case 'CHANGE_EST': {
            state.modalContent.originalEstimate = action.data;
            return {...state}
        }
        case 'CHANGE_TYPE': {
            state.modalContent.typeId = action.value;
            return { ...state }
        }
        case 'CHANGE_SPENT': {
            state.modalContent.timeTrackingSpent = action.value;
            return { ...state }
        }
        case 'CHANGE_REMAINING': {
            state.modalContent.timeTrackingRemaining = action.value;
            return { ...state }
        }
        case 'CHANGE_TASK_NAME': {
            state.modalContent.taskName = action.value;
            return { ...state }
        }
        case 'SET_DESC': {
            state.isSetDesc = false;
            return { ...state }
        }
        case 'CLOSE_SET_DESC': {
            state.isSetDesc = true;
            return { ...state }
        }
        case 'EDIT_NAME': {
            state.isEditName = false;
            return { ...state }
        }
        case 'CLOSE_EDIT_NAME': {
            state.isEditName = true;
            return { ...state }
        }
        case 'UPDATE_DESC': {
            state.modalContent.description = action.data;
            state.isSetDesc = true;
            return { ...state }
        }
        case 'ADD_ASSIGN': {
            state.modalContent.assigness.push(action.data);
            return {...state}
        }
        case 'REMOVE_ASSIGN': {
            state.modalContent.assigness.forEach((item, index, arrayAssign) => {
                if(item.id === action.id) {
                    arrayAssign.splice(index, 1);
                }
            });
            return {...state}
        }
        default: return state;
    }
}

export default TaskReducer;