import { GET_USER } from "../constants/LoginConstants";

const stateDefault = {
    navigate: {},
    arrayUser: []
}

const LoginReducer = (state = stateDefault, action) => {
    switch(action.type) {
        case 'ADD_NAVIGATE': {
            state.navigate = action.navigate;
            return {...state};
        }
        case GET_USER: {
            state.arrayUser = action.content;
            return {...state};
        }
        default: return state;
    }
}

export default LoginReducer;