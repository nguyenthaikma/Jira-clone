import React, { useEffect, useState, useRef } from 'react';
import { Table, Button, Avatar, Tag, Popover, AutoComplete } from 'antd';
import ReactHtmlParser from 'html-react-parser'
import { EditOutlined, DeleteOutlined, UserAddOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux'
import { Popconfirm, message } from 'antd';
import { _DELETE_PROJECT_SAGA, _PROJECT_MANAGEMENT_SAGA } from '../../redux/actions/ProjectAction';
import { _ASSIGN_USER_PROJECT, _GET_USER_SAGA } from '../../redux/actions/LoginActions'
import TableMember from '../../component/Home/Form/TableMember';
import { NavLink } from 'react-router-dom';

export default function ProjectManagament() {

    let dispatch = useDispatch();
    let [value, setValue] = useState('');

    let dataProject = useSelector(state => state.ProjectReducer.projectManagament);
    let arrayUser = useSelector(state => state.LoginReducer.arrayUser);

    const data = dataProject;
    const searchRef = useRef();

    const confirm = (record) => {
        dispatch(_DELETE_PROJECT_SAGA(record));
    }

    const cancel = (e) => {
        message.error('Click on No');
    }

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Project Name',
            dataIndex: 'projectName',
            key: 'projectName',
            render: (text, record, index) => {
                return <NavLink to={`/projectDetail/${record.id}`}>{text}</NavLink>
            },
            sorter: (a, b) => {
                if (a.projectName?.trim().toLowerCase() < b.projectName?.trim().toLowerCase()) {
                    return -1;
                }
                return 1;
            }
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            render: (text, record, index) => {
                return ReactHtmlParser(text);
            }
        },
        {
            title: 'Member',
            dataIndex: 'members',
            key: 'members',
            render: (text, record, index) => {
                return <div  >
                    <span className="d-flex align-items-center justify-content-center" style={{ cursor: 'pointer' }}>
                        <Popover
                            className="d-flex align-items-center justify-content-center"
                            title="Member"
                            trigger="click"
                            placement="leftTop"
                            content={<TableMember data={record} />}
                        >
                            {record.members?.slice(0, 3).map((member, index) => {
                                return <Avatar key={index} src={member.avatar} />
                            })}
                        </Popover>
                        {record.members?.length > 3 ? <Avatar>...</Avatar> : ''}
                        <Popover
                            content={<AutoComplete
                                options={arrayUser?.map((user, index) => {
                                    return {
                                        label: user.name,
                                        value: user.userId.toString()
                                    }
                                }
                                )}
                                onSelect={(value, option) => {
                                    setValue(option.label);
                                    dispatch(_ASSIGN_USER_PROJECT({
                                        projectId: record.id,
                                        userId: Number(value)
                                    }))
                                }}
                                onChange={(value) => {
                                    setValue(value);
                                }}
                                onSearch={(value) => {
                                    if (searchRef.current) {
                                        clearTimeout(searchRef.current);
                                    }
                                    searchRef.current = setTimeout(() => {
                                        dispatch(_GET_USER_SAGA(value))
                                    }, 300)
                                }}
                                value={value}
                                style={{ width: '100%' }}
                                placeholder="Member"
                            />}
                            title="Add member"
                            trigger="click"
                        >
                            <Button shape="circle" icon={<UserAddOutlined />}></Button>
                        </Popover>
                    </span>
                </div >
            }
        },
        {
            title: 'Action',
            dataIndex: '',
            key: 'action',
            render: (text, record, index) => {
                return <div>
                    <Button onClick={() => {
                        dispatch({
                            type: 'EDIT_DRAWER',
                            data: record,
                            title: 'Edit your project'
                        })
                    }} className="mr-2 mb-1" type="primary" icon={<EditOutlined />} />
                    <Popconfirm
                        title="Are you sure to delete?"
                        onConfirm={() => { confirm(record) }}
                        onCancel={cancel}
                        okText="Yes"
                        cancelText="No"
                        placement="left"
                    >
                        <Button type="danger" icon={<DeleteOutlined />} />
                    </Popconfirm>
                </div>
            }
        }
    ];

    useEffect(() => {
        dispatch(_PROJECT_MANAGEMENT_SAGA());
    }, [])

    return (
        <div style={{ marginLeft: '294px' }} className="container h-100">
            <div className="d-flex flex-column p-4">
                <h3 className="my-4">Project Management</h3>
                <Table
                    rowKey={'id'}
                    columns={columns}
                    dataSource={data}
                    expandable={{
                        expandedRowRender: record => {
                            return <div>
                                <p style={{ margin: 0 }}>{record.categoryName}</p>
                                <div >
                                    Creator: <Tag style={{ cursor: 'pointer' }} color="magenta">{record.creator.name}</Tag>
                                </div>
                            </div>
                        }
                    }}
                />
            </div>
        </div>
    )
}
