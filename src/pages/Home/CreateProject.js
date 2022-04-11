import React, { useEffect, useState } from 'react'
import {
    Form,
    Input,
    Select,
    Button,
} from 'antd';
import { Editor } from '@tinymce/tinymce-react';
import { useDispatch, useSelector } from 'react-redux'
import './Home.css'
import { _CREATE_PROJECT_SAGA, _GET_CATEGORY } from '../../redux/actions/ProjectAction'


export default function CreateProject() {
    const { Option } = Select;


    let category = useSelector(state => state.ProjectReducer.category);
    let dispatch = useDispatch();
    let [desc, setDesc] = useState({
        content: ''
    })
    const handleEditorChange = (e) => {
        setDesc({
            content: `${e.target.getContent()}`
        })
    }

   

    useEffect(() => {
        dispatch(_GET_CATEGORY())
    }, [])

    const onFinish = (values) => {
        let newValues = {
            description: desc.content,
            ...values
        }
        dispatch(_CREATE_PROJECT_SAGA(newValues))
    }

    return (
        <div className="create-wrap">
            <div className="create-head">
                Projects
                <span className="create-space">/</span>
                singularity 1.0
                <span className="create-space">/</span>
                Create Project
            </div>
            <h3 className="create-heading">Create Project</h3>

            <Form
                onFinish = {onFinish}
                name="register"
                initialValues={{
                    residence: ['zhejiang', 'hangzhou', 'xihu'],
                    prefix: '86',
                }}
                scrollToFirstError
            >
                <label className="create-label">Name</label>
                <Form.Item
                    name="projectName"
                    rules={[
                        {
                            min: 6,
                            message: 'Must be 6 characters or more',
                        },
                        {
                            max: 30,
                            message: 'Must be 30 characters or less'
                        },
                        {
                            required: true,
                            message: 'Please input your Name',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <label className="create-label">Description</label>
                <Editor
                    name="description"
                    className="create-edit"
                    init={{
                        height: 300,
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
                <div className="create-under">Describe the project in as much detail as you'd like.</div>

                <label className="create-label mt-4">Project Category</label>
                <Form.Item
                    name="categoryId"
                    rules={[{ required: true, message: 'Please select gender!' }]}
                >
                    <Select placeholder="select your gender">
                        {category.map((item, index) => {
                            return <Option value={item.id} key={index}>{item.projectCategoryName}</Option>
                        })}
                    </Select>
                </Form.Item>

                <Form.Item >
                    <Button type="primary" htmlType="submit" className="create-btn">
                        Create Project
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}