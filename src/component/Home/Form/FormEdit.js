import React, { useEffect, useState } from 'react'
import {
    Form,
    Input,
    Select,
    Button,
} from 'antd';
import { Editor } from '@tinymce/tinymce-react';
import { useDispatch, useSelector } from 'react-redux'
import { _CREATE_PROJECT_SAGA, _EDIT_PROJECT_SAGA, _GET_CATEGORY } from '../../../redux/actions/ProjectAction'

export default function FormEdit() {

    let category = useSelector(state => state.ProjectReducer.category);
    let { projectName, categoryId, description, ...params } = useSelector(state => state.DrawerReducer.content);
    let dispatch = useDispatch();

    let [desc, setDesc] = useState({
        content: description
    })


    const { Option } = Select;
    const handleEditorChange = (e) => {
        setDesc({
            content: `${e.target.getContent()}`
        })
    }

    const onFinish = (values) => {
        let newValues = {
            ...values,
            id: params.id,
            description: desc.content
        }
        dispatch(_EDIT_PROJECT_SAGA(newValues))
    }

    const [form] = Form.useForm();

    useEffect(() => {
        form.resetFields()
    }, [form, projectName])

    useEffect(() => {
        dispatch(_GET_CATEGORY());
    }, [])

 

    return (
        <Form
            form={form}
            onFinish={onFinish}
            name="register"
            scrollToFirstError
            initialValues={{
                projectName: projectName,
                categoryId: categoryId
            }}
        >
            <label className="create-label">Name</label>
            <Form.Item
                hasFeedback
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
                initialValue={description}
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

            <label className="create-label mt-4">Project Category</label>
            <Form.Item
                name="categoryId"
                rules={[{ required: true, message: 'Please select gender!' }]}
            >
                <Select  placeholder="select your gender">
                    {category.map((item, index) => {
                        return <Option value={item.id} key={index}>{item.projectCategoryName}</Option>
                    })}
                </Select>
            </Form.Item>

            <Form.Item >
                <Button type="primary" htmlType="submit" className="create-btn">
                    Save
                </Button>
            </Form.Item>
        </Form>
    )
}
