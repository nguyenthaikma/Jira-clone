import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactHtmlParser from 'html-react-parser'
import { InputNumber, Select, Form, Button, Input, Modal, message } from 'antd';
import { FlagOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { _ADD_COMMENT_SAGA, _DELETE_COMMENT_SAGA, _DELETE_TASK_SAGA, _GET_ALL_COMMENT_SAGA, _UPDATE_STATUS_SAGA } from '../../redux/actions/TaskActions';
import { Editor } from '@tinymce/tinymce-react';
import { CHANG_MODAL_CONTENT_SAGA } from '../../redux/constants/TaskConstant';

const { Option } = Select;

const warning = (content) => {
    message.warning(content);
};

export default function InfoModal() {

    const dispatch = useDispatch();
    let { modalContent, status, priority, type } = useSelector(state => state.TaskReducer);

    const lstComment = modalContent.lstComment;
    useEffect(() => {
        dispatch(_GET_ALL_COMMENT_SAGA(modalContent.taskId));
    }, [])

    let allAssigness = useSelector(state => state.ProjectReducer.projectDetail.members);

    const max = modalContent.timeTrackingRemaining + modalContent.timeTrackingSpent;
    const percent = Math.round((modalContent.timeTrackingSpent / max) * 100);

    function handleChangeStatus(value) {
        const newValues = {
            content: {
                taskId: modalContent.taskId,
                statusId: value
            },
            projectId: modalContent.projectId
        }
        dispatch(_UPDATE_STATUS_SAGA(newValues));
    }


    let isEditName = useSelector(state => state.TaskReducer.isEditName);

    //description
    let [desc, setDesc] = useState({
        content: `${modalContent?.description}`
    })
    let [isDisabled, setIsDisabled] = useState(true)
    let isEditDesc = useSelector(state => state.TaskReducer.isSetDesc)
    const handleEditorChange = (e) => {
        setIsDisabled(false);
        setDesc({
            content: `${e.target.getContent()}`
        })
    }

    //comment
    const [comment, setComment] = useState('')
    const handleChangeComment = (e) => {
        setComment(e.target.value)
    }

    //time tracking
    const [isModalVisibleTime, setIsModalVisibleTime] = useState(false);
    const showModalTime = () => {
        setIsModalVisibleTime(true);
    };
    const handleOkTime = () => {
        setIsModalVisibleTime(false);
    };
    const handleCancelTime = () => {
        setIsModalVisibleTime(false);
    };


    const [form] = Form.useForm();

    useEffect(() => {
        form.resetFields()
    }, [form, modalContent.statusId])



    return (
        <div className="modal fade" id="infoModal" tabIndex={-1} role="dialog" aria-labelledby="infoModal" aria-hidden="true">
            <div className="modal-dialog modal-info">
                <div className="modal-content">
                    <div className="modal-header">
                        <Select
                            value={modalContent.typeId}
                            style={{ width: 150, zIndex: 1 }}
                            onChange={(value) => {
                                dispatch({
                                    type: CHANG_MODAL_CONTENT_SAGA,
                                    actionType: 'CHANGE_TYPE',
                                    value: value
                                })
                            }}
                        >
                            {type?.map((item, index) => {
                                return <Option value={item.id} key={index}>
                                    <FlagOutlined style={{ color: '#800080' }} />
                                    <span className="ml-2">{item.taskType}</span>
                                </Option>
                            })}
                        </Select>
                        <div style={{ display: 'flex' }} className="task-click">
                            <div onClick={() => { warning('Tính năng này chưa cập nhật, vui lòng quay lại sau ^.^') }} className="task-title">
                                <i className="fa-solid fa-paper-plane mr-2"></i>
                                <span style={{ paddingRight: 20 }}>Give feedback</span>
                            </div>
                            <div onClick={() => { warning('Tính năng này chưa cập nhật, vui lòng quay lại sau ^.^') }} className="task-title">
                                <i className="fa fa-link mr-2" />
                                <span style={{ paddingRight: 20 }}>Copy link</span>
                            </div>
                            <div
                                aria-hidden="true"
                                data-dismiss="modal"
                                aria-label="Close"
                                onClick={() => {
                                    const dataDispatchDeleteTask = {
                                        id: modalContent.taskId,
                                        projectId: modalContent.projectId
                                    }
                                    dispatch(_DELETE_TASK_SAGA(dataDispatchDeleteTask))
                                }} className="task-title">
                                <i className="fa fa-trash-alt" />
                            </div>
                            <Button
                                aria-hidden="true"
                                data-dismiss="modal"
                                aria-label="Close"
                                className="closee task-title"
                                style={{ border: 'none' }}
                            >
                                <i style={{ fontSize: '16px' }}>×</i>
                            </Button>
                        </div>
                    </div>
                    <div className="modal-body mt-2">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-8">
                                    <div>
                                        {isEditName ?
                                            <p onClick={() => {
                                                dispatch({
                                                    type: 'EDIT_NAME'
                                                })
                                            }} className="issue">{modalContent.taskName}</p>
                                            :
                                            <div>
                                                <div onClick={() => {
                                                    dispatch({ type: 'CLOSE_EDIT_NAME' })
                                                }} className="input-name__overlay"></div>
                                                <Input onChange={(event) => {
                                                    dispatch({
                                                        type: CHANG_MODAL_CONTENT_SAGA,
                                                        actionType: 'CHANGE_TASK_NAME',
                                                        value: event.target.value
                                                    })
                                                }}
                                                    style={{ padding: '7px 7px 6px', fontSize: '24px' }}
                                                    size="large"
                                                    value={modalContent.taskName} />
                                            </div>
                                        }
                                    </div>
                                    <div className="description">
                                        <p className="desc-title">Description</p>
                                        {isEditDesc ?
                                            <div onClick={() => {
                                                dispatch({ type: 'SET_DESC' })
                                                setIsDisabled(true)
                                            }}>
                                                {ReactHtmlParser(modalContent.description)}
                                            </div>
                                            :
                                            <div>
                                                <Editor
                                                    name="description"
                                                    className="create-edit"
                                                    initialValue={modalContent.description}
                                                    init={{
                                                        height: 200,
                                                        menubar: false,
                                                        plugins: [
                                                            'advlist autolink lists link image',
                                                            'charmap print preview anchor help',
                                                            'searchreplace visualblocks code',
                                                            'insertdatetime media table paste wordcount'
                                                        ],
                                                        toolbar:
                                                            'undo redo | formatselect | ' +
                                                            'bold italic backcolor | alignleft aligncenter ' +
                                                            'alignright alignjustify | bullist numlist outdent indent | ' +
                                                            'removeformat | help'
                                                    }}
                                                    onChange={handleEditorChange}
                                                />
                                                <Button onClick={() => {
                                                    dispatch({
                                                        actionType: 'UPDATE_DESC',
                                                        type: CHANG_MODAL_CONTENT_SAGA,
                                                        data: desc.content
                                                    })
                                                }} className="mt-2 mr-2" type="primary" disabled={isDisabled}>Save</Button>
                                                <Button onClick={() => { dispatch({ type: 'CLOSE_SET_DESC' }) }}>Cancel</Button>
                                            </div>
                                        }

                                    </div>

                                    <div className="comment">
                                        <h6 style={{ color: 'rgb(23, 43, 77)' }}>Comment</h6>
                                        <div className="block-comment" style={{ display: 'flex' }}>
                                            <div className="avatar">
                                                <img src={require('../../assets/img/item1.jfif')} alt="1" />
                                            </div>
                                            <div className="input-comment">
                                                <input
                                                    value={comment}
                                                    onChange={handleChangeComment}
                                                    className="comment-input"
                                                    type="text"
                                                    placeholder="Add a comment ..."
                                                />
                                                <div className="d-flex my-3">
                                                    <div
                                                        onClick={() => {
                                                            const commentDispatch = {
                                                                taskId: modalContent.taskId,
                                                                contentComment: comment
                                                            }
                                                            dispatch(_ADD_COMMENT_SAGA(commentDispatch))
                                                            setComment('')
                                                        }}
                                                        style={{ fontSize: '16px' }}
                                                        className="task-title save"
                                                    >
                                                        Save
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="lastest-comment mt-2">
                                            <div className="comment-item">
                                                {lstComment.map((item, index) => {
                                                    return (<div key={index} className="display-comment" style={{ display: 'flex' }}>
                                                        <div className="avatar">
                                                            <img src={require('../../assets/img/item1.jfif')} alt={index} />
                                                        </div>
                                                        <div>
                                                            <div className="d-flex">
                                                                <span className="comment-name">{item.name}</span>
                                                            </div>
                                                            {
                                                                <p style={{ marginBottom: 5 }}>
                                                                    {item.commentContent}
                                                                </p>
                                                            }
                                                            <div>
                                                                <span onClick={() => {
                                                                    const dataDispatchDelete = {
                                                                        id: item.id,
                                                                        taskId: modalContent.taskId
                                                                    }
                                                                    dispatch(_DELETE_COMMENT_SAGA(dataDispatchDelete))
                                                                }} className="comment-edit">Delete</span>
                                                            </div>
                                                        </div>
                                                    </div>)
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-4 status-container">
                                    <div >
                                        <h6 style={{ marginBottom: '5px' }}>STATUS</h6>
                                        <Form
                                            form={form}
                                            initialValues={{
                                                "Status": modalContent.statusId
                                            }}
                                        >
                                            <Form.Item
                                                name="Status"
                                            >
                                                <Select style={{ width: '100%' }} onChange={handleChangeStatus}>
                                                    {status?.map((item, index) => {
                                                        return <Option key={index} value={item.statusId}>{item.statusName}</Option>
                                                    })}
                                                </Select>
                                            </Form.Item>
                                        </Form>
                                    </div>
                                    <div >
                                        <h6 className="status-title">ASSIGNEES</h6>
                                        <div className="assigness-wrap">
                                            {modalContent.assigness?.map((item, index) => {
                                                return <div onClick={() => {
                                                    dispatch({
                                                        type: CHANG_MODAL_CONTENT_SAGA,
                                                        actionType: 'REMOVE_ASSIGN',
                                                        id: item.id
                                                    })
                                                }} key={index} className="item">
                                                    <div className="avatar mr-1">
                                                        <img src={item.avatar} alt="1" />
                                                    </div>
                                                    <p className="name">
                                                        {item.name}
                                                    </p>
                                                    <i className="fa fa-times" style={{ marginLeft: 5 }} />
                                                </div>
                                            })}

                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <Select
                                                    style={{ width: 120 }}
                                                    placeholder="Add more"
                                                    value={-1}
                                                    onSelect={(value, option) => {
                                                        const assign = {
                                                            id: value,
                                                            name: option.children,
                                                            avatar: option.prop.avatar
                                                        }
                                                        dispatch({
                                                            type: CHANG_MODAL_CONTENT_SAGA,
                                                            actionType: 'ADD_ASSIGN',
                                                            data: assign
                                                        })
                                                    }}
                                                >
                                                    <Option value={-1} disabled>Add more</Option>
                                                    {allAssigness?.filter(item => {
                                                        const index = modalContent.assigness.findIndex(i => i.id === item.userId);
                                                        if (index !== -1) {
                                                            return false;
                                                        } else {
                                                            return true;
                                                        }
                                                    }).map((assigness, index) => {
                                                        return <Option key={index} prop={assigness} value={assigness.userId}>{assigness.name}</Option>
                                                    })}
                                                </Select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="priority" style={{ marginBottom: 20 }}>
                                        <h6 className="status-title">PRIORITY</h6>
                                        <Select
                                            style={{ width: '100%' }}
                                            value={modalContent.priorityId}
                                            onChange={(value) => {
                                                dispatch({
                                                    type: CHANG_MODAL_CONTENT_SAGA,
                                                    actionType: 'CHANGE_PRIORITY',
                                                    id: value
                                                })
                                            }}
                                        >
                                            {priority?.map((item, index) => {
                                                return <Option
                                                    key={index}
                                                    value={item.priorityId}
                                                >{item.priority}</Option>
                                            })}
                                        </Select>
                                    </div>
                                    <div className="estimate mb-4">
                                        <h6 className="status-title">Original Estimate (hours)</h6>
                                        <InputNumber
                                            onChange={(value) => {
                                                dispatch({
                                                    type: CHANG_MODAL_CONTENT_SAGA,
                                                    actionType: 'CHANGE_EST',
                                                    data: value
                                                })
                                            }}
                                            min={0}
                                            max={24}
                                            value={modalContent.originalEstimate}
                                        />
                                    </div>
                                    <div className="time-tracking">
                                        <h6>TIME TRACKING</h6>
                                        <div onClick={showModalTime} className="task-title px-0">
                                            <div style={{ display: 'flex' }}>
                                                <ClockCircleOutlined className="time-tracking-icon" />
                                                <div style={{ width: '100%' }}>
                                                    <div className="progress">
                                                        <div className="progress-bar" role="progressbar" style={{ width: `${percent}%` }} aria-valuenow={25} aria-valuemin={0} aria-valuemax={100} />
                                                    </div>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                        <p className="logged m-0">{modalContent.timeTrackingSpent}h logged</p>
                                                        <p className="estimate-time m-0 ">{modalContent.timeTrackingRemaining}h estimated</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <Modal
                                            style={{ width: '400px !important' }}
                                            visible={isModalVisibleTime}
                                            title='Time tracking'
                                            onOk={handleOkTime}
                                            onCancel={handleCancelTime}
                                        >
                                            <div>
                                                <div className="d-flex">
                                                    <ClockCircleOutlined className="time-tracking-icon" />
                                                    <div style={{ width: '100%' }}>
                                                        <div className="progress">
                                                            <div className="progress-bar" role="progressbar" style={{ width: `${percent}%` }} aria-valuenow={25} aria-valuemin={0} aria-valuemax={100} />
                                                        </div>
                                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                            <p className="logged m-0">{modalContent.timeTrackingSpent}h logged</p>
                                                            <p className="estimate-time m-0 ">{modalContent.timeTrackingRemaining}h estimated</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="d-flex mt-3">
                                                    <div className="w-50 mr-1">
                                                        <h6 className="modal-label">Time spent (hours)</h6>
                                                        <InputNumber
                                                            className="modal-input "
                                                            onChange={(value) => {
                                                                dispatch({
                                                                    type: CHANG_MODAL_CONTENT_SAGA,
                                                                    actionType: 'CHANGE_SPENT',
                                                                    value: value
                                                                })
                                                            }}
                                                            min={0}
                                                            max={24}
                                                            value={modalContent.timeTrackingSpent}
                                                        />
                                                    </div>
                                                    <div className="w-50 ml-1">
                                                        <h6 className="modal-label">Time remaining (hours)</h6>
                                                        <InputNumber
                                                            className="modal-input "
                                                            onChange={(value) => {
                                                                dispatch({
                                                                    type: CHANG_MODAL_CONTENT_SAGA,
                                                                    actionType: 'CHANGE_REMAINING',
                                                                    value: value
                                                                })
                                                            }}
                                                            min={0}
                                                            max={24}
                                                            value={modalContent.timeTrackingRemaining}
                                                        />
                                                    </div>
                                                </div>

                                            </div>
                                        </Modal>
                                    </div>
                                    <div style={{ color: '#929398' }}>Create at a month ago</div>
                                    <div style={{ color: '#929398' }}>Update at a few seconds ago</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
