import { Avatar, Button, Table } from 'antd';
import React from 'react'
import {useDispatch} from 'react-redux'
import { DeleteOutlined } from '@ant-design/icons';
import { _REMOVE_USER_SAGA } from '../../../redux/actions/ProjectAction';

export default function TableMember(props) {

    let dispatch = useDispatch()

    const data = props.data.members;
    const columns = [
        {
            title: 'Id',
            dataIndex: 'userId',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            sorter: (a, b) => {
                if (a.name.trim().toLowerCase() < b.name.trim().toLowerCase()) {
                    return -1;
                } else {
                    return 1;
                }
            }
        },
        {
            title: 'Avatar',
            dataIndex: 'avatar',
            render: (text, record, index) => {
                return <Avatar key={index} src={record.avatar} />
            }
        },
        {
            title: 'Action',
            dataIndex: '',
            render: (text, record, index) => {
                return <Button onClick = {() => {
                    let dataUser = {
                        projectId: props.data.id,
                        userId: record.userId
                    }
                    dispatch(_REMOVE_USER_SAGA(dataUser))
                }} type="danger" icon={<DeleteOutlined />} />
            }
        }
    ];

    function onChange(pagination, filters, sorter, extra) {
        
    }

    return (
        <Table rowKey={'userId'} columns={columns} dataSource={data} onChange={onChange} />
    )
}
