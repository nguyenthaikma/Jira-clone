import { applyMiddleware, combineReducers, createStore } from 'redux';
import reduxThunk from 'redux-thunk';
import createMiddleWareSaga from 'redux-saga';
import { rootSaga } from './saga/rootSaga';
import LoginReducer from './reducers/LoginReducer'
import LoadingReducer from './reducers/LoadingReducer'
import ProjectReducer from './reducers/ProjectReducer'
import DrawerReducer from './reducers/DrawerReducer';
import TaskReducer from './reducers/TaskReducer';

const middleWareSaga = createMiddleWareSaga();

const rootReducer = combineReducers({
   LoginReducer,
   LoadingReducer,
   ProjectReducer,
   DrawerReducer,
   TaskReducer
})

const store = createStore(rootReducer, applyMiddleware(reduxThunk, middleWareSaga));

middleWareSaga.run(rootSaga);

export default store;