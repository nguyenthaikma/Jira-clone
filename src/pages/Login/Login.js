import React from 'react'
import { Button, Input, Checkbox, Form } from 'antd';
import { UserOutlined, FacebookOutlined, TwitterOutlined, LockOutlined } from '@ant-design/icons';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux'
import './Login.css'
import { _LOGIN_API } from '../../redux/actions/LoginActions';
import { Link } from 'react-router-dom';

function Login(props) {

    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
    } = props;

    return (
        <div className="container ">
            <h3 className="text-center login-header">Login to continue</h3>
            <Form onFinish={handleSubmit} className="form-group text-center">
                <Input
                    onBlur={handleBlur}
                    onChange={handleChange}
                    name="email"
                    className="login-input"
                    size="large"
                    placeholder="Email"
                    prefix={<UserOutlined />}
                />
                {touched.email && errors.email ? (
                    <p style={{ width: '80%', margin: '0 auto' }} className="text-danger text-left mt-1">{errors.email}</p>
                ) : null}

                <Input
                    onBlur={handleBlur}
                    onChange={handleChange}
                    name="passWord"
                    className="login-input"
                    size="large"
                    placeholder="Password"
                    type='password'
                    prefix={<LockOutlined />}
                />
                {touched.passWord && errors.passWord ? (
                    <p style={{ width: '80%', margin: '0 auto' }} className="text-danger text-left mt-1">{errors.passWord}</p>
                ) : null}

                <div className="login-group">
                    <Checkbox className="login-checkbox" >Remember me</Checkbox>
                    <a href="/">Forgot Password?</a>
                </div>
                <Button htmlType="submit" size='large' className="login-btn mt-4">Login</Button>
            </Form>
            <Link className="text-center d-block mt-3 login-register" to="/register">Register now?</Link>  
            <p className="login-mid text-center">or sign up using</p>
            <div className="login-social">
                <Button style={{ backgroundColor: '#3b5998' }} type="primary" shape="circle" icon={<FacebookOutlined />} size='large'>
                </Button>
                <Button type="primary" shape="circle" icon={<TwitterOutlined />} size='large'>
                </Button>
            </div>
        </div>
    )
}

const MyEnhancedForm = withFormik({
    mapPropsToValues: () => ({
        email: '',
        passWord: ''
    }),

    validationSchema: Yup.object({
        email: Yup.string().email('Invalid email address').required('Email is required'),
        passWord: Yup.string().required('Password is required').min(6, 'Must be 6 characters or more').max(30, 'Must be 30 characters or less')
    }),

    handleSubmit: (values, { props, setSubmitting }) => {
        props.dispatch(_LOGIN_API(values));
    },
})(Login);

export default connect()(MyEnhancedForm);
