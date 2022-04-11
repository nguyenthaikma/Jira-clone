import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Drawer, Button, Space } from 'antd';


export default function DrawerHoc() {
    let dispatch = useDispatch();
    let { visible, ComponentEdit, title } = useSelector(state => state.DrawerReducer);

    const onClose = () => {
        dispatch({
            type: 'CLOSE_DRAWER'
        })
    };

    return (
        <>
            <Drawer
                title={title}
                width={720}
                onClose={onClose}
                visible={visible}
                bodyStyle={{ paddingBottom: 80 }}
                extra={
                    <Space>
                        <Button onClick={onClose}>Cancel</Button>
                    </Space>
                }
            >
                <ComponentEdit />
            </Drawer>
        </>
    )
}
