import React from 'react'
import { Input, message, Popover } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const warning = (content) => {
    message.warning(content);
};

export default function InfoMain(props) {

    const arrayMember = props.members;

    const renderMember = () => {
        return arrayMember?.map((member, index) => {
            const content = <div>
                <div>
                    userId: {member.userId}
                </div>
                <div>
                    Name: {member.name}
                </div>
            </div>
            return <Popover key={index} content={content} title="Member">
                <div className="avatar">
                    <img src={member.avatar} alt={member.avatar} />
                </div>
            </Popover >
        })
    }

    return (
        <div className="info" style={{ display: 'flex' }}>
            <div className="search-block">
                <Input size="middle" className="info-input" prefix={<SearchOutlined />} />
            </div>
            <div className="avatar-group" style={{ display: 'flex' }}>
                {renderMember()}
            </div>
            <div onClick={() => {
                warning('Tính năng này chưa cập nhật, vui lòng quay lại sau ^.^');
            }} style={{ marginLeft: 20 }} className="text">Only My Issues</div>
            <div onClick={() => {
                warning('Tính năng này chưa cập nhật, vui lòng quay lại sau ^.^');
            }} style={{ marginLeft: 10 }} className="text">Recently Updated</div>
        </div>

    )
}
