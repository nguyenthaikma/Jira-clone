import React, { useEffect } from 'react'
import ReactHtmlParser from 'html-react-parser'
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import ContentMain from '../../component/Home/Main Board/ContentMain'
import HeaderMain from '../../component/Home/Main Board/HeaderMain'
import InfoMain from '../../component/Home/Main Board/InfoMain'
import { _GET_PROJECT_DETAIL_SAGA } from '../../redux/actions/ProjectAction';

export default function IndexJira() {

    useEffect(() => {
        dispatch(_GET_PROJECT_DETAIL_SAGA(param.id))
    }, [])

    const param = useParams();
    const dispatch = useDispatch();
    const projectDetail = useSelector(state => state.ProjectReducer.projectDetail);

    // console.log(projectDetail);

    return (
        <div className="main">
            <HeaderMain name={projectDetail.projectName} />
            <h3 style={{
                fontSize: '24px',
                fontWeight: '600'
            }}>{projectDetail.projectName}</h3>
            <div>
                {projectDetail.description ? ReactHtmlParser(projectDetail.description) : ''}
            </div>
            <InfoMain members={projectDetail.members} style={{ display: 'flex' }} />
            <ContentMain data={projectDetail} style={{ display: 'flex' }} />
        </div>
    )
}




