import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Input, Select, Button, Form, Checkbox, InputNumber, Slider, AutoComplete } from 'antd';
import './form.css'
import { Editor } from '@tinymce/tinymce-react';
import { _CREATE_TASK_SAGA, _GET_ALL_TASK_SAGA, _GET_ALL_USER_SAGA, _GET_PRIORITY_SAGA, _GET_STATUS_SAGA } from '../../../redux/actions/TaskActions';

const { Option } = Select;

export default function FormAddTask() {

    const dispatch = useDispatch();

    const allProject = useSelector(state => state.ProjectReducer.projectManagament);
    const arrayTaskType = useSelector(state => state.TaskReducer.type);
    const arrayPriority = useSelector(state => state.TaskReducer.priority);
    const arrayAllUser = useSelector(state => state.TaskReducer.allUser);
    const arrayStatus = useSelector(state => state.TaskReducer.status);

    //Project Id
    const arrayProjectId = allProject?.map((projectId, index) => {
        return { label: projectId.id, value: projectId.id.toString() }
    })

    //description
    let [desc, setDesc] = useState({
        content: '<p></p>'
    })
    const handleEditorChange = (e) => {
        setDesc({
            content: `${e.target.getContent()}`
        })
    }

    //Assignees
    const children = [];
    const arrayOptionsAssignees = arrayAllUser?.map((assignees, index) => {
        return { label: assignees.name, value: assignees.userId }
    })
    function handleChangeAssi(value) {
    }

    //Priority
    const handleChangePri = (value) => {
    }

    //ORIGINAL ESTIMATE
    function onChangeEst(value) {
    }

    //Slider
    function formatter(value) {
        return `${value}h`;
    }
    const [timeTracking, setTimeTracking] = useState({
        timeSpent: 0,
        timeRemain: 0
    })

    //Spent
    function onChangeSpent(value) {
        setTimeTracking({
            ...timeTracking,
            timeSpent: value
        })
    }

    //Remain
    function onChangeRemain(value) {
        setTimeTracking({
            ...timeTracking,
            timeRemain: value
        })
    }



    //Submit
    const onFinish = (values) => {
        const newValues = { ...values, description: desc.content }
        dispatch(_CREATE_TASK_SAGA(newValues));
    }

    const [form] = Form.useForm();

    return (
        <>
            <Form
                form={form}
                onFinish={onFinish}
                name="formAddTask"
                scrollToFirstError
                initialValues={{
                    'originalEstimate': 0,
                    'timeTrackingSpent': timeTracking.timeSpent,
                    'timeTrackingRemaining': timeTracking.timeRemain
                }}
            >
                <label className="create-label">Task Name</label>
                <Form.Item
                    name="taskName"
                    style={{ marginBottom: '0 !important' }}
                    rules={[
                        {
                            required: true,
                            message: 'Task Name is required'
                        }
                    ]}
                >
                    <Input placeholder="Task name" />
                </Form.Item>

                <div className="d-flex">
                    <div className="w-50 mr-2">
                        <label className="create-label">Task type</label>
                        <Form.Item
                            name="typeId"
                            style={{ marginBottom: '0 !important' }}
                            rules={[
                                {
                                    required: true,
                                    message: 'Project type is required'
                                }
                            ]}
                        >
                            <Select
                                showSearch
                                style={{ width: '100%' }}
                                placeholder="Project type"
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                filterSort={(optionA, optionB) =>
                                    optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                                }
                            >
                                {arrayTaskType?.map((taskType, index) => {
                                    return <Option key={index} value={taskType.id}>{taskType.taskType}</Option>
                                })}
                            </Select>
                        </Form.Item>
                    </div>
                    <div className="w-50 ml-2">
                        <label className="create-label">Status</label>
                        <Form.Item
                            name="statusId"
                            style={{ marginBottom: '0 !important' }}
                            rules={[
                                {
                                    required: true,
                                    message: 'Status type is required'
                                }
                            ]}
                        >
                            <Select
                                showSearch
                                style={{ width: '100%' }}
                                placeholder="Status"
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                filterSort={(optionA, optionB) =>
                                    optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                                }
                            >
                                {arrayStatus?.map((status, index) => {
                                    return <Option key={index} value={status.statusId}>{status.statusName}</Option>
                                })}
                            </Select>
                        </Form.Item>
                    </div>
                </div>

                <label className="sub-label active">Start typing to get a list of possible matches.</label>

                <div className="create-simple"></div>

                <label className="create-label">Project Id</label>
                <Form.Item
                    name="projectId"
                    rules={[
                        {
                            required: true,
                            message: 'Project id is required'
                        }
                    ]}
                >
                    <AutoComplete
                        options={arrayProjectId}
                        placeholder="Project id"
                        onSelect={(value, option) => {
                            dispatch(_GET_ALL_USER_SAGA(Number(value)));
                        }}
                    />
                </Form.Item>

                <div className="create-container">
                    <label className="create-label">Description</label>
                    <Editor
                        name="description"
                        className="create-edit"
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
                    <label className="sub-label mb-3">Describe the issue in as much detail as you'd like.</label>
                </div>


                <label className="create-label">Assignees</label>
                <Form.Item
                    name="listUserAsign"
                    rules={[
                        {
                            required: true,
                            message: 'Assignees is required'
                        }
                    ]}
                >
                    <Select
                        options={arrayOptionsAssignees}
                        mode="multiple"
                        allowClear
                        style={{ width: '100%' }}
                        placeholder="Please select assignees"
                        optionFilterProp="label"
                        onChange={handleChangeAssi}
                    >
                        {children}
                    </Select>
                </Form.Item>

                <label className="create-label">Priority</label>
                <Form.Item
                    name="priorityId"
                    rules={[
                        {
                            required: true,
                            message: 'Priority is required'
                        }
                    ]}
                >
                    <Select placeholder="Priority" style={{ width: "100%" }} onChange={handleChangePri}>
                        {arrayPriority?.map((priority, index) => {
                            return <Option value={priority.priorityId} key={index}>{priority.description}</Option>
                        })}
                    </Select>
                </Form.Item>

                <div className="d-flex">
                    <div className="w-50">
                        <label className="create-label">Original Estimate</label>
                        <Form.Item name="originalEstimate">
                            <InputNumber min={0} max={24} onChange={onChangeEst} />
                        </Form.Item>
                    </div>
                    <div className="w-50">
                        <label className="create-label">TIME TRACKING</label>
                        <Slider
                            value={Number(timeTracking.timeSpent)}
                            max={Number(timeTracking.timeRemain) + Number(timeTracking.timeSpent)}
                            tipFormatter={formatter}
                        />
                        <div className="d-flex">
                            <div className="w-50">
                                <label className="create-label">Time spent (hours)</label>
                                <Form.Item
                                    style={{ width: '80% !important' }}
                                    name="timeTrackingSpent"
                                >
                                    <InputNumber style={{ width: '80% !important' }} min={0} max={24} onChange={onChangeSpent} />
                                </Form.Item>
                            </div>
                            <div className="w-50">
                                <label className="create-label">Time remaining (hours)</label>
                                <Form.Item name="timeTrackingRemaining">
                                    <InputNumber min={0} max={24} onChange={onChangeRemain} />
                                </Form.Item>
                            </div>
                        </div>
                    </div>
                </div>

                <Form.Item >
                    <Button type="primary" className="create-btn" htmlType="submit">Create Issue</Button>
                </Form.Item>
            </Form>

        </>
    )
}
