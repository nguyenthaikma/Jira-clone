import React from 'react'
import { useDispatch } from 'react-redux'
import { PlusCircleOutlined, UserOutlined } from '@ant-design/icons'
import { NavLink } from 'react-router-dom'
import { Button, Popover } from 'antd';
import { USER_LOGIN } from '../../util/constatnts/System';

export default function Menu() {
    const dispatch = useDispatch();

    const userLogin = JSON.parse(localStorage.getItem(USER_LOGIN));

    const content = (
        <div>
            userName: {userLogin.name} <br/>
            email: {userLogin.email} <br/> 
            phone: {userLogin.phoneNumber} <br/>
            <div className="w-100 account-log-out">
                <Button
                    size="small"
                    onClick={() => {
                        dispatch({
                            type: 'LOG_OUT'
                        })
                    }}
                    type="danger"
                >
                    Log out
                </Button>
            </div>
        </div>
    );


    return (
        <div className="menu">
            <Popover content={content} title="Account">
                <div className="account" style={{ cursor: 'pointer' }}>
                    <div className="avatar">
                        <img src={userLogin.avatar} alt="1" />
                    </div>
                    <div className="account-info">
                        <p className="account-name">{userLogin.name}</p>
                        <p className="account-sub-name">Software project</p>
                    </div>
                </div>
            </Popover>

            <div className="control">

                <NavLink to="/home" className={({ isActive }) => "menu-card" + (isActive ? " active" : '')}>
                    <UserOutlined className="control__icon" />
                    <p className="control-title">Project Management</p>
                </NavLink>
                <NavLink to="/createproject" className={({ isActive }) => "menu-card" + (isActive ? " active" : '')}>
                    <PlusCircleOutlined className="control__icon" />
                    <p className="control-title">Create Project</p>
                </NavLink>
            </div>
            <div className="feature">
                <div className="menu-card">
                    <i className="fa fa-truck control__icon" />
                    <p className="control-title">Releases</p>
                </div>
                <div className="menu-card">
                    <i className="fa fa-equals control__icon" />
                    <p className="control-title">Issues and filters</p>
                </div>
                <div className="menu-card">
                    <i className="fa fa-paste control__icon" />
                    <p className="control-title">Pages</p>
                </div>
                <div className="menu-card">
                    <i className="fa fa-location-arrow control__icon" />
                    <p className="control-title">Reports</p>
                </div>
                <div className="menu-card">
                    <i className="fa fa-box control__icon" />
                    <p className="control-title">Components</p>
                </div>
            </div>
        </div>
    )
}
