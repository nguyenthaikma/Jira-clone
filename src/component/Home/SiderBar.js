import React from 'react'
import { useDispatch } from 'react-redux'

export default function SiderBar() {

    const dispatch = useDispatch();

    return (
        <div className="sideBar">
            <div className="sideBar-top">
                <div className="sideBar-icon">
                    <span className="sideBar-wrap top">
                        <i className="fab fa-jira" />
                    </span>
                </div>
                <div className="sideBar-icon" data-toggle="modal" data-target="#searchModal" style={{ cursor: 'pointer' }}>
                    <span className="sideBar-wrap">
                        <i className="fa fa-search" />
                        <span className="sideBar-title">Search Task</span>
                    </span>
                </div>
                <div onClick = {() => {
                    dispatch({
                        type: 'ADD_TASK_DRAWER',
                        title: 'Create issue',
                        data: '',
                    })
                }} className="sideBar-icon">
                    <span className="sideBar-wrap">
                        <i className="fa fa-plus" />
                        <span className="sideBar-title">Create Task</span>
                    </span>
                </div>
            </div>
            <div className="sideBar-bottom">
                <div className="sideBar-icon">
                    <span className="sideBar-wrap">
                        <i className="fa fa-question-circle" />
                        <span className="sideBar-title">About</span>
                    </span>
                </div>
            </div>
        </div>
    )
}
