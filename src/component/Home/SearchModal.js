import React from 'react'
import { Input } from 'antd';
import { SearchOutlined, WarningOutlined } from '@ant-design/icons';

export default function SearchModal() {
    return (
        <div className="modal fade" id="searchModal" tabIndex={-1} role="dialog" aria-labelledby="searchModal" aria-hidden="true">
            <div className="modal-dialog modal-search">
                <div className="modal-content">
                    <div className="modal-header">
                        <div className="search-block">
                            <Input size="large" disabled placeholder="Tính năng này chưa cập nhật, vui lòng quay lại sau ^.^" prefix={<SearchOutlined />} />
                        </div>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <p className="modal-title">RECENT ISSUES</p>
                        <div className="modal-item" style={{ display: 'flex' }}>
                            <div className="icon">
                                <WarningOutlined style={{color: '#ce9235'}} />
                            </div>
                            <div>
                                <p className="modal-name">Tính năng này chưa cập nhật, vui lòng quay lại sau ^.^</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
