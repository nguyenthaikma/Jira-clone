import { Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register'
import UserLoginTemplate from './templates/UserLoginTemplates/UserLoginTemplate';
import { useDispatch } from 'react-redux';
import Loading from './component/Loading/Loading';
import HomTemplate from './templates/HomeTemplate/HomTemplate';
import IndexJira from './pages/Home/IndexJira'
import CreateProject from './pages/Home/CreateProject';
import ProjectManagament from './pages/Home/ProjectManagament';
import DrawerHoc from './HOC/Drawer/DrawerHoc';
import { _GET_ALL_TASK_SAGA, _GET_PRIORITY_SAGA, _GET_STATUS_SAGA } from './redux/actions/TaskActions';

function App() {

  let navigate = useNavigate();
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: 'ADD_NAVIGATE',
      navigate: navigate
    })
    dispatch(_GET_ALL_TASK_SAGA());
    dispatch(_GET_PRIORITY_SAGA());
    dispatch(_GET_STATUS_SAGA());
  }, [])

  return (
    <>
      <Loading />
      <DrawerHoc />
      <Routes>
        <Route path='/home' element={<HomTemplate data={ProjectManagament} />} />
        <Route path='/createproject' element={<HomTemplate data={CreateProject} />} />
        <Route path='/' element={<UserLoginTemplate data={Login} />} />
        <Route path='/register' element={<UserLoginTemplate data={Register} />} />
        <Route path='/projectDetail/:id' element={<HomTemplate data={IndexJira} />} />
        <Route path='*' element={<HomTemplate data={ProjectManagament} />} />
      </Routes>
    </>
  );
}

export default App;
