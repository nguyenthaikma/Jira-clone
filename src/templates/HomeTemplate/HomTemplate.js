import React from 'react'
import InfoModal from '../../component/Home/InfoModal'
import Menu from '../../component/Home/Menu'
import SearchModal from '../../component/Home/SearchModal'
import SiderBar from '../../component/Home/SiderBar'

export default function HomTemplate(props) {
    return (
        <>
            {/* Body */}
            <div className="jira">
                <SiderBar />
                <Menu />

                <props.data />

            </div>

            {/* Search Modal */}
            <SearchModal />

            {/* Info Modal */}
            <InfoModal />
        </>
    )
}
