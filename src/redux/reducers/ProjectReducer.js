import { GET_PROJECT_DETAIL, PROJECT_MANAGEMENT, SET_CATEGORY } from "../constants/ProjectConstant";

const stateDefault = {
    category: [],
    projectManagament: [],
    projectDetail: {}
}

const ProjectReducer = (state = stateDefault, action) => {
    switch(action.type) {
        case SET_CATEGORY: {
            state.category = action.data;
            return {...state}
        }

        case PROJECT_MANAGEMENT: {
            state.projectManagament = action.data;
            return {...state}
        }
        
        case GET_PROJECT_DETAIL: {
            state.projectDetail = action.content;
            return {...state}
        }
        default: return state;
    }
}

export default ProjectReducer;