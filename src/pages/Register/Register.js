import React from 'react'
import {
    Form,
    Input,
    Checkbox,
    Button,
} from 'antd';
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import './Reg.css'
import { _SIGN_UP } from '../../redux/actions/LoginActions';


export default function Register() {

    let dispatch = useDispatch();

    const onFinish = (values) => {
        let {email, name, passWord, phoneNumber} = values;
        let newValues = {
            email, passWord, name , phoneNumber
        }
        dispatch(_SIGN_UP(newValues));
        // let arrayAccount = [];
        // let arrayAccountJson = localStorage.getItem('arrayAccount');
        // if (arrayAccountJson === null) {
        //     arrayAccountJson = [values];
        //     localStorage.setItem('arrayAccount', JSON.stringify(arrayAccountJson));
        //     dispatch(_SIGN_UP());
        // } else {
        //     arrayAccount = JSON.parse(arrayAccountJson);
        //     let flag = true;
        //     for (let item of arrayAccount) {
        //         if (item.email === values.email) {
        //             Swal.fire({
        //                 icon: 'error',
        //                 title: 'Oops...',
        //                 text: 'Email already registered, please enter another email',
        //               })
        //             flag = false;
        //             return;
        //         }
        //     }
        //     if (flag) {
        //         let newArrayAccount = [...arrayAccount, values];
        //         localStorage.setItem('arrayAccount', JSON.stringify(newArrayAccount));
        //         dispatch(_SIGN_UP());
        //     }
        // }
    }

    return (
        <div className="container">
            <h3 className="reg-header">Sign in to continue</h3>
            <Form
                className="reg-form"
                name="register"
                scrollToFirstError
                onFinish={onFinish}
            >
                <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                        {
                            type: 'email',
                            message: 'The input is not valid E-mail!',
                        },
                        {
                            required: true,
                            message: 'Please input your E-mail!',
                        },
                    ]}
                >
                    <Input className="reg-input" placeholder="Email" />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="passWord"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                        {
                            min: 6,
                            message: 'Must be 6 characters or more'
                        },
                        {
                            max: 30,
                            message: 'Must be 30 characters or less'
                        }
                    ]}
                    hasFeedback
                >
                    <Input.Password className="reg-input" placeholder="Password" />
                </Form.Item>

                <Form.Item
                    name="confirm"
                    label="Confirm password"
                    dependencies={['passWord']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Please confirm your password!',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('passWord') === value) {
                                    return Promise.resolve();
                                }

                                return Promise.reject(new Error('The two passwords that you entered do not match!'));
                            },
                        }),
                    ]}
                >
                    <Input.Password className="reg-input" placeholder="Confirm password" />
                </Form.Item>

                <Form.Item
                    name="name"
                    label="Nickname"
                    tooltip="What do you want others to call you?"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your nickname!',
                            whitespace: true,
                        },
                        {
                            pattern: /^[a-z]+$/,
                            message: 'Your first name is not valid. Only characters a-z are acceptable.'
                        }
                    ]}
                >
                    <Input placeholder="Nickname" className="reg-input" />
                </Form.Item>

                <Form.Item
                    name="phoneNumber"
                    label="Phone Number"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your phone number!',
                        },
                        {
                            pattern: /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
                            message: 'Please enter a valid phone number'
                        }
                    ]}
                >
                    <Input
                        className="reg-input"
                        style={{
                            width: '100%',
                        }}
                        placeholder="Enter phone number"
                    />
                </Form.Item>

                <Form.Item
                    name="agreement"
                    valuePropName="checked"
                    rules={[
                        {
                            validator: (_, value) =>
                                value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
                        },
                    ]}
                >
                    <Checkbox>
                        I have read the <Link to="/register" style={{ color: '#6675df' }}>agreement</Link>
                    </Checkbox>
                </Form.Item>
                <Form.Item >
                    <Button className="reg-btn" type="primary" htmlType="submit">
                        Register
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}
