import FormAddTask from "../../component/Home/Form/FormAddTask"
import FormEdit from "../../component/Home/Form/FormEdit"

const stateDefault = {
    visible: false,
    ComponentEdit: () => { return <p>Default</p> },
    content: {},
    title: ''
}

const DrawerReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case 'OPEN_DRAWER': {
            return { ...state, visible: true }
        }
        case 'CLOSE_DRAWER': {
            return { ...state, visible: false }
        }
        case 'EDIT_DRAWER': {
            return {
                ...state,
                visible: true,
                ComponentEdit: FormEdit,
                content: action.data,
                title: action.title
            }
        }
        case 'ADD_TASK_DRAWER': {
            state.visible = true;
            state.ComponentEdit = FormAddTask;
            state.title = action.title;
            return { ...state }
        }
        default: return state;
    }
}

export default DrawerReducer;