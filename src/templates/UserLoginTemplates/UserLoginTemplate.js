import React, {useEffect, useState} from 'react'
import { Layout } from 'antd';
import './UserLogin.css'

const {  Sider } = Layout;

export default function UserLoginTemplate(props) {

    let [size, setSize] = useState({width: window.innerWidth, height: '100%'})

    useEffect(() => {
        window.onresize = () => {
            setSize({
                width: window.innerWidth, 
                height: window.innerHeight
            })
        }
    }, [])

    return (
        <div className="login-container">
            <Layout>
                <Sider width={size.width/2} className="login-sider" style={{
                    height: size.height
                }}>
                    <img className="w-100 h-100 login-img" src={require('../../assets/img/bg-01.jpg')} alt= "1" />
                </Sider>
                <Layout>
                    <props.data />
                </Layout>
            </Layout>
        </div>
    )
}
