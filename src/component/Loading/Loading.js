import React from 'react'
import { useSelector } from 'react-redux'
import './Loading.css'

export default function Loading() {

    let state = useSelector(state => state.LoadingReducer.isLoading);

    if(state) {
        return (
            <div style={{display: 'flex'}} className='loading'>
                <img src={require('../../assets/Loading/Loading.gif')} alt="1"/>
            </div>
        )
    } else {
        return (
            <div style={{display: 'none'}} className='loading'>
                <img src={require('../../assets/Loading/Loading.gif')} alt="1"/>
            </div>
        )
    }
}
